const express = require('express');
const pact = require('../pact.js');
const router = express.Router();

router.get('/', (req, res, next) => {
  const polls = {};
  const list = [];
  const displayList = [];
  pact.db.createReadStream({start: '!',
                              end: '~'
                          })
    .on('data', (data) => {
      const keySplit = data.key.split('!');
      const type = keySplit[0];
      const id = keySplit[1];

      if (type === 'poll') {
        polls[id] = {
          question: JSON.parse(data.value).question,
          count: 0
        };
      } else if (type === 'vote') {
        if (typeof polls[id] !== 'undefined') {
          polls[id].count = polls[id].count + 1;
        }
      }

    })
    .on('end', () => {
      let i = 0;

      for (let key in polls) {
        list.push({
          id: key,
          title: polls[key].question,
          votes: polls[key].count
        });
      }

      list.sort((a, b) => {
        return parseInt(b.votes) - parseInt(a.votes)
      });

      let listLength = 100;
      if (list.length < 100) {
        listLength = list.length;
      }
      for (let i = 0; i<listLength; i++) {
        displayList[i] = list[i];
      }
      displayList.sort((a, b) => {
        return parseInt(a.votes) - parseInt(b.votes)
      });

      res.render('top', {
        title: 'Top',
        polls: displayList,
        render: false
      });
    })
});

module.exports = router;
