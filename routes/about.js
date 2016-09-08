const express = require('express');
const pact = require('../pact.js');
const router = express.Router();

router.get('/', (req, res, next) => {

  res.render('about', { title: 'About', 
                        render: true
                      }
  );

});

module.exports = router;
