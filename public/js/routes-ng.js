redSide.config(['$routeProvider', function ($routeProvider){
	$routeProvider.when('/', {
		templateUrl: '../views/home-view.html',
		controller: 'HomeController'
	});
}]);