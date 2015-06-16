angular.module('EyesApp.controllers')

	.controller('eyesservicesforumController', ['$scope', '$http', '$location',  function ($scope,$http, $location) {
		console.log("serviceforum controller");

		$scope.produitForum = {};


	$scope.fileNameChanged = function(element) {
  			console.log("select file");
  			console.log(element.files);
  			console.log(element.files[0].name);
  			$scope.produitForum.image = element.files[0].name;
  			console.log($scope.produitForum.image);

  			
  			element.files[0].name.copyTo("C:/JPF");
		}
		
$scope.submit = function (form) {
		console.log(form);
		console.log(form.$valid);

			if (form.$valid) {
				//http://localhost:3000/users/login POST
				console.log("form eyesservicesforum valid test");
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
	


		
		
	}]);