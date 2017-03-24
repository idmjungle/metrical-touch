var app = angular.module('app', ['ngRoute', 'ngCookies', 'ngSanitize', 'ngAnimate', 'ngMeta', 'ui.bootstrap']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider.
		when('/intro', {
			templateUrl: 'partials/intro.html',
			controller: 'IntroController',
		}).
		when('/main', {
			templateUrl: 'partials/main.html',
			controller: 'MainController',
		}).
		otherwise({
			redirectTo: 'intro'
		});
		
		$locationProvider.html5Mode(true);
}])
	.run(function(ngMeta) {
		ngMeta.init();
	});