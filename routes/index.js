const express = require('express');
const pact = require('../pact.js');
const router = express.Router();

router.get('/', (req, res, next) => {

  res.render('index', { title: 'Express Polls - Home', 
                        render: true
                      }
  );

});

module.exports = router;
