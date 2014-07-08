var pact = require('../pact.js');

exports.main = function(req, res){
  var username;
  if (req.user) {
    username = req.user.username;
  } else {
    // create new user
  }


  var optionLength = 0;
  var question = req.param('question');
  var option0 = req.param('option0');
  var option1 = req.param('option1');
  var option2 = req.param('option2');
  var option3 = req.param('option3');
  var option4 = req.param('option4');
  var option5 = req.param('option5');
  var options = [option0, option1, option2, option3, option4, option5];
  var answers;
  var i;
  for (i = 0; i === options.length; i++) {
    if (options[i]) {
      answers[optionLength] = options[i];
      optionLength++;
    }
  }
  if (optionLength > 1) {

    var value = { "Question": question, "Answers": answers};
    var key = pact.getId();
    pact.db.put(key, value, function () {
      res.redirect('/poll/'+key);
                           
    });
  }


};
