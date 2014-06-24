var pact = require('../pact.js');
/*
 * GET home page.
 */

exports.index = function(req, res){
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
      var voteData2 = [
        { label: "Polls",  data: 22},
        { label: "Learning",  data: 45},
        { label: "Fun",  data: 33}
      ];

      res.render('index', { title: 'Home', 
                            voteData: voteData, 
                            voteData2: voteData2
                          }
      );

    });
  });
};

