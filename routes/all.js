const express = require('express');
const pact = require('../pact.js');
const router = express.Router();

router.get('/', (req, res, next) => {
  var polls = new Array();
  pact.db.createReadStream({start: 'poll!', 
                              end: 'poll!~'
                          })
    .on('data', function (data) {
      var title = JSON.parse(data.value).question;
      var id = data.key.split('!');
      polls.push({id: id[1], title: title});
    })
    .on('end', function() {
      res.render('all', { title: 'All',
                          polls: polls,
                          render: false
                         }
      );
    })
});

module.exports = router;
