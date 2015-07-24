angular.module('EyesApp.controllers')

	.controller('eyesservicesforumController', ['$scope', '$http', '$location', '$timeout','$rootScope',   function ($scope,$http, $location, $timeout, $rootScope) {
		console.log("serviceforum controller");

       // $rootScope.socket = io.connect('http://localhost:3000');
    //$rootScope.socket.emit('message', {message: "Bonjour serveur forum!"})


    var messagePoste = "";
    $scope.messagePoste = {};
		$scope.produitForum = {};
    $scope.MessageForum = {};
		$scope.listeArticle = {};
		$scope.indice = 0;
    $scope.posPannier = 0;
		$scope.panier =  new Array();


     $(function () {
        $(":file").change(function () {
            if (this.files && this.files[0]) {
                var reader = new FileReader();

                reader.onload = imageIsLoaded;
                reader.readAsDataURL(this.files[0]);
                console.log(this.files[0].name);
                $scope.produitForum.image = this.files[0].name;
            }
        });
    });

     function imageIsLoaded(e) {
        $('#imgstore').attr('src', e.target.result);
        //$('#yourImage').attr('src', e.target.result);
    };


	$scope.fileNameChanged = function(element) {
  			console.log("select file");
  			console.log(element.files);
  			console.log(element.files[0].name);
  			$scope.produitForum.image = element.files[0].name;
  			console.log($scope.produitForum.image);

  			
  			//element.move("C:/JPF");
		}
		
$scope.submit = function (form) {
    console.log("Form submit");
		console.log(form);
		console.log(form.$valid);


    // Formulaire du produit
    if (form.$name =="forumForm")
    {

			if (form.$valid) {
				//http://localhost:3000/users/login POST
				console.log("form eyesservicesforum valid test");
				console.log($scope.produitForum);

				$scope.produitForum.pseudo = $rootScope.user.pseudo;
				console.log($scope.produitForum);

				$http.put('http://localhost:3000/article', $scope.produitForum)
					.success(function (produit) {
						console.log(produit);
						$location.path('/eyes_services_forum');
					})
					.error(function (reason) {
						console.log("put article KO");
						console.error(reason);
					})
			}
			else
			{
				console.log("form eyesserviceforum invalid test");
				//$location.path('/');

			}
		
    }
    // Formulaire du message forum
    else  if (form.$name =="forumMessageForm")
    { 
      var chaine1 = "";
      var chaine2 = "";
      var chaine="";

      test = $scope.MessageForum.inputContenu;
      test1 = $scope.MessageForum.pseudo;
      
      if (form.$valid) {  

            $scope.messagePoste.contenu = $scope.MessageForum.inputContenu;
            $scope.messagePoste.pseudo = $scope.MessageForum.pseudo;

            console.log($scope.messagePoste);

            $http.post('http://localhost:3000/message/forum', $scope.messagePoste)
          .success(function (messageRecu) {
            console.log("post message OK");
            console.log(messageRecu);
               $rootScope.socket.emit('message', {message: messageRecu})

            //$("#ChatMessages").empty().append(message);
             
          })
          .error(function (reason) {
            console.log("post message KO");
            console.error(reason);
          })
   
      }

    }
   

    }


  $rootScope.socket.on('messageForum', function (data) {
            
                console.log("socket recu messageForum");
                console.log(data);
                console.log(data.messagePoste.message);
                //console.log(data.nbclient);

                 $("#ChatMessages").empty().append(data.messagePoste.message);

            });


$http.get('http://localhost:3000/articles')
					.success(function (article) {
						console.log(article);
						//console.log(article[0]);
					//console.log(article[0]["produit"]);

						$scope.listeArticle = article;
				
					})
					.error(function (reason) {
						console.log("get article KO");
						console.error(reason);
					})



						console.log("hi");



$http.post('http://localhost:3000/panier', JSON.stringify($rootScope.user.pseudo))
          .success(function (panier) {

            var test = "";
            var ListeArticleIni = "";
            console.log("get pannier");
            console.log(panier);
            console.log(panier.length);

            $scope.panier = panier;

            for (var k=0;k<panier.length;k++)
            {
                test = panier[k].nom  + ";" +  panier[k].prix + ";" + panier[k].pseudo;
              //  test = $scope.panier[k].nom  + ";" + $scope.panier[k].pseudo;
               // test = $scope.panier[k].nom;
                
                ListeArticleIni = ListeArticleIni  + test + "<br/>";
          }

           console.log(ListeArticleIni);
          document.querySelector("#listearticles").innerHTML=ListeArticleIni;

          })
          .error(function (reason) {
            console.log("get panier KO");
            console.error(reason);
          })



 console.log("he");




 $timeout(function () {
            	
            	$scope.desc($scope.indice);	
				
			}, 2000);





$scope.desc = function (i) {

				console.log($scope.listeArticle[i]);
            	console.log($scope.listeArticle[i]["produit"]);
            	console.log($scope.listeArticle.length);

            	//Affichage photo
            	if ($scope.listeArticle[i]["produit"]  == "mangue")
            	{
            		document.getElementById("jp").src="app/images/mangue.jpg";
            	}
            	else if ($scope.listeArticle[i]["produit"]  == "radis")
            	{
            		document.getElementById("jp").src="app/images/radis.jpg";
            	} 
            	else if ($scope.listeArticle[i]["produit"]  == "pomme")
            	{
            		document.getElementById("jp").src="app/images/pomme.jpg";
            	}
              else if ($scope.listeArticle[i]["produit"]  == "raisin")
              {
                document.getElementById("jp").src="app/images/raisin.jpg";
              }


            	document.getElementById("nom").innerHTML ="produit: " + $scope.listeArticle[i]["produit"]; 
            	document.getElementById("prix").innerHTML ="prix: " +$scope.listeArticle[i]["prix"]+ "euros";
            	document.getElementById("email").innerHTML = "email: " + $scope.listeArticle[i]["email"]; 
            	document.getElementById("pseudo").innerHTML ="pseudo: "+ $scope.listeArticle[i]["pseudo"]; 
            	
}


 $scope.suiv = function () {
       
       console.log("suiv");
       $scope.indice++;

        /* Au moins un article present on l affiche*/
         if ($scope.listeArticle.length>0)
         {
         		 	console.log($scope.indice);

                if ($scope.indice<$scope.listeArticle.length && $scope.indice>0 ){
                	//console.log($scope.indice);
                  	//console.log($scope.listeArticle[$scope.indice]);
                  	$scope.desc($scope.indice);
                }
                else
                { 
                  	$scope.indice=0;
                 	console.log("onredemarre");       
                  	//console.log($scope.listeArticle[$scope.indice]);
                  	$scope.desc($scope.indice);
                }

          }
    

 }
	

 $scope.prec = function () {
       
       console.log("prec");
       $scope.indice--;
       
         if ($scope.listeArticle.length>0)
         {
         		 	console.log($scope.indice);

                if ($scope.indice<$scope.listeArticle.length && $scope.indice>0 ){
                  	console.log($scope.listeArticle[$scope.indice]);
                  	$scope.desc($scope.indice);
                }
                else
                { 
                  	$scope.indice=0;
                 	console.log("onredemarre");       
                  	console.log($scope.listeArticle[$scope.indice]);
                  	$scope.desc($scope.indice);
                }

          }
    
 }	

 console.log("scope indice");
 console.log($scope.indice);

  $scope.add = function (i) {

  	var article = "";
    var test = "";

  	console.log("add");
	console.log($scope.indice);

  	console.log(i);

  	function panier_1(un_nom,un_pseudo,un_pseudo_auteurArticle, un_prix) {
  
                this.nom=un_nom;
                this.auteur = un_pseudo_auteurArticle;
                this.pseudo=un_pseudo;
                this.prix=un_prix;
              }

              //console.log(arr);
              //console.log(i);

      var article_panier  = new panier_1($scope.listeArticle[i]["produit"],
      									$scope.listeArticle[i]["pseudo"],
                        $rootScope.user.pseudo,
                        $scope.listeArticle[i]["prix"]);
  
      //var article_panier  = new panier_1($scope.listeArticle[i]["produit"]);
    
      $scope.panier.push(article_panier);
      console.log($scope.panier);
      console.log($scope.panier[$scope.indice]);
      console.log($scope.panier.length);

      for (var k=0;k<$scope.panier.length;k++)
      {
                test = $scope.panier[k].nom  + ";" +  $scope.panier[k].prix + ";" + $scope.panier[k].pseudo;
              //  test = $scope.panier[k].nom  + ";" + $scope.panier[k].pseudo;
               // test = $scope.panier[k].nom;
                
                article = article  + test + "<br/>";

      }

      console.log("innerHTML");
      console.log(article);
      document.querySelector("#listearticles").innerHTML=article;

       $scope.posPannier =$scope.panier.length -1;
      console.log($scope.posPannier);


  }

$scope.supp = function (i) {


  console.log("supp");
  console.log($scope.indice);

  console.log(i);

  var articlebis = "";
  var testbis = "";

  console.log($scope.posPannier);
  
  $scope.panier.splice($scope.posPannier,1);
              
  console.log($scope.panier);

    
  for (var k=0;k<$scope.panier.length;k++)
  {
          testbis = $scope.panier[k].nom  + ";" +  $scope.panier[k].prix + ";" + $scope.panier[k].pseudo;
          articlebis = articlebis  + testbis + "<br/>";

  }


console.log(articlebis);

  document.querySelector("#listearticles").innerHTML=articlebis;

  $scope.posPannier -= 1;  


  }


$scope.save = function (i) {

  console.log("save");
  console.log($scope.indice);

  
//$scope.panier.pseudo_auteurArticle = $rootScope.user.pseudo;
console.log($scope.panier);
console.log($scope.panier.length);
//console.log(JSON.stringify($scope.panier[0]));

   
  for (var k1=0;k1<$scope.panier.length;k1++)
  {
      console.log(JSON.stringify($scope.panier[k1]));  
    
       $http.put('http://localhost:3000/panier', $scope.panier[k1]) 
          .success(function (panier) {
            console.log("retour ok save panier");
            console.log(panier);
            $location.path('/eyes_services_forum');
          })
          .error(function (reason) {
            console.log("put pannierArticle KO");
            console.error(reason);
          })


  }
 

/*$http.put('http://localhost:3000/panier', $scope.panier[0])
          .success(function (panier) {
            console.log("retour ok save panier");
            console.log(panier);
            $location.path('/eyes_services_forum');
          })
          .error(function (reason) {
            console.log("put pannierArticle KO");
            console.error(reason);
          })*/
}


		
	}]);