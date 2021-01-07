const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientDetailSchema = new Schema({
	clientId: {
		type: String,
		required: true,
	},
	clientSecret: {
		type: String,
		required: true,
	},
	originUri: {
		type: String,
		required: true,
	},
	redirectUri: {
		type: String,
		required: true,
	},
});
module.exports = mongoose.model('ClientDetail', clientDetailSchema);
