var mod = require('../node/modules');
// var Auth = require('./auth');


module.exports = function (app) {

	//responds with index.html
	app.get("/", function(req, res) {
		res.end();

	});
}

