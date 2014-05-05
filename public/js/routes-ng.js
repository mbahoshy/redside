redSide.config(['$routeProvider', function ($routeProvider){
	$routeProvider.when('/', {
		templateUrl: '../views/home-view.html',
		controller: 'HomeController'
	});
	$routeProvider.when('/seattle-properties/:neighborhood/:size/:price', {
		templateUrl: '../views/map-view.html',
		controller: 'mapController'
	});
}]);