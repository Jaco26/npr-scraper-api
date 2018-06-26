const router = require('express').Router();
const queries = require('../modules/api-queries/keyword.search');

router.get('/search', async (req, res) => {
  let { phrase, teaser } = req.query;
  try {
    let includeTeaser = teaser == 'true' ? true: false;
    let result = await queries.searchText(phrase, includeTeaser);
    console.log(result);
    
    let response = result[0] ? result : `Sorry, but we found no matches for < ${phrase} >.`;
    res.send(response);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});


module.exports = router;