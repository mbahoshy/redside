redSide.directive('header', function () {
	return {
		restrict:'A',
		replace: true,
		// templateUrl: 'div>'
		templateUrl: '/views/header.html'
	};
});
console.log('header');