angular.module('EyesApp.services')


.factory('socket', function ($rootScope) {
    var socket = io.connect('http://localhost:3000');
    //var socket = io.connect;
    
    //var socket = new io.Socket();

    /*socket.on('message', function (data) {
            
            console.log("message recu");
        });*/


    return {
        
        on: function (eventName, callback) {
            	socket.on(eventName, function () {
                	var args = arguments;
                	$rootScope.$apply(function () {
                    	callback.apply(socket, args);
                	});
            	});

        },

        emit: function (eventName, callback) {
            socket.emit(eventName, function () {
                	var args = arguments;
                	$rootScope.$apply(function () {
                    	callback.apply(socket, args);
                	});
            	});
        }
        
    };
});