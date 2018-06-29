// require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('./modules/cron');



// Route includes
const nprDataRouter = require('./routes/npr.data.router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/** Routes */
app.use('/api', nprDataRouter);


app.listen(process.env.PORT || 5000, () => {
  console.log('Server ready on port:', process.env.PORT || 5000);  
});

