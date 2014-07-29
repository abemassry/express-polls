var pact = require('../pact.js')

exports.main = function(req, res){
  if (req.param('poll_id')) {
    var pollId = req.param('poll_id');
    pact.db.get(pollId, function (err, value) {
      if (err) return console.log(req.params.id+' does not exist in poll.js');
      var voteId = getId();
      var value = { user: user_id, vote: answer};
      var stats = new Array();
      pact.db.put('vote!' + pollId + '!' + voteId, JSON.stringify(value), 
        function(err) {
          if (err) return console.log('db error', err);
          // get current poll stats
          pact.db.createReadStream({start: pollId + '!~', end: pollId + '!'})
            .on('data', function(data){
              var vote = JSON.parse(data).vote;
              stats.push(vote);
            })
            .on('end', function() {
            // update with websockets
              


            })
              
        }
      );
    });
  }
};
