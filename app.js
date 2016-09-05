//Module dependencies

const express = require('express');
const expressSession = require('express-session');
const http = require('http');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const app = express();
const server = http.createServer(app);
const io = require('socket.io').listen(server);
exports.io = io;
// 
// From SO:
// All routes go in routes directory
// route file ex. users.js
// routes take the form of ex. routes.users.main
// can have subroutes in each file
//
const routes = [];
require("fs").readdirSync(path.join(__dirname, 'routes')).forEach((file) => {
  if (file.match(/.+\.js$/g) !== null) {
    var name = file.replace('.js', '');
    routes[name] = require(path.join(__dirname, 'routes/') + file);
  }
});


app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('layout', 'layout');
app.use(expressLayouts);
app.use(expressSession({
  secret: 'this_is_a_secret_here',
  resave: false,
  saveUninitialized: true,
  cookie: {
    path: '/',
    httpOnly: true
  }
}));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.cookieParser('keyboard cat'));
app.use(express.session({ cookie: { maxAge: 60000 }}));
app.use(flash());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/javascripts')));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.send(500, 'Something broke!');
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
app.get('/all', routes.all.main);
app.get('/top', routes.top.main);
app.get('/about', routes.about.main);
app.get('/embed/:id', routes.embed.main);


server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

