var pact = require('../pact.js')

exports.main = function(req, res){
  if (req.param('poll_id') {
    var pollId = req.param('poll_id');
    pact.db.get(pollId, function (err, value) {
      if (err) return console.log(req.params.id+' does not exist in poll.js');
      pact.poll.put(pollId + '!' + 
      console.log(req.params.id+' found');
      //voteData: voteData,
      var data = JSON.parse(value);
      var question = data.question;
      res.render('poll', { title: question,
                           poll_id: req.params.id,
                           data: data, 
                           render: true
                         }
      );
    });
  }
};
