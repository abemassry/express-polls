var pact = require('../pact.js')

exports.main = function(req, res){
  if (req.param('poll')) {
    var pollId = req.param('poll');
    var uid = req.param('uid');
    
    pact.db.get('poll!'+ pollId, function (err, value) {
      if (err) return console.log(pollId+' does not exist in checksubmitted.js');
      var user = JSON.parse(value).user;
      if (user === uid) {
        res.end('true');
      } else {
        res.end('false');
      }
    });

  }
};
