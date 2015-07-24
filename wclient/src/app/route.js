angular.module('EyesApp')

	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'templates/index.tpl.html',
				controller: 'IndexController'
			})
			.when('/inscription', {
				templateUrl: 'templates/inscription.tpl.html',
				controller: 'InscriptionController'
			})
			.when('/dashboard', {
				templateUrl: 'templates/dashboard.tpl.html',
				controller: 'DashboardController'
			})
			.when('/eyes_services', {
				templateUrl: 'templates/eyes_services.tpl.html',
				controller: 'EyesservicesController'
			})
			.when('/eyes_services_accueil', {
				templateUrl: 'templates/eyes_services_accueil.tpl.html',
				controller: 'eyesservicesaccueilController'
			})
			.when('/eyes_services_forum', {
				templateUrl: 'templates/eyes_services_forum.tpl.html',
				controller: 'eyesservicesforumController'
			})
			.when('/mail', {
				templateUrl: 'templates/mail.tpl.html',
				controller: 'mailController'
			})
			.otherwise({
				redirectTo: '/'
			})
	}])