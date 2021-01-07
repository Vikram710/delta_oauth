const UserModel = require('../models/User');
const ClientModel = require('../models/ClientDetail');
const AuthCodeModel = require('../models/AuthorizationCode');
const AccessTokenModel = require('../models/AccessToken');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/env')

const randomString = async (length, model) => {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let code = '';
	for (let i = 0; i < length; i++) {
		code += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	let exists = await model.findOne({code});
	if (exists) randomString(length, model);
	return code;
};
exports.register = async (req, res) => {
	let newUser = {
		name: req.body.name,
		email: req.body.email,
	};
	try {
		newUser.password = await bcrypt.hash(req.body.password, 10);

		await UserModel.create(newUser);
		return res.status(200).json({message: 'Successfully registered'});
	} catch (err) {
		console.log(err);
		return res.status(400).json({message: 'Failed to registered'});
	}
};

exports.login = async (req, res, next) => {
	try {
		let user = await UserModel.findOne({email: req.body.email});
		let client = await ClientModel.findOne({clientId: req.body.clientId});
		if (!client) return res.status(400).json({message: 'Failed to login'});
		if (user) {
			let matchPwd = await bcrypt.compare(req.body.password, user.password);
			req.body.user = user;
			req.body.client = client;
			if (matchPwd) return next();
		}
		return res.status(400).json({message: 'Failed to login'});
	} catch (err) {
		console.log(err);
		return res.status(400).json({message: 'Failed to login'});
	}
};

exports.generateCode = async (req, res) => {
	let code = await randomString(20, AuthCodeModel);
	try {
		await AuthCodeModel.create({code, clientId: req.body.client._id, userId: req.body.user._id});
		// return res.status(200).json({message: 'Successfully logged in', code: code});
		return res.redirect(req.body.client.redirectUri+'?code='+code)
	} catch (err) {
		console.log(err);
		return res.status(400).json({message: 'Failed to login'});
	}
};

exports.generateToken = async (req, res) => {
	let token = await randomString(20, AccessTokenModel);
	try {
		let client = await ClientModel.findOne({clientId: req.body.clientId, clientSecret: req.body.clientSecret});
		if (!client) return res.status(400).json({message: 'Fail'});

		let authCodeDetails = await AuthCodeModel.findOne({code: req.body.code});
		await AccessTokenModel.create({token, clientId: authCodeDetails.clientId, userId: authCodeDetails.userId});

		let user = await UserModel.findOne({_id: authCodeDetails.userId});
		let payload = {
			aud:authCodeDetails.clientId,
			email: user.email,
			name: user.name,
		};
		let id_token = jwt.sign(payload, config.jwtSecret);
		return res.status(200).json({message: 'Success', access_token: token, id_token});
	} catch (err) {
		console.log(err);
		return res.status(400).json({message: 'Fail'});
	}
};

exports.showLogin = (req,res) => {
	res.render('login', {title:'Login'})
}