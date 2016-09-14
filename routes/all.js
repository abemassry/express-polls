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
      if (title.match(/href=/) || title.match(/http:/) || title.match(/https:/)) {
        pact.db.del(data.key, (err) => {
          if (err) {
            console.log(err);
          }
        });
      } else {
        console.log(title);
        const id = data.key.split('!');
        polls.push({id: id[1], title});
      }
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
