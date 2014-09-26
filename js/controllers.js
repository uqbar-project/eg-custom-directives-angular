'use strict';

var app = angular.module('customDirectivesApp', []);

/* Controllers */
app.controller('CustomDirectivesCtrl', function ($scope, $http) {
	
	$scope.juan = {
			nombre : 'Juan',
			apellido : 'Perez',
			edad : 32
	}
	
	$scope.mensaje = 'Mundo En el Scope'

		
	$scope.saldo = -2
	$scope.incrementarSaldo = function() { 
		$scope.saldo++ 
	}
	$scope.decrementarSaldo = function() { 
		$scope.saldo--
	}
});



// ***************************************
// ** directivas
// ***************************************

// 1 - simple <holaMundo>
app.directive('holaMundo', function() {
    return {
    	restrict : 'AE',
    	template : "<input type=text value='Hola Mundo !!!'/>"
    }
});




// 2 - con acceso al scope
app.directive('holaParametrico', function() {
    return {
    	restrict : 'AE',
    	template : "Hola {{mensaje}} !!!"
    }
});



// 3 - con html propio (requiere server-side!)
app.directive('holaHtmlPropio', function() {
	return {
		restrict : 'AE',
		templateUrl: 'holaHtmlPropio.html'
	};
});


// 4 - con scope propio!
app.directive('saludo', function() {
    return {
    	restrict : 'E',
    	template : 'Hola {{ aQuien.apellido }}!!!',
    	scope : {
    		aQuien : "=a"
    	}
    }
});


// 5 - con compile 
app.directive('error', function() {
	var directive = {};
	directive.restrict = 'E';
	directive.compile = function(element, attribute) {
		element.css("background-color", "red")
		element.css("color", "white")
		element.css("padding", "5px")
	}
	return directive;
});







//6 - con link
app.directive('saldo', function() {
	var directive = {};
	directive.restrict = 'E';
	directive.link = function($scope, element, attribute) {
		element.css("background-color", $scope.saldo >= 0 ? "green" : "red")
		element.css("color", "white")
		element.css("padding", "5px");
	}
	return directive;
});


//7 - saldo bien hecho
app.directive('balance', function() {
	var directive = {};
	directive.restrict = 'E';
	directive.link = function($scope, element, attribute) {
		element.css("background-color", $scope.saldo >= 0 ? "green" : "red")
		element.css("color", "white")
		element.css("padding", "5px");
		
		$scope.$watch('saldo', function() {
			element.css("background-color", $scope.saldo >= 0 ? "green" : "red")
		})
	}
	return directive;
});
