redSide.controller("HomeController", function ($scope, $location, $http) {

	var dataQueue = [];
	var dataShow = [];

	$http.get('/featured').success(function(data, status) {
		console.dir(data);
		queueData(data);
		$scope.listings = dataShow;

		// $scope.listings.
		// $scope.$apply();
	});

	$scope.submitForm =  function () {
		
		var neighborhood = $('#search_form select[name="neighborhood"]').val(),
			size = $('#search_form select[name="size"]').val(),
			price = $('#search_form select[name="price"]').val();
		
		$location.url('/seattle-properties/' + neighborhood + '/' + size + '/' + price);

	};

	function queueData (data) {
		dataQueue = data;
		dataShow = dataQueue.splice(0,3);
		console.dir(dataShow);
		console.dir(dataQueue);

	}

	$scope.arrowClick = function (point) {
		console.log(point);
		if (point == 'left') {
			var x = $scope.listings.shift();
			dataQueue.unshift(x);

			var y = dataQueue.pop();
			$scope.listings.push(y);
		} else {
			var x = $scope.listings.pop();
			dataQueue.push(x);

			var y = dataQueue.shift();
			$scope.listings.unshift(y);
		}

	};

	
	// $scope.$on('$routeChangeSuccess', function () {
	// 	FB.XFBML.parse();
	// });
		


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
	          center: new google.maps.LatLng(nGPS[neighborhood].lat, nGPS[neighborhood].lng),
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
				    title: listings[i].title
				});
				markersArray.push(marker);
				google.maps.event.addListener(marker, 'click', 	function () {
					for (var y = 0; y < listings.length; y ++) {
						markersArray[y].setIcon('https://www.google.com/mapfiles/marker.png');
						if(listings[y]._id == this.id) {
							$scope.listing = listings[y];
							$scope.$apply();

						}
					}
					map.panTo(this.position);
					$scope.toggleShortlistingContainer (true);
					$scope.toggleTabs(1);
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

		};

		$scope.toggleTabs = function (toggle) {
			if (toggle == 0) {
				$('#listing_tab').css({display:'visible'});
				$('#detail_tab').css({display:'none'});
				$('#search_tab').css({display:'none'});

				$('.active-tab').removeClass('active-tab');
				$('.listing-tab').addClass('active-tab');
			} else if (toggle ==1) {
				$('#listing_tab').css({display:'none'});
				$('#detail_tab').css({display:'visible'});		
				$('#search_tab').css({display:'none'});

				$('.active-tab').removeClass('active-tab');
				$('.detail-tab').addClass('active-tab');		
			} else {
				$('#listing_tab').css({display:'none'});
				$('#detail_tab').css({display:'none'});		
				$('#search_tab').css({display:'visible'});

				$('.active-tab').removeClass('active-tab');
				$('.search-tab').addClass('active-tab');	
			}
		};

		$scope.listingClick = function (e) {
			var listingid = $(e.target).data('listingid');
			var latlng;

			for (var y = 0; y < markersArray.length; y ++) {
				if(markersArray[y].id == listingid) {
					console.dir(markersArray[y]);
					latlng = markersArray[y].position;
					// $scope.listing = markersArray[y];
					markersArray[y].setIcon('https://www.google.com/mapfiles/marker_green.png');
					for (var i=0; i<listings.length; i++) {
						if (markersArray[y].id == listings[i]._id){
							$scope.listing = listings[i];
							break;

						}
					}
				} else {
					markersArray[y].setIcon('https://www.google.com/mapfiles/marker.png');
				}
			}

			map.panTo(latlng);
			$scope.toggleTabs(1);
		};

});

redSide.controller("residentialController", function ($scope, $routeParams, $http, $sce) {

	var id = $routeParams.id;
	$http.get('residential/' + id).success(function(data, status) {
		$scope.listing = data;
		$scope.imgs = data.imgs;
	});

	$scope.renderHtml = function(html_code)
	{
	    return $sce.trustAsHtml(html_code);
	};

});

redSide.controller("propertyOwnerPageController", function ($scope) {

	$scope.poPageClick = function(e) {
		$(e.target).siblings('.po-page-content').slideToggle();
		$(e.target).toggleClass('po-active');
	};

	// angular.element(document).ready(function() {
	// 	FB.XFBML.parse();

	// });

});



var nGPS = {
	"Ballard": {
		lat:47.677,
		lng:-122.38499999999999
	},
	"Capitol Hill": {
		lat:47.625305,
		lng:-122.3221835
	},	
	"Cascase Neighborhood": {
		lat:47.6219695,
		lng:-122.3317151
	},
	"Central District": {
		lat:47.6087583,
		lng:-122.2964235
	},	
	"Columbia City": {
		lat:47.55986559999999,
		lng:-122.28649910000001
	},	
	"Eastlake": {
		lat:47.6417654,
		lng:-122.32648719999997
	},	
	"Fremont": {
		lat:47.6505,
		lng:-122.34989999999999
	},	
	"Leschi": {
		lat:47.6003094,
		lng:-122.2928109
	},
	"Magnolia": {
		lat:47.63963020000001,
		lng:-122.39966019999997
	},
	"North Seattle": {
		lat:47.7170204,
		lng:-122.30093369999997
	},
	"Queen Anne": {
		lat:47.6323268,
		lng:-122.3568641
	},
	"South Lake Union": {
		lat:47.6255703,
		lng:-122.33438769999998
	},
	"University District": {
		lat:47.6627771,
		lng:-122.31387669999998
	},
	"West Seattle": {
		lat:47.5666038,
		lng:-122.38673829999999
	}
};