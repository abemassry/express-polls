const express = require('express');
const pact = require('../pact.js');
const router = express.Router();

router.post('/', (req, res, next) => {
  if (req.body.poll_id) {
    var pollId = req.body.poll_id;
    console.log('got pollId '+ pollId);
    var uid = req.body.uid;
    pact.db.get('poll!'+pollId, (err, value) => {
      if (err) return console.log(req.body.id+' does not exist in vote.js');
      var voteId = pact.getId();
      var answer = req.body.answer;
      var putValue = { user: uid, vote: answer};
      var stats = new Array();
      pact.db.put('vote!' + pollId + '!' + voteId, JSON.stringify(putValue), 
        (err) => {
          if (err) return console.log('db error', err);
          // get current poll stats
          pact.db.createReadStream({start: 'vote!'+pollId + '!', 
                                      end: 'vote!'+pollId + '!~'
                                  })
            .on('data', (data) => {
              var vote = JSON.parse(data.value).vote;
              stats.push(vote);
            })
            .on('end', () => {
              
              var statsCount = {};
              var stat;
              for (var i=0; i<stats.length; i++) {
                stat = statsCount[stats[i]];
                if (stat) {
                  statsCount[stats[i]] = stat + 1;
                } else {
                  statsCount[stats[i]] = 1;
                }
              }
              var pollAnswers = JSON.parse(value).answers;
              
              var voteData = [];
              var total = 0;
              for (var i=0; i<pollAnswers.length; i++) {
                if(!statsCount[pollAnswers[i]]) {
                  statsCount[pollAnswers[i]] = 0;
                }
                voteData[i] = { label: pollAnswers[i], 
                                data: statsCount[pollAnswers[i]]
                              };
                total = total + statsCount[pollAnswers[i]];
              }
              console.log(' ');
              console.log('total');
              console.log(total);
              console.log(' ');
              var jsonPayload = {total: total, voteData: voteData};
              var jsonPayloadString = JSON.stringify(jsonPayload);
              pact.io.emit(pollId, jsonPayloadString);
              res.end(jsonPayloadString);
              //var voteData = [
              //  { label: "Polls",  data: 20},
              //  { label: "Learning",  data: 50},
              //  { label: "Fun",  data: 30}
              //];
              //res.end
              // update with websockets
              


            })
              
        }
      );
    });
  }
});
module.exports = router;
