const levelup = require('level');
const db = levelup('../db');

db.createReadStream({start: '',
                       end: '~'
                   })
    .on('data', (data) => {
    console.log(data.key);
    console.log(data.value);
    const title = JSON.parse(data.value).question;
    console.log(title);
    if (title.match('href') || title.match('http')) {
      db.del(data.key, (err) => {
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

