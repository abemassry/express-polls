var pact = require('../pact.js')

exports.main = function(req, res){
  var polls = new Array();
  pact.db.createReadStream({start: 'poll!', 
                              end: 'poll!~'
                          })
    .on('data', function (data) {
      var title = JSON.parse(data.value).question;
      var id = data.key.split('!');
      polls.push({id: id[1], title: title});
    })
    .on('end', function() {
      res.render('all', { title: 'All',
                          polls: polls,
                          render: false
                         }
      );
    })
};
