var pact = require('../pact.js')

exports.main = function(req, res){
  var polls = new Array();
  var count = 0;
  pact.db.createReadStream({start: 'poll!', 
                              end: 'poll!~'
                          })
    .on('data', function (data) {
      var title = JSON.parse(data.value).question;
      var pollIdStr = data.key.split('!');
      var pollId = pollIdStr[1];
      pact.db.createReadStream({start: 'vote!'+pollId + '!',
                                  end: 'vote!'+pollId + '!~'
                              })
        .on('data', function (data) {
          count++;
        })
        .on('end', function () {
          polls.push({title: title, id: pollId, votes: count});
          console.log(' ');
          console.log('count: ');
          console.log(count);
          console.log(title);
          console.log(pollId);
          console.log(' ');
          count = 0;
        })
    })
    .on('end', function() {
      console.log(polls);
      res.render('top', { title: 'Top',
                          polls: polls,
                          render: false
                         }
      );
    })
};
