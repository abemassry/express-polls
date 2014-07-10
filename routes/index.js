var pact = require('../pact.js')

exports.main = function(req, res){
  var voteData = [
    { label: "Polls",  data: 20},
    { label: "Learning",  data: 50},
    { label: "Fun",  data: 30}
  ];

  res.render('index', { title: 'Express Polls - Home', 
                        voteData: voteData, 
                        render: true
                      }
  );

};

