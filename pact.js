var levelup = require('levelup');
var Sublevel = require('level-sublevel');
var db = Sublevel(levelup('./db'));
var poll = db.sublevel('polls');
exports.levelup = levelup;
exports.Sublevel = Sublevel;
exports.db = db;
exports.poll = poll;
