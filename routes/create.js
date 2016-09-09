const express = require('express');
const pact = require('../pact.js');
const router = express.Router();

router.post('/', (req, res, next) => {
  var uid = req.body.uid;
  var refill = {};
  refill.question = '';
  refill.option0 = '';
  refill.option1 = '';
  refill.option2 = '';
  refill.option3 = '';
  refill.option4 = '';
  refill.option5 = '';
  refill.option6 = '';

  if (req.body.pollQuestionSubmitted) {
    var optionLength = 0;
    var question = req.body.question;
    var option0 = req.body.option0;
    var option1 = req.body.option1;
    var option2 = req.body.option2;
    var option3 = req.body.option3;
    var option4 = req.body.option4;
    var option5 = req.body.option5;
    var option6 = req.body.option6;
    var options = [option0, option1, option2, option3, option4, option5, option6];
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
      pact.db.put('poll!'+key, JSON.stringify(value), () => {
        res.redirect('/poll/'+key);
                             
      });
    } else {
      refill.question = req.body.question;
      refill.option0 = req.body.option0;
      refill.option1 = req.body.option1;
      refill.option2 = req.body.option2;
      refill.option3 = req.body.option3;
      refill.option4 = req.body.option4;
      refill.option5 = req.body.option5;
      refill.option6 = req.body.option6;
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
});
router.get('/', (req, res, next) => {
    const refill = {};
    res.render('create', { title: 'Create', 
                           render: false, 
                           voteData: null, 
                           messages: req.flash('warn'),
                           refill: refill
                         }
    );

});

module.exports = router;
