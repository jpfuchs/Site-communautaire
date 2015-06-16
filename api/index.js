var mongoose = require('mongoose');

var User = require('./model/user');
 var Article = require('./model/article');

console.log("debut node");

var restify = require('restify'),
	server = restify.createServer({
		name: 'EyesApi'
	});

server.use(restify.CORS());
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/users', function (req, res) {
	User.find().exec(function (err, users) {
		if (err) {
			return res.send(500, err);
		}
		res.send(users);
	});
});

server.post('/users/login', function (req, res) {
	User.findOne({ pseudo: req.body.pseudo, password: req.body.password }).exec(function (err, user) {
		if (err) {
			return res.send(500, err);
		}
		if (!user) {
			return res.send(404, "User not found");
		}
		res.send(user);
	});
});

server.post('/users/services', function (req, res) {
	User.find({ age: req.body.age, pays: req.body.pays , ville: req.body.ville, region:req.body.region}).exec(function (err, user) {
		if (err) {
			return res.send(500, err);
		}
		if (!user) {
			return res.send(404, "User services not found");
		}
		res.send(user);
	});
});



server.put('/users', function (req, res) {
	var user = new User(req.body);
	user.save(function (err) {
		if (err) {
			return res.send(500, err);
		}
		res.send(user);
	});

});

server.put('/article', function (req, res) {
	var article = new Article(req.body);

	console.log(req.body);
	article.save(function (err) {
		if (err) {
			console.log("save article KO");
			return res.send(500, err);

		}
		console.log("save article OK");
		res.send(article);
	});


});


mongoose.connect('mongodb://localhost:27017/eyes_node');

server.listen(3000);