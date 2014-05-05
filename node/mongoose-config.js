var mongoose = require('mongoose');



var MONGOHQ_URL = 'mongodb://redside:admin@oceanic.mongohq.com:10081/redside';
mongoose.connect(MONGOHQ_URL);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('successfully connected to database!');
});