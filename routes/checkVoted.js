const express = require('express');
const pact = require('../pact.js');
const router = express.Router();

router.post('/', (req, res, next) => {
  if (req.body.poll) {
    const pollId = req.body.poll;
    const uid = req.body.uid;
    
    pact.db.get('poll!'+pollId, (err, value) => {
      if (err) return console.log(pollId+' does not exist in checkvoted.js');
      
      pact.db.createReadStream({start: 'vote!'+ pollId + '!', 
                                  end: 'vote!'+ pollId + '!~'})
        .on('data', (data) => {
          let user = JSON.parse(data.value).user;
          if (user === uid) {
            res.end('true');
          }
        })
        .on('end', () => {
          res.end('false');
        })

    });

  }
});

module.exports = router;
