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
			map,
			listings;

			var infowindow = new google.maps.InfoWindow({
			  content: "hello"
			});

		$http.get('/mapListings/' + neighborhood + '/' + size + '/' + price).success(function(data, status){

			listings = data;
			// $scope.data = data;
		    var mapOptions = {
	          center: new google.maps.LatLng(47.6323268, -122.3568641),
	          zoom: 14
	        };
	        map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	        setMarkers();
		});
		function setMarkers() {
			for (var i = 0; i < listings.length; i++) {
				var myLatlng = new google.maps.LatLng(listings[i].coord.lat, listings[i].coord.log);
				var	marker = new google.maps.Marker({
					id: listings[i]._id,
				    position: myLatlng,
				    title:"Hello World!"
				});
				console.dir(listings[i]);
				google.maps.event.addListener(marker, 'click', 	function () {
					for (var y = 0; y < listings.length; y ++) {
						console.log(listings[y]._id);
						console.log(this.id);
						if(listings[y]._id == this.id) {
							$scope.listing = listings[y];
							$scope.$apply();

						}
					}
				
				});

				marker.setMap(map);
			}

		}
		

});