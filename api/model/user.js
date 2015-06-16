var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var userSchema = new Schema({
	pseudo: {
		type: 'String',
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},

	email: {
		type: String,
		required: true
	},

	pays: {
		type: String,
		required: true
	},

	region: {
		type: String,
		required: true
	},

	ville: {
		type: String,
		required: true
	},

	code: {
		type: String,
		required: true
	},
	age: {
		type: String,
		required: true
	}
});


var userModel = mongoose.model('User', userSchema);

module.exports = userModel;