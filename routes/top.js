var pact = require('../pact.js')

exports.main = function(req, res){
  var polls = {};
  var list = [];
  pact.db.createReadStream({start: '!', 
                              end: '~'
                          })
    .on('data', function (data) {
      var keySplit = data.key.split('!');
      var type = keySplit[0];
      var id = keySplit[1];
      
      if (type === 'poll') {
        polls[id] = { question: JSON.parse(data.value).question,
                         count: 0
                        };
      } else if (type === 'vote') {
        polls[id].count = polls[id].count + 1;
      }
    })
    .on('end', function() {
      var i = 0;
      //for (var key in polls) {
      //  list.push({
        console.log(' ');
        console.log('polls');
        console.log(polls);
      res.render('top', { title: 'Top',
                          polls: polls,
                          render: false
                         }
      );
    })
};
