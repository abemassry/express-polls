//Module dependencies

const express = require('express');
const session = require('express-session');
const http = require('http');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multer = require('multer');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieSession = require('cookie-session');
const errorHandler = require('errorhandler');
const methodOverride = require('method-override');

const app = express();
const server = http.createServer(app);
const io = require('socket.io').listen(server);
exports.io = io;



app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('layout', 'layout');
app.use(expressLayouts);
app.use(session({
  secret: 'this_is_a_secret_here',
  resave: true,
  saveUninitialized: true,
  cookie: {
    path: '/',
    httpOnly: true
  }
}));
app.use(favicon(path.join(__dirname, 'public/images/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
//app.use(multer());
app.use(flash());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.send(500, 'Something broke!');
});


// routes list
const index = require('./routes/index');
const create = require('./routes/create');
const poll = require('./routes/poll');
const vote = require('./routes/vote');
const newuid = require('./routes/newuid');
const checkVoted = require('./routes/checkVoted');
const checkSubmitted = require('./routes/checkSubmitted');
const all = require('./routes/all');
const top = require('./routes/top');
const about = require('./routes/about');
const embed = require('./routes/embed');

app.use('/', index);
app.use('/create', create);
app.use('/poll', poll);
app.use('/vote', vote);
app.use('/newuid', newuid);
app.use('/checkvoted', checkVoted);
app.use('/checksubmitted', checkSubmitted);
app.use('/all', all);
app.use('/top', top);
app.use('/about', about);
app.use('/embed', embed);

// error handling middleware should be loaded after the loading the routes
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

