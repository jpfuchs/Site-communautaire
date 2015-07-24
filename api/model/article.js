var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var articleSchema = new Schema({
	image: {
		type: String,
		required: true
	},
	produit: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	pseudo: {
		type: String,
		required: true
	},
	descproduit: {
		type: String,
		required: true
	},
	prix: {
		type: String,
		required: true
	}
});


var articleModel = mongoose.model('Article', articleSchema);

module.exports = articleModel;