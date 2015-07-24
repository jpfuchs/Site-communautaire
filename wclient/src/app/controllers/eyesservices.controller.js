angular.module('EyesApp.controllers')

	.controller('EyesservicesController', ['$scope', '$http', '$location', '$rootScope',  function ($scope,$http, $location, $rootScope) {
		console.log("eyesservice controller");

		$scope.userServices = {};
		$rootScope.MembreServices = {};


		$scope.submit = function (form) {
		console.log(form);
		console.log(form.$valid);
			if (form.$valid) {
				//http://localhost:3000/users/login POST
				console.log("form eyesservices valid test");

			$http.post('http://localhost:3000/users/services', $scope.userServices)
					.success(function (user) {
						console.log("he");
						console.log(user);
						$rootScope.MembreServices = user;
						console.log("test ok jP avant");
						console.log($rootScope.MembreServices);
						console.log("test ok jp apres");
						$location.path('/eyes_services_accueil');
					})
					.error(function (reason) {
						console.error(reason);
					});
			}
			else
			{
				console.log("form eyesservice invalid test");
				//$location.path('/');

			}
		}
	
		
	}]);