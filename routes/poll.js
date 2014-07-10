var pact = require('../pact.js')

exports.main = function(req, res){
  pact.db.get(req.params.id, function (err, value) {
    if (err) return console.log(req.params.id+' does not exist in poll.js');
    console.log(req.params.id+' found');
    console.log(value);

    var voteData = [
      { label: "Polls",  data: 20},
      { label: "Learning",  data: 50},
      { label: "Fun",  data: 30}
    ];
    res.render('index', { title: 'Express Polls - Poll', 
                          voteData: voteData, 
                          render: true
                        }
    );
  });
};
