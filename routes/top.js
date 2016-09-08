const express = require('express');
const pact = require('../pact.js');
const router = express.Router();

router.get('/', (req, res, next) => {
  var polls = {};
  var list = [];
  var displayList = [];
  pact.db.createReadStream({start: '!', 
                              end: '~'
                          })
    .on('data', function (data) {
      var keySplit = data.key.split('!');
      var type = keySplit[0];
      var id = keySplit[1];
      
      if (type === 'poll') {
        polls[id] = { 
          question: JSON.parse(data.value).question,
          count: 0
        };
      } else if (type === 'vote') {
        polls[id].count = polls[id].count + 1;
      }

    })
    .on('end', function() {
      var i = 0;

      for (var key in polls) {
        list.push({ 
          id: key,
          title: polls[key].question,
          votes: polls[key].count
        });
      }

      list.sort(function(a, b) {
        return parseInt(b.votes) - parseInt(a.votes)
      });

      if (list.length > 100) {
        var listLength = 100;
      } else {
        var listLength = list.length;
      }
      for (var i = 0; i<listLength; i++) {
        displayList[i] = list[i];
      }
      displayList.sort(function(a, b) {
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
