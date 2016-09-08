const express = require('express');
const pact = require('../pact.js');
const router = express.Router();

router.post('/', (req, res, next) => {
  if (req.param('poll')) {
    var pollId = req.param('poll');
    var uid = req.param('uid');
    
    pact.db.get('poll!'+ pollId, function (err, value) {
      if (err) return console.log(pollId+' does not exist in checksubmitted.js');
      var user = JSON.parse(value).user;
      if (user === uid) {
        res.end('true');
      } else {
        res.end('false');
      }
    });

  }
});

module.exports = router;
