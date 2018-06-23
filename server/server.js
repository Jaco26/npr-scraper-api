const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./modules/pool');
const cron = require('node-cron');
const app = express();
// Include NPR Scraper 
const nprScraper = require('./modules/npr');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('server/public'))

app.listen(process.env.PORT || 5000, () => {
  console.log('Server ready on port:', process.env.PORT || 5000);  
});

const fs = require('fs');

app.get('/get-npr', async (req, res) => {
  const results = await nprScraper();  
  fs.writeFile('dataToClean.json', JSON.stringify(results, null, 4), (err) => {
    if (err) throw err;
    console.log('Check the roooooot');
    
  });
  // res.send(results);
})



