var path = require("path"),
    express = require("express"),
    _ = require("underscore");

var app = express ();
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'public/pages')));
// var passport = require("passport"); // require passport
// app.use(express.cookieParser());
// app.use(express.bodyParser());
// app.use(express.session({ secret: 'SECRET' }));//must be before passport session
// app.use(passport.initialize()); //initialize passport
// app.use(passport.session()); //create passport session

app.configure(function(){
  app.use(express.bodyParser());
});

// require('./node/mongoose-config');


// require('./config/passport')(passport); // config passport, pass in passport as parameter



require('./node/routes')(app);

//set port
var port = process.env.PORT || 3000;
app.listen(port);
console.log("Started server on port " + port);