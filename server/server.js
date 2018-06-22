const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./modules/pool');
const cron = require('node-cron');
const app = express();
// Include NPR Scraper 
const nprHeadlines = require('./modules/nprArticles');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('server/public'))

app.listen(process.env.PORT || 5000, () => {
  console.log('Server ready on port:', process.env.PORT || 5000);  
});

cron.schedule('11 10 * * *', async () => {
  const headlines = await nprHeadlines();  
  headlines.forEach(headline => {
    const {title, teaser, url} = headline;
    const sqlText = `INSERT INTO article_info (title, teaser, url, article_date)
    VALUES ($1, $2, $3, $4);`;
    pool.query(sqlText, [title, teaser, url, new Date()])
      .then(response => {
      })
      .catch(err => {
        console.log(err);
      });
  });
});

app.get('/headline/list', (req, res) => {
  console.log('HIIIII');
  
  const sqlText = `SELECT * FROM article_info ORDER BY id;`;
  pool.query(sqlText, [])
    .then(response => {
      res.send(response.rows);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});