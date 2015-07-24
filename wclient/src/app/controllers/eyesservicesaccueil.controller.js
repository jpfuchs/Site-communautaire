angular.module('EyesApp.controllers')

	.controller('eyesservicesaccueilController', ['$scope', '$http', '$location', '$rootScope', function ($scope,$http, $location, $rootScope) {
		console.log("serviceaccueil controller");

		$scope.userServices = {};

		console.log("avant jipi");
		console.log($rootScope.MembreServices);

		
		 //!!il faut traiter la chaine $rootScope.MembreServices

		console.log("apres jipi");
		$('.toto').html($rootScope.MembreServices);

		//$('.toto').html($rootScope.MembreServices)

		
		
	}]);