var pact = require('../pact.js')

exports.main = function(req, res){

  res.render('about', { title: 'About', 
                        render: true
                      }
  );

};
