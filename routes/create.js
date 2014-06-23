var pact = require('../pact.js');
/*
 * GET home page.
 */

exports.create = function(req, res){
  res.render('create', { title: 'Create' });
};
