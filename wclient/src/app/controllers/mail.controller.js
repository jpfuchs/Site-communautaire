angular.module('EyesApp.controllers')

	.controller('mailController', ['$scope','$http', function ($scope, $http) {
		
			$scope.email = {};

		    console.log("EmailController");

		    $scope.submit = function (form) {

		    		if (form.$valid) {
						//http://localhost:3000/users/login POST
						console.log("form mail valid");
						console.log($scope.email);

						$scope.email.sender="jfuchsloch@gmail.com";
					
						$http.post('http://localhost:3000/mail', $scope.email)
						.success(function (email) {
							console.log("return email ok");
							document.querySelector("#message").innerHTML="votre email a ete envoye";

							//$location.path('/dashboard');
						})
						.error(function (reason) {
						console.error(reason);
						})
					}
					else
					{
						console.log("form mail invalid");
						//$location.path('/');

					}
		   }

        
	}]);