redSide.controller("HomeController", function ($scope, $location) {
	$scope.submitForm =  function () {
		
		var neighborhood = $('#search_form select[name="neighborhood"]').val(),
			size = $('#search_form select[name="size"]').val(),
			price = $('#search_form select[name="price"]').val();
		
		$location.url('/seattle-properties/' + neighborhood + '/' + size + '/' + price);

	}
});

redSide.controller("mapController", function ($scope, $routeParams, $http) {
		var neighborhood = ($routeParams.neighborhood),
			size = ($routeParams.size),
			price = ($routeParams.price);

		$http.get('/mapListings/' + neighborhood + '/' + size + '/' + price).success(function(data, status){
			console.log(data);
			console.dir(data);
		});

});