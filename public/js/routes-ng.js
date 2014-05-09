redSide.config(['$routeProvider', function ($routeProvider){
	$routeProvider.when('/', {
		templateUrl: '../views/home-view.html',
		controller: 'HomeController'
	});
	$routeProvider.when('/seattle-properties/:neighborhood/:size/:price', {
		templateUrl: '../views/map-view.html',
		controller: 'mapController'
	});
	$routeProvider.when('/seattle-residential/:id', {
		templateUrl: '../views/residential-view.html',
		controller: 'residentialController'
	});
}]);