const express = require('express');
const pact = require('../pact.js');
const router = express.Router();

router.post('/', (req, res, next) => {
  if(req.params.getUid) {
    var uid = pact.getId();
    res.end(uid);
  }
});

module.exports = router;
