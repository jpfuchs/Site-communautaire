angular.module('EyesApp.controllers')

	.controller('EyesservicesController', ['$scope', '$http', '$location',  function ($scope,$http, $location) {
		console.log("eyesservice controller");

		$scope.userServices = {};


		$scope.submit = function (form) {
		console.log(form);
		console.log(form.$valid);
			if (form.$valid) {
				//http://localhost:3000/users/login POST
				console.log("form eyesservices valid test");

			$http.post('http://localhost:3000/users/services', $scope.userServices)
					.success(function (user) {
						console.log(user);
						console.log("test ok jP");
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