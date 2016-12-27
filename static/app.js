;(function(){

	"use strict";

	var app = angular.module("myApp", [

		//third party modules
		'ui.router',

		//in built module dependencies
		'myApp.shared',
		'myApp.home'

	]);

	//global variables
	var templateBaseUrl = '/templates/';

	var sharedObject = {
		header: {
			templateUrl: templateBaseUrl + 'shared/states/header-partial.html',
			controller: 'HeaderController'
		},
		footer: {
			templateUrl: templateBaseUrl + 'shared/states/footer-partial.html',
			controller: 'FooterController'
		}
	};

	app.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider){

		//routing
		$urlRouterProvider.otherwise('/home');

		$stateProvider.state('home',{
			url: '/home',
			views:{
				header: sharedObject.header,
				footer: sharedObject.footer,
				content: {
					templateUrl: templateBaseUrl + 'home/states/home-partial.html',
					controller: 'HomeController'
				}
			}
		});

	}]);

})();