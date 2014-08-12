var pact = require('../pact.js')

exports.main = function(req, res){

  res.render('index', { title: 'Express Polls - Home', 
                        render: true
                      }
  );

};
