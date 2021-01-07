const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/env.js');
const path = require('path');
const mongoose = require('mongoose');
const engine = require('ejs-locals');
const cors = require('cors');

//Routes
const authRouter = require('./routes/auth');

const app = express();

const port = config.port || 3000;
const host = (config.ip && config.boolIp) || 'localhost';

app.use(express.static(__dirname + '/../public'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose
	.connect(config.dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => {
		console.log('Database connection successful');
	})
	.catch((err) => {
		console.error('Database connection error' + err);
	});

// CORS
app.use(cors());
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.use('/auth', authRouter);

//Listen
app.listen(port, host, () => {
	console.log('\x1b[36m%s\x1b[0m', `App running on http://${host}:${port}`);
});
