const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorizationCodeSchema = new Schema({
	clientId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'ClientDetails',
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	code: {
		type: String,
		required: true,
	},
});
module.exports = mongoose.model('AuthorizationCode', authorizationCodeSchema);
