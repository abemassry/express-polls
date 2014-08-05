var pact = require('../pact.js')

exports.main = function(req, res){
  pact.db.get('poll!'+req.params.id, function (err, value) {
    if (err) return console.log(req.params.id+' does not exist in poll.js');
    console.log(req.params.id+' found');
    //voteData: voteData,
    var data = JSON.parse(value);
    var question = data.question;
    pact.db.put('vote!' + pollId + '!' + voteId, JSON.stringify(putValue), 
      function(err) {
        if (err) return console.log('db error', err);
        // get current poll stats
        pact.db.createReadStream({start: 'vote!'+pollId + '!', 
                                    end: 'vote!'+pollId + '!~'
                                })
          .on('data', function(data){
            var vote = JSON.parse(data.value).vote;
            stats.push(vote);
          })
          .on('end', function() {
            
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
            pact.io.emit('payload', jsonPayloadString);
            res.render('poll', { title: question,
                                 pollId: req.params.id,
                                 data: data,
                                 jsonData: value,
                                 render: true
                               }
            );
  });
};
