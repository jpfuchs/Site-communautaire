angular.module('EyesApp.controllers')

	.controller('DashboardController', ['$scope', '$rootScope', function ($scope, $rootScope) {
		console.log("dashboard");


		$rootScope.membre = "";

		console.log("$rootScope.bool");
		//console.log($rootScope.bool);

		if ( !$rootScope.socket ) {   
			console.log("connect");
	    	$rootScope.socket = io.connect('http://localhost:3000');
			//socket = io.connect('http://localhost:3000', {secure:false});
			
		}
		else
		{		console.log("reconnect");
				$rootScope.socket = io.connect('http://localhost:3000', {'forceNew':true });
			

		}
		
		
			//var socket = io.connect('http://localhost:3000');
		
		//socket.on('message', function (data) {
            
    		$rootScope.socket.on('message', function (data) {
            
	            	//console.log("jp");
	            	console.log(data);
	            	//console.log(data.nbclient);

	            	var message = data.nbclient + 'connecte(s)';

        			//console.log("toto");
             		$('.titi').text(message)

            });

		$rootScope.socket.on('membre', function (data) {
		
		//socket.on('membre', function (data) {

				
	            	//$rootScope.membre =  data.pseudo + $rootScope.membre + "<br/>";
	            	console.log(data.pseudo);
	            	$('.toto').html(data.pseudo)

	            	//var message = data.nbclient + 'connecte(s)';

 
            });


 	 
		

	}]);