var pact = require('../pact.js');

exports.main = function(req, res){
  res.render('create', { title: 'Create', render: false, voteData: null});
};
