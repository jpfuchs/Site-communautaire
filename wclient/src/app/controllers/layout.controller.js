angular.module('EyesApp.controllers')

	.controller('LayoutController', ['$scope', '$rootScope', '$location', '$window', '$http', '$timeout', function ($scope, $rootScope, $location, $window, $http, $timeout) {
		if ($window.localStorage.user) {
			$rootScope.user = JSON.parse($window.localStorage.user);
		}

		 
		$rootScope.bool = false;
		
		

		//rajouter une fonction de deconnexion qui vide le localstorage et redirige vers lacceuil
		 $scope.logout = function () {
            

         $http.post('http://localhost:3000/users/logout', $rootScope.user)
         .success(function (listuser) {
						console.log("ok");
						console.log(listuser);
						$('.toto').html(listuser)
					})
					.error(function (reason) {
						console.error(reason);
					});

			
            $window.localStorage.clear();
            $rootScope.user = "";
            console.log("logout");

            $timeout(function () {
            	console.log("test");
					$rootScope.socket.disconnect();
			}, 10000);

           // $rootScope.socket.close();
           $rootScope.bool = true;

        	$location.path('/');
        	
        }

   
	}]);