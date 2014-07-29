var pact = require('../pact.js');

exports.main = function(req, res){
  var uid = req.param('uid');
  var refill = {};
  refill.question = '';
  refill.option0 = '';
  refill.option1 = '';
  refill.option2 = '';
  refill.option3 = '';
  refill.option4 = '';
  refill.option5 = '';

  if (req.param('poll-question-submitted')) {
    var optionLength = 0;
    var question = req.param('question');
    var option0 = req.param('option0');
    var option1 = req.param('option1');
    var option2 = req.param('option2');
    var option3 = req.param('option3');
    var option4 = req.param('option4');
    var option5 = req.param('option5');
    var options = [option0, option1, option2, option3, option4, option5];
    var answers = [];
    var i;
    for (i = 0; i <= options.length; i++) {
      if (options[i] != '' && typeof options[i] !== "undefined") {
        answers[optionLength] = options[i];
        optionLength++;
      }
    }
    console.log('optionLength');
    console.log(optionLength);
    console.log('answers');
    console.log(answers);

    if (optionLength > 1) {

      var value = { question: question, answers: answers, user: uid};
      var key = pact.getId();
      pact.db.put('poll!'+key, JSON.stringify(value), function() {
        res.redirect('/poll/'+key);
                             
      });
    } else {
      refill.question = req.param('question');
      refill.option0 = req.param('option0');
      refill.option1 = req.param('option1');
      refill.option2 = req.param('option2');
      refill.option3 = req.param('option3');
      refill.option4 = req.param('option4');
      refill.option5 = req.param('option5');
      req.flash('warn', 'Need more than one option for a poll');
      res.render('create', { title: 'Create', 
                             render: false, 
                             voteData: null, 
                             messages: req.flash('warn'),
                             refill: refill
                           }
      );
    }

  } else {

    res.render('create', { title: 'Create', 
                           render: false, 
                           voteData: null, 
                           messages: req.flash('warn'),
                           refill: refill
                         }
    );
  }
};
