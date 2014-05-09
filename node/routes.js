var mod = require('../node/modules');
// var Auth = require('./auth');


module.exports = function (app) {

	//responds with index.html
	app.get("/", function(req, res) {
		res.end();

	});

	app.get("/mapListings/:neighborhood/:size/:price", mod.returnMapListings);
	app.get("/featured", mod.returnFeatured);
	app.get("/residential/:id", mod.returnResidential);
}

