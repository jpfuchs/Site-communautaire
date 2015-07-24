var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var panierSchema = new Schema({
	nom: {
		type: 'String',
		required: true,
		unique: true
	},
	auteur: {
		type: 'String',
		required: true
	},
	prix: {
		type: 'String',
		required: true
	},
	pseudo: {
		type: 'String',
		required: true
	}
});


var panierModel = mongoose.model('Panier', panierSchema);

module.exports = panierModel;