const pact = require('../pact.js');

pact.db.createReadStream({start: 'poll!',
                            end: 'poll!~'
                        })
  .on('data', (data) => {
    const title = JSON.parse(data.value).question;
    if (title.match('href') || title.match('http')) {
      pact.db.del(data.key, (err) => {
        if (err) {
          console.log(err);
        }
      });
    } else {
      console.log(title);
    }
  })
  .on('end', () => {
    console.log('done');
  });

