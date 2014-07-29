var levelup = require('levelup');
var db = levelup('./db');
var crypto = require('crypto');

var getId = function() {
  var randInt = getRandomInt(1, 999999999999999);
  var diffRandInt = getRandomInt(1, 999999999999999);
  var randStringLength = getRandomInt(1, 40);
  randInt = randInt.toString();
  diffRandInt = diffRandInt.toString();
  var randString = 'v84by0cmomcmw0-amckajapsodc9qj].dcq3785$';
  randString = randString.substring(1, randStringLength);
  randInt = randInt + randString + diffRandInt;
  var sha512 = crypto.createHash('sha512');
  sha512.update(randInt);
  var resultHash = sha512.digest("hex");
  var result = resultHash;
  var length = 32;
  var trimmedResult = result.substring(0, length);
  return trimmedResult;
};

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.levelup = levelup;
exports.db = db;
exports.getId = getId;
