const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accessTokenSchema = new Schema({
	clientId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'ClientDetails',
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	token: {
		type: String,
		required: true,
	},
});
module.exports = mongoose.model('AccessToken', accessTokenSchema);
