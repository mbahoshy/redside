redSide.directive('header', function () {
	return {
		restrict:'A',
		replace: true,
		// templateUrl: 'div>'
		templateUrl: '/views/header.html'
	};
});

redSide.directive('footer', function () {
	return {
		restrict:'A',
		replace: true,
		// templateUrl: 'div>'
		templateUrl: '/views/footer.html'
	};
});
