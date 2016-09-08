const levelup = require('levelup');
const db = levelup('./db');
const crypto = require('crypto');
const appio = require('./app.js').io;

let location = 'http://localhost:3000';

if (1 === process.env.PROD) {
  location = 'http://expresspolls.com';
}

var getId = () => {
  let randInt = getRandomInt(1, 999999999999999);
  let diffRandInt = getRandomInt(1, 999999999999999);
  const randStringLength = getRandomInt(1, 40);
  randInt = randInt.toString();
  diffRandInt = diffRandInt.toString();
  let randString = 'v84by0cmomcmw0-amckajapsodc9qj].dcq3785$';
  randString = randString.substring(1, randStringLength);
  randInt = randInt + randString + diffRandInt;
  const sha512 = crypto.createHash('sha512');
  sha512.update(randInt);
  const resultHash = sha512.digest("hex");
  const result = resultHash;
  const length = 32;
  const trimmedResult = result.substring(0, length);
  return trimmedResult;
};

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.levelup = levelup;
exports.db = db;
exports.getId = getId;
exports.io = appio;
exports.location = location;
