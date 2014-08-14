express-polls
=============

Quick Realtime Polls

## Overview

This webapp was created for a number of reasons. One was to provide a 
method for creating other sites like it.  Another reason was to be able to 
take quick polls and have the subsequent votes show up in real time, without 
having to reload the page.  And the final reason was to get a chance to try out 
LevelDB in an application.

## Installation

First clone the repo into a directory where you would like to host it and set 
the port environment variable to the port you want to run it on. In example
for bash:

```bash

$ git clone git@github.com:abemassry/express-polls.git
$ npm install
# might have to use 'sudo npm install' depending on how you installed node
$ mkdir db
$ export PORT=80
$ node app.js

```
In production you want to use something like forever

```bash
$ forever app.js
```

It should be visible at http://localhost or http://localhost:3000 if the PORT 
wasn't set.

## Code Layout

The app is a standard express app kicked off with the express-generator.
All of the route files are loaded in by browsing the routes directory and
grabbing all of the `.js` files.  In each `.js` file there is an exports 
containing a `main` function.  The routes are then listed at the bottom of 
the `app.js` file.

```js
// the index route in routes/index.js
exports.main = function(req, res){

```

```js

// 
// From SO:
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

```

And then the routes at the bottom of app.js

```js

// routes list

app.get('/', routes.index.main);
app.get('/create', routes.create.main);
app.post('/create', routes.create.main);

```

Any libraries needed are listed in `pact.js`. They are then called with 
`pact.db...` or `pact.io...` This is done so that one file can be called at 
the top of each route and to make it easier for maintainability if a library 
needs to be swapped, and so we don't have require statements in each separate 
route.  We also would prefer not to have all the routes in one huge file.

ejs was used because of it's similarity to HTML.

## LevelDB

The good thing about LevelDB for this application is you don't need to install 
a separate database and have that running and worry about it.  The LevelDown 
node package includes the C++ libraries and executables to run it.  So the 
app should be ready to go and start saving data to the db directory.

This was the first time I tried LevelDB so it took some time to get used to. 
This also was a new way of thinking for me about databases.

### Thought Process about databases

| Database   | What I see it as | relationships are preserved with  |
|------------|------------------|-----------------------------------|
| MySQL      | Table storage    | normalizing the tables            |
| MongoDB    | Document store   | subdocs                           |
| LevelDB    | Key Value Store  | namespacing the keys              |

I'm a beginner at all of these but they always seem to pop up in a webapp and 
Even a simple app there is usually some issue that manages to crop up that 
takes a little while to figure out.

## Libraries Used

[flot.js](http://www.flotcharts.org/)
[LevelUp](https://github.com/rvagg/node-levelup)
[Socket.IO](http://socket.io/)

## Inspiration

https://polls.abrah.am/


