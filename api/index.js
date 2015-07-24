var global;

//Connecteur mongoose
var mongoose = require('mongoose');

// Modele table utilisateur
var User = require('./model/user');

// Modele table article
var Article = require('./model/article');

// Modele table pannier
var Panier = require('.
	/model/panier');

console.log("debut node");


// Module node pour envoyer des mails
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'jfuchsloch@gmail.com',
    pass: 'titus123'
  }
});



var k=0;
var lmembre="";
var lnouveauMembre = "";
var lmessagePoste = "";

// Creation serveur node
var restify = require('restify'),
	server = restify.createServer({
		name: 'EyesApi'
	});

console.log("node suite");

// Utilisation des sockets
var io = require('socket.io').listen(server.server);
var  i =0;



server.use(restify.CORS());
server.use(restify.queryParser());
server.use(restify.bodyParser());

// Definitions des urls serveurs

server.post('/mail', function (req, res) {
	
	console.log("mail post");

	console.log(req);

	console.log(req.body);

	//console.log("test");
 	var mailOptions = {
        from: req.body.sender,
        to: req.body.destinataire,
        subject: req.body.objet,
        text: req.body.message,
        html: req.body.message
      };


	transporter.sendMail(mailOptions, function(err, response){
        !!err ? console.error(err) : res.end();
      });

});



server.get('/users', function (req, res) {
	User.find().exec(function (err, users) {
		if (err) {
			return res.send(500, err);
		}
		res.send(users);
	});
});


server.get('/articles', function (req, res) {
	Article.find().exec(function (err, articles) {
		if (err) {
			return res.send(500, err);
		}
		res.send(articles);
	});
});



server.post('/panier', function (req, res) {

	//console.log(req);
	console.log(req.body);
	
	Panier.find({ pseudo: req.body}).exec(function (err, panier) {
		if (err) {
			return res.send(500, err);
		}
		if (!panier) {
			console.log("panier not found");
			return res.send(404, "Panier not found");
		}

		res.send(panier);

});

});



// Ecoute sockets
io.sockets.on('connection', function (socket) {
    		
			// Deconnection d'un client    		
  			socket.on('disconnect', function (data) {
  			
  					// Un client s'est deconnecte
  					console.log("client disconnect");
  					 k--;
    			
    				// Met à jour le nombre de connectes chez tous les autres clients encore connectes
    				socket.broadcast.emit('message', { nbclient: k });
    				socket.emit('message', { nbclient: k });

    			
    				console.log(lnouveauMembre);

    				socket.emit('membre', { pseudo: lnouveauMembre });
    
    				socket.broadcast.emit('membre', { pseudo: lnouveauMembre });

  			});

  			// Message reçu d'un client
  			socket.on('message', function (data) {
    				console.log(data);
    				
    				socket.emit('messageForum', { messagePoste: data });

    				// Diffuse le nombre de connectes aux autres clients
    				socket.broadcast.emit('messageForum', { messagePoste: data });

  			});			
		

});

server.post('/message/forum', function (req, res) {

	 var chaine1 = "";
	 var chaine2 = "";
	 var chaine = "";

	 myDate = new Date();

	console.log("post message forum");
	console.log(req.body.contenu);
	console.log(req.body.pseudo);

	 
	chaine1 = "<li>" + req.body.contenu + "</li>";
	console.log(chaine1);

	chaine2 ="<li>" + req.body.pseudo +"|" + myDate + "</li>" + "<br/>";
	console.log(chaine2);        


	chaine = chaine1 + chaine2;
	console.log(chaine);

	lmessagePoste = lmessagePoste+ chaine;
	console.log(lmessagePoste);


	console.log('haha : Un message posté sur le forum !');
    

	console.log("hihi");
	res.send(lmessagePoste);

});


server.post('/users/login', function (req, res) {
	User.findOne({ pseudo: req.body.pseudo, password: req.body.password }).exec(function (err, user) {
		if (err) {
			return res.send(500, err);
		}
		if (!user) {
			return res.send(404, "User not found");
		}

		k++;


		console.log("ceci est un test");


		lmembre = lmembre + "<li>" + user.pseudo + "</li>";
		console.log(lmembre);		
		
		//var k=0;
		io.sockets.on('connection', function (socket) {


			console.log('Un client est connecté !');
    		//console.log(k);

    		// Envoie le nombre de connectes au client
    		socket.emit('message', { nbclient: k });

    		// Diffuse le nombre de connectes aux autres clients
    		socket.broadcast.emit('message', { nbclient: k });

    		// Trappe les messages de clients
    		/*socket.on('message', function (data) {
    				console.log(data);
    				
    				socket.emit('messageForum', { messagePoste: data });

    				// Diffuse le nombre de connectes aux autres clients
    				socket.broadcast.emit('messageForum', { messagePoste: data });

  			});	*/		
		

			console.log("hehe");

			//lmembre = lmembre + user.pseudo;
			//console.log(lmembre);

			

    		//socket.emit('membre', { pseudo: user.pseudo });
    		socket.emit('membre', { pseudo: lmembre });
    		socket.broadcast.emit('membre', { pseudo: lmembre });
		
		//});

		//io.sockets.on('message', function (data) {
    	//	console.log(data);
    		//i++;
    		//console.log(i);

    	});


		res.send(user);
	});
});

server.post('/users/logout', function (req, res) {
	lnouveauMembre = "";
	console.log("logout client envoyé");
	console.log(req.body.pseudo);
	console.log(lmembre);
	var chaine  = lmembre.split("<li>");
	console.log(chaine);
	var chaine1 = JSON.stringify(chaine);
	console.log(chaine1);
	var chainebis = JSON.parse(chaine1);
	console.log(chainebis);
	console.log(chainebis.length);
	for (var i1=0; i1<chainebis.length;i1++)
	{
		var tamp = chainebis[i1];
		console.log(tamp);
		tampbis = tamp.split("</li>");
		console.log(tampbis);
		var Mychaine = tampbis[0];
		 console.log(Mychaine);
		 if (Mychaine != req.body.pseudo && Mychaine != '')
		 {
		 	console.log("chaine non identique");
		 	lnouveauMembre = lnouveauMembre + "<li>" + Mychaine + "</li>";
		 	//lnouveauMembre = lnouveauMembre + MyChaine;
		 }

	}

    console.log("lnouveaumembre");
	console.log(lnouveauMembre);
	console.log("titi");
	lmembre = lnouveauMembre;

     //res.send (lnouveauMembre);  
	
});

server.post('/users/services', function (req, res) {
	
	var lMembreServices = ""

	User.find({ age: req.body.age, pays: req.body.pays , ville: req.body.ville, region:req.body.region}).exec(function (err, user) {
		if (err) {
			return res.send(500, err);
		}
		if (!user) {
			return res.send(404, "User services not found");
		}
		console.log("/users/services post");
		console.log(user);
		
		for (var i2=0; i2<user.length;i2++)
		{	
		
			var tamp = user[i2]["pseudo"];
			console.log(tamp);
			lMembreServices = lMembreServices + "<li>" + tamp + "</li>";
		
		}

		console.log(lMembreServices);
		//res.send(user);
		res.send(lMembreServices);
	});
});



server.put('/users', function (req, res) {
	var user = new User(req.body);

	console.log(req.body);
	console.log(user);

	user.save(function (err) {
		if (err) {
			return res.send(500, err);
		}
		res.send(user);
	});

});

server.put('/panier', function (req, res) {
	var panier = new Panier(req.body);

	console.log(req.body);
	console.log(panier);
	panier.save(function (err) {
		if (err) {
			console.log("save panier KO");
			return res.send(500, err);

		}
		console.log("save panier OK");
		res.send(panier);
	});


});


server.put('/article', function (req, res) {
	var article = new Article(req.body);

	console.log(req.body);
	console.log(article);
	article.save(function (err) {
		if (err) {
			console.log("save article KO");
			return res.send(500, err);

		}
		console.log("save article OK");
		res.send(article);
	});


});




// Connexion base mongoDB
mongoose.connect('mongodb://localhost:27017/eyes_node');

// Ecoute du serveur port 3000
server.listen(3000);




