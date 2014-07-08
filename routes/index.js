var pact = require('../pact.js');

exports.main = function(req, res){
  //res.render('index', { title: 'Express' });
  pact.db.put('name', 'LevelUp', function(err) {
    if (err) return console.log('Oops!', err);
    
    pact.db.get('name', function(err, value) {
      if (err) return console.log('Oops!', err);
      console.log('name=' + value);

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

    });
  });
};

