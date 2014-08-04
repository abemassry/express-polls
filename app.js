//Module dependencies

var express = require('express');
var http = require('http');
var path = require('path');
var expressLayouts = require('express-ejs-layouts');
var flash = require('connect-flash');

var app = express();
server = http.createServer(app);
var io = require('socket.io').listen(server);
exports.io = io;
// 
// All routes go in routes directory
// route file ex. users.js
// routes take the form of ex. routes.users.main
// can have subroutes in each file
//
var routes = new Array();
require("fs").readdirSync("./routes").forEach(function(file) {
  if (file.match(/.+\.js$/g) !== null) {
    var name = file.replace('.js', '');
    routes[name] = require('./routes/' + file);
  }
});


app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.set('layout', 'layout');
  app.use(expressLayouts);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser('keyboard cat'));
  app.use(express.session({ cookie: { maxAge: 60000 }}));
  app.use(flash());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'public/javascripts')));
  app.use(function(err, req, res, next){
    console.error(err.stack);
    res.send(500, 'Something broke!');
  });
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// routes list

app.get('/', routes.index.main);
app.get('/create', routes.create.main);
app.post('/create', routes.create.main);
app.get('/poll/:id', routes.poll.main);
app.post('/vote', routes.vote.main);
app.post('/newuid', routes.newuid.main);
app.post('/checkvoted', routes.checkVoted.main);
app.post('/checksubmitted', routes.checkSubmitted.main);


server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

console.log(' ');
console.log(' ');
console.log('From app.js ');
console.log(io);
console.log(' ');
console.log(' ');
console.log(' ');
