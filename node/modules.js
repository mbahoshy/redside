var listing = require('../node/models');

function returnMapListings (req, res) {
	var neighborhood = req.param("neighborhood"),
		size = req.param("size"),
		price = req.param("price");

	listing.find({}, '', function(err, data) {
		console.log(data);
		res.json(data);

	});
	console.log(neighborhood);
}

function returnFeatured (req, res) {
	listing.find({featured:true}, '', function(err, data) {
		console.log(data);
		res.json(data);

	});

}

exports.returnMapListings = returnMapListings;
exports.returnFeatured = returnFeatured;
