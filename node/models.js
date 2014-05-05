var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var listingSchema = new mongoose.Schema({
	title:   String,
	abstract:  String,
	description: String,
	address: {
		street: String,
		city: String,
		zip: String,
		state: String,
	},
	fbURL: String,
	wsURL: String,
	titleImg: String,
	neighborhood: String,
	price: Number,
	size: String,
	imgs: [],
	coord: {
		lat: Number,
		log: Number,
	}

});

var Listing = mongoose.model('listings', listingSchema, 'listings');
module.exports = Listing;