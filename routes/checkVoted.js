var pact = require('../pact.js')

exports.main = function(req, res){
  if (req.param('poll')) {
    var pollId = req.param('poll');
    var uid = req.param('uid');
    
    pact.db.get('poll!'+pollId, function (err, value) {
      if (err) return console.log(pollId+' does not exist in checkvoted.js');
      
      pact.db.createReadStream({start: 'poll!'+ pollId + '!~', end: 'poll!'+ pollId + '!'})
        .on('data', function(data) {
          var user = JSON.parse(data).user;
          if (user === uid) {
            res.end('true');
          }
        })
        .on('end', function() {
          res.end('false');
        })

    });

  }
};
