var pact = require('../pact.js')

exports.main = function(req, res){
  pact.db.get('poll!'+req.params.id, function (err, value) {
    if (err) return console.log(req.params.id+' does not exist in poll.js');
    console.log(req.params.id+' found');
    var pollId = req.params.id;
    //voteData: voteData,
    var data = JSON.parse(value);
    var question = data.question;
    var stats = new Array();
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
        if (question == '') {
          question = 'Untitled';
        }
        var jsonPayload = {total: total, voteData: voteData};
        var jsonPayloadString = JSON.stringify(jsonPayload);
        res.render('embed',{ layout: false,
                             title: question,
                             pollId: req.params.id,
                             data: data,
                             jsonData: jsonPayloadString,
                             voteData: voteData,
                             render: true
                           }
        );
      })
    }); // db.get poll end
};
