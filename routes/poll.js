const express = require('express');
const pact = require('../pact.js');
const router = express.Router();

router.get('/:id', (req, res, next) => {
  pact.db.get(`poll!${req.params.id}`, (err, value) => {
    if (err) return console.log(`${req.params.id} does not exist in poll.js`);
    console.log(`${req.params.id} found`);
    const pollId = req.params.id;
    //voteData: voteData,
    const data = JSON.parse(value);
    let question = data.question;
    const stats = [];
    pact.db.createReadStream({start: `vote!${pollId}!`,
                                end: `vote!${pollId}!~`
                            })
      .on('data', (data) => {
        let vote = JSON.parse(data.value).vote;
        stats.push(vote);
      })
      .on('end', () => {

        const statsCount = {};
        let stat;
        for (let i=0; i<stats.length; i++) {
          stat = statsCount[stats[i]];
          if (stat) {
            statsCount[stats[i]] = stat + 1;
          } else {
            statsCount[stats[i]] = 1;
          }
        }
        const pollAnswers = JSON.parse(value).answers;

        const voteData = [];
        let total = 0;
        for (let i=0; i<pollAnswers.length; i++) {
          if(!statsCount[pollAnswers[i]]) {
            statsCount[pollAnswers[i]] = 0;
          }
          voteData[i] = { label: pollAnswers[i], 
                          data: statsCount[pollAnswers[i]]
                        };
          total = total + statsCount[pollAnswers[i]];
        }
        const jsonPayload = {total: total, voteData: voteData};
        const jsonPayloadString = JSON.stringify(jsonPayload);
        if (question === '') {
          question = 'Untitled';
        }
        res.render('poll', { title: question,
                             pollId: req.params.id,
                             data,
                             jsonData: jsonPayloadString,
                             voteData: voteData,
                             location: pact.location,
                             render: true
                           }
        );
      })
    }); // db.get poll end
});

module.exports = router;
