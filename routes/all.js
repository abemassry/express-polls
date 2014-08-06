
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
    res.render('poll', { title: question,
                         pollId: req.params.id,
                         data: data,
                         jsonData: jsonPayloadString,
                         voteData: voteData,
                         render: true
                       }
    );
  })
};
