var pact = require('../pact.js')
var util = require('util');

exports.main = function(req, res){
  pact.db.get(req.params.id, function (err, value) {
    if (err) return console.log(req.params.id+' does not exist in poll.js');
    console.log(req.params.id+' found');
    //voteData: voteData,
    var data = JSON.parse(value);
    var question = data.question;
    res.render('poll', { title: question, 
                         data: data, 
                         render: true
                       }
    );
  });
};
