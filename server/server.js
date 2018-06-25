const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// Include NPR Scraper 
const nprScraper = require('./modules/npr-scraper');
const fileWriter = require('./modules/fileWriter');
const resultReducer = require('./modules/result-reducer');
const insertArticles = require('./modules/insert-results');
require('./modules/cron');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('server/public'))

app.listen(process.env.PORT || 5000, () => {
  console.log('Server ready on port:', process.env.PORT || 5000);  
});


app.get('/test/scraper', async (req, res) => {
  // const results = await nprScraper();
  // const reducedResults = resultReducer(results)
  // fileWriter('ArticleBugFix630confirm.json', reducedResults);
  // insertArticles(reducedResults);
  // res.send(reducedResults);
})