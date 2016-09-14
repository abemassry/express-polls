const express = require('express');
const pact = require('../pact.js');
const router = express.Router();

router.get('/', (req, res, next) => {
  const polls = [];
  pact.db.createReadStream({start: 'poll!', 
                              end: 'poll!~'
                          })
    .on('data', (data) => {
      const title = JSON.parse(data.value).question;
      console.log(title);
      const id = data.key.split('!');
      polls.push({id: id[1], title});
    })
    .on('end', () => {
      res.render('all', { title: 'All',
                          polls,
                          render: false
                         }
      );
    })
});

module.exports = router;
