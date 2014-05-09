redSide.controller("HomeController", function ($scope, $location, $http) {

	var dataQueue = [];
	var dataShow = [];

	$http.get('/featured').success(function(data, status) {
		console.dir(data);
		queueData(data);
		$scope.listings = dataShow;

		// $scope.$apply();
	});


	$scope.submitForm =  function () {
		
		var neighborhood = $('#search_form select[name="neighborhood"]').val(),
			size = $('#search_form select[name="size"]').val(),
			price = $('#search_form select[name="price"]').val();
		
		$location.url('/seattle-properties/' + neighborhood + '/' + size + '/' + price);

	}

	function queueData (data) {
		dataQueue = data;
		dataShow = dataQueue.splice(0,3);
		console.dir(dataShow);
		console.dir(dataQueue);

	}

	$scope.arrowClick = function (point) {
		console.log(point);
		if (point == 'left') {
			var x = dataShow.shift();
			dataQueue.unshift(x);

			var y = dataQueue.pop();
			dataShow.push(y);
		} else {
			var x = dataShow.pop();
			dataQueue.push(x);

			var y = dataQueue.shift();
			dataShow.unshift(y);
		}

	}


});

redSide.controller("mapController", function ($scope, $routeParams, $http) {
		var neighborhood = ($routeParams.neighborhood),
			size = ($routeParams.size),
			price = ($routeParams.price),
			coord,
			map,
			toggleCounter = 0,
			listings,
			markersArray = [];


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
				markersArray.push(marker);
				google.maps.event.addListener(marker, 'click', 	function () {
					for (var y = 0; y < listings.length; y ++) {
						markersArray[y].setIcon('https://www.google.com/mapfiles/marker.png')
						if(listings[y]._id == this.id) {
							$scope.listing = listings[y];
							$scope.$apply();

						}
					}
					$scope.toggleShortlistingContainer (true);
					$scope.toggleTabs(1);
					map.panTo(this.position);
					this.setIcon('https://www.google.com/mapfiles/marker_green.png');
				});

				marker.setMap(map);
			}


		}
		
		$scope.toggleShortlistingContainer = function (mapPoint) {
			var mapsidebar = $('.map-sidebar');
			var sl = $('.shortlisting-container');
			var tab = $('.map-sidebar-button');
			var left = mapsidebar.css('width');
			if (toggleCounter === 0) {
				mapsidebar.css({display:'inline'});
				tab.animate({left:left}, 250);
				sl.animate({left:'0'}, 250);
				toggleCounter = 1;
				console.log('vag');		
			}
			else if (mapPoint != true) {
				toggleCounter = 0;
				tab.animate({left:"0"}, 250);
				sl.animate({left:"-102%"}, 250, function () {
					mapsidebar.css({display:'none'});

				});
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

		$scope.listingClick = function (e) {
			var listingid = $(e.target).data('listingid');
			var latlng;

			for (var y = 0; y < listings.length; y ++) {
				if(listings[y]._id == listingid) {
					latlng = new google.maps.LatLng(listings[y].coord.lat, listings[y].coord.log);
					$scope.listing = listings[y];

				}
			}

			map.panTo(latlng);
			$scope.toggleTabs(1);
		}

});

redSide.controller("residentialController", function ($scope, $routeParams, $http) {

	var id = $routeParams.id;
	$http.get('residential/' + id).success(function(data, status) {
		$scope.listing = data;
	});


});