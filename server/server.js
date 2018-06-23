const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./modules/pool');
const cron = require('node-cron');
const app = express();
// Include NPR Scraper 
const nprScraper = require('./modules/npr');
const fileWriter = require('./modules/fileWriter');

const triggerInsertRouter = require('./modules/sql/scraper.insert');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('server/public'))

app.use('/insert', triggerInsertRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log('Server ready on port:', process.env.PORT || 5000);  
});

app.get('/test/scraper', async (req, res) => {
  const results = await nprScraper();
  fileWriter('6:40.json', results);
  res.send(results)
})