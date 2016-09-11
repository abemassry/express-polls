const express = require('express');
const pact = require('../pact.js');
const router = express.Router();

router.post('/', (req, res, next) => {
  if (!req.body.hh) {
    const uid = req.body.uid;
    const refill = {};
    refill.question = '';
    refill.option0 = '';
    refill.option1 = '';
    refill.option2 = '';
    refill.option3 = '';
    refill.option4 = '';
    refill.option5 = '';
    refill.option6 = '';

    if (req.body.pollQuestionSubmitted) {
      let optionLength = 0;
      const question = req.body.question;
      const option0 = req.body.option0;
      const option1 = req.body.option1;
      const option2 = req.body.option2;
      const option3 = req.body.option3;
      const option4 = req.body.option4;
      const option5 = req.body.option5;
      const option6 = req.body.option6;
      const options = [option0, option1, option2, option3, option4, option5, option6];
      const answers = [];
      for (let i = 0; i <= options.length; i++) {
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

        const value = { question, answers, user: uid};
        const key = pact.getId();
        pact.db.put(`poll!${key}`, JSON.stringify(value), () => {
          res.redirect(`/poll/${key}`);

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
                               refill
                             }
        );
      }

    } else {

      res.render('create', { title: 'Create',
                             render: false,
                             voteData: null,
                             messages: req.flash('warn'),
                             refill
                           }
      );
    }
  } else {
    console.log("it's a bot");
  }
});

router.get('/', (req, res, next) => {
    const refill = {};
    res.render('create', { title: 'Create',
                           render: false,
                           voteData: null,
                           messages: req.flash('warn'),
                           refill
                         }
    );

});

module.exports = router;
