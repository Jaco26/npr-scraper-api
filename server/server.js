require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('./modules/scrape');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(process.env.PORT || 5000, () => {
  console.log('Server ready on port:', process.env.PORT || 5000);  
});

