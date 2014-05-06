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
			toggleCounter = 0,
			listings;


			var infowindow = new google.maps.InfoWindow({
			  content: "hello"
			});

		$http.get('/mapListings/' + neighborhood + '/' + size + '/' + price).success(function(data, status){

			listings = data;
			$scope.listings = listings;
			// $scope.data = data;
		    var mapOptions = {
	          center: new google.maps.LatLng(47.6323268, -122.3568641),
	          zoom: 14,
	          zoomControl: true,
			  zoomControlOptions: {
			  		style: google.maps.ZoomControlStyle.LARGE,
					position: google.maps.ControlPosition.RIGHT_CENTER
			  },
			  panControl: true,
			  panControlOptions: {
			  		position: google.maps.ControlPosition.TOP_RIGHT
			  },
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
					$scope.toggleShortlistingContainer (true);
					$scope.toggleTabs(1);
					map.panTo(this.position);
				});

				marker.setMap(map);
			}


		}
		
		$scope.toggleShortlistingContainer = function (mapPoint) {
			var sl = $('.shortlisting-container');
			var tab = $('.map-sidebar-button');
			if (toggleCounter === 0) {
				tab.animate({left:"25%"}, 250);
				sl.animate({left:'0'}, 250);
				toggleCounter = 1;		
			}
			else if (mapPoint != true) {
				toggleCounter = 0;
				tab.animate({left:"0"}, 250);				
				sl.animate({left:"-102%"}, 250);
			} 

		}

		$scope.toggleTabs = function (toggle) {
			if (toggle == 0) {
				$('#listing_tab').css({display:'visible'});
				$('#detail_tab').css({display:'none'});

				$('.listing-tab').addClass('active-tab');
				$('.detail-tab').removeClass('active-tab');
			} else {
				$('#listing_tab').css({display:'none'});
				$('#detail_tab').css({display:'visible'});		

				$('.listing-tab').removeClass('active-tab');
				$('.detail-tab').addClass('active-tab');		
			}
		}

});