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
  // app.use(require('prerender-node').set('prerenderToken', '9yXrqAfqWsGHepGnpUe7'));
  app.use(express.bodyParser());
});

app.use(function(req, res, next) {
  var fragment = req.query._escaped_fragment_;
  console.log("vagina");
  console.log(fragment);
  // If there is no fragment in the query params
  // then we're not serving a crawler
  if (!fragment) return next();

  // If the fragment is empty, serve the
  // index page
  if (fragment === "" || fragment === "/")
    fragment = "/index.html";

  // If fragment does not start with '/'
  // prepend it to our fragment
  if (fragment.charAt(0) !== "/")
    fragment = '/' + fragment;

  // If fragment does not end with '.html'
  // append it to the fragment
  if (fragment.indexOf('.html') == -1)
    fragment += ".html";

  // Serve the static html snapshot
  try {
    var file = __dirname + "/snapshots" + fragment;
    res.sendfile(file);
  } catch (err) {
    res.send(404);
  }
});


require('./node/mongoose-config');


// require('./config/passport')(passport); // config passport, pass in passport as parameter



require('./node/routes')(app);

//set port
var port = process.env.PORT || 3000;
app.listen(port);
console.log("Started server on port " + port);