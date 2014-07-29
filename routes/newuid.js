var pact = require('../pact.js')

exports.main = function(req, res){
  if(req.param('getUid')) {
    var uid = pact.getId();
    res.end(uid);
  }
};
