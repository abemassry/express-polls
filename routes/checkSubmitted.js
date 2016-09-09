const express = require('express');
const pact = require('../pact.js');
const router = express.Router();

router.post('/', (req, res, next) => {
  if (req.body.poll) {
    var pollId = req.body.poll;
    var uid = req.body.uid;
    
    pact.db.get('poll!'+ pollId, (err, value) => {
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
