const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./modules/pool');
const cron = require('node-cron');
const app = express();
// Include NPR Scraper 
const nprScraper = require('./modules/npr-scraper');
const fileWriter = require('./modules/fileWriter');

const resultReducer = require('./modules/result-reducer');
const insertArticles = require('./modules/insert-results');
const practiceData = require('./modules/practiceJSON/7:30.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('server/public'))

// app.use('/insert', triggerInsertRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log('Server ready on port:', process.env.PORT || 5000);  
});

app.get('/insert', (req, res) => {
  let results = resultReducer(practiceData);
  // res.send(results)
  insertArticles(results);

})


app.get('/test/scraper', async (req, res) => {
  const results = await nprScraper();
  const reducedResults = resultReducer(results)
  fileWriter('ArticleBugFix620.json', reducedResults);
  // insertArticles(reducedResults);
  
  // res.send(reducedResults)
})