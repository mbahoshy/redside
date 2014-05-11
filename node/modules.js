var listing = require('../node/models');

function returnMapListings (req, res) {
	var neighborhood = req.param("neighborhood"),
		size = req.param("size"),
		price = req.param("price");
		searchterms = {};

	if (neighborhood != "all") {
		searchterms.neighborhood = neighborhood;
	}

	// if (size != "all") {
	// 	searchterms.size = size;
	// }
	// if (price != "all") {
	// 	searchterms.price = price;
	// }

	listing.find(searchterms, '', function(err, data) {
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

function returnResidential (req, res) {
	var id = req.param("id");

	listing.findById(id, '', function(err, data) {
		res.json(data);
	})
}

exports.returnMapListings = returnMapListings;
exports.returnFeatured = returnFeatured;
exports.returnResidential = returnResidential;
