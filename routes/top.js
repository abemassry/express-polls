var pact = require('../pact.js')

exports.main = function(req, res){
  var polls = new Array();
  pact.db.createReadStream({start: 'poll!', 
                              end: 'poll!~'
                          })
    .on('data', function (data) {
      var title = JSON.parse(data.value).question;
      var pollId = data.key.split('!');
      pact.db.createReadStream({start: 'vote!'+pollId + '!',
                                  end: 'vote!'+pollId + '!~'
                              })
        .on('data', function (data) {
          var count;
          for (var i = 0; i<data.value; i++) {
            polls.push({id: id[1], title: title});
          }


      })
    })
    .on('end', function() {
      res.render('top', { title: 'Top',
                          polls: polls,
                          render: false
                         }
      );
    })
};
