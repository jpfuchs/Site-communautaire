angular.module('EyesApp.controllers')

	.controller('LayoutController', ['$scope', '$rootScope', '$window', function ($scope, $rootScope, $window) {
		if ($window.localStorage.user) {
			$rootScope.user = JSON.parse($window.localStorage.user);
		}
	}]);