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
			price = ($routeParams.price),
			coord,
			map;

		$http.get('/mapListings/' + neighborhood + '/' + size + '/' + price).success(function(data, status){
			console.log(data);
			console.dir(data);
			coord = data[0].coord;
			console.dir(coord);
			$scope.data = data;
		    var mapOptions = {
	          center: new google.maps.LatLng(coord.lat, coord.log),
	          zoom: 8
	        };
	        map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	        setMarkers(data);
		

		});
		function setMarkers(data) {
			for (var i = 0; i < data.length; i++) {
				var myLatlng = new google.maps.LatLng(data[i].coord.lat, data[i].coord.log);
				console.dir(data[i].coord.lat);
				var marker = new google.maps.Marker({
				    position: myLatlng,
				    title:"Hello World!"
				});
			}
			marker.setMap(map);
		}
});