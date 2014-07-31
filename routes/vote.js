var pact = require('../pact.js')

exports.main = function(req, res){
  if (req.param('poll_id')) {
    var pollId = req.param('poll_id');
    var uid = req.param('uid');
    pact.db.get('poll!'+pollId, function (err, value) {
      if (err) return console.log(req.params.id+' does not exist in vote.js');
      var voteId = pact.getId();
      var answer = req.param('answer');
      console.log(' ');
      console.log('answer');
      console.log(answer);
      console.log(' ');
      var putValue = { user: uid, vote: answer};
      console.log(' ');
      console.log('putValue');
      console.log(putValue);
      console.log(' ');
      var stats = new Array();
      pact.db.put('vote!' + pollId + '!' + voteId, JSON.stringify(putValue), 
        function(err) {
          if (err) return console.log('db error', err);
          // get current poll stats
          pact.db.createReadStream({start: 'vote!'+pollId + '!', end: 'vote!'+pollId + '!~'})
            .on('data', function(data){
              var vote = JSON.parse(data.value).vote;
              console.log('vote: '+vote);
              stats.push(vote);
            })
            .on('end', function() {
              console.log(' ');
              console.log('stats');
              console.log(stats);
              console.log(' ');
              var voteData = [
                { label: "Polls",  data: 20},
                { label: "Learning",  data: 50},
                { label: "Fun",  data: 30}
              ];
              //res.end
              // update with websockets
              


            })
              
        }
      );
    });
  }
};
