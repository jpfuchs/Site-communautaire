angular.module('EyesApp.controllers')
	.controller('InscriptionController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
		/*if (!$localStiorage.token) {
				$location.path('/');
			return;
		}*/

	$scope.user = {};
		
	$scope.submit = function (form) {
		console.log(form);
		console.log(form.$valid);
			if (form.$valid) {
				//http://localhost:3000/users/login POST
				console.log("form inscription valid");
				console.log($scope.user);
				$http.put('http://localhost:3000/users', $scope.user)
					.success(function (user) {
						$location.path('/dashboard');
					})
					.error(function (reason) {
						console.error(reason);
					})
			}
			else
			{
				console.log("form inscription invalid");
				//$location.path('/');

			}
		}
		
	}])