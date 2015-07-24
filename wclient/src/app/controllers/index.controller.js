angular.module('EyesApp.controllers')

	.controller('IndexController', ['$scope', '$rootScope', '$http', '$location', '$window', function ($scope, $rootScope, $http, $location, $window) {
		$scope.userLogin = {};
		$scope.submit = function (form) {
			console.log(form);
			if (form.$valid) {
				console.log($scope.userLogin);
				//http://localhost:3000/users/login POST
				$http.post('http://localhost:3000/users/login', $scope.userLogin)
					.success(function (user) {
						$rootScope.user = user;
						$window.localStorage.user = JSON.stringify(user);
						$location.path('/dashboard');
					})
					.error(function (reason) {
						console.error(reason);
					});
			}
		}

		 $window.localStorage.clear();
          $rootScope.user = "";
           
		//$scope.
	}]);