const router = require('express').Router();
const queries = require('../modules/api-queries');
const messages = require('../modules/messages');

router.get('/search', async (req, res) => {
  let { phrase, teaser } = req.query;
  try {
    let includeTeaser = teaser == 'true' ? true: false;
    let result = await queries.keywordSearch(phrase, includeTeaser);
    let response = result[0] ? result : messages.notFound(phrase);
    res.send(response);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get('/article/:articleId', async (req, res) => {
  const {articleId} = req.params;  
  try {
    const result = await queries.getArticleById(articleId);
    let response = result[0] ? result : messages.notFound(articleId);
    res.send(response);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});


module.exports = router;