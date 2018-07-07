const router = require('express').Router();
const queries = require('../queries');
const messages = require('../modules/messages');
const JacobDate = require('../modules/JacobDate');

router.get('/list/search', async (req, res) => {
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

router.get('/article', async (req, res) => {
  const {id} = req.query;  
  try {
    const result = await queries.getArticleById(id);
    let response = result.distinctText[0] || result.allInstances[0] ? result : messages.notFound(date);
    res.send(response);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get('/list/:date', async (req, res) => {
  let startOfDay = JacobDate.startOfDay(req.params.date);
  let endOfDay = JacobDate.endOfDay(req.params.date);
  try {
    const result = await queries.getArticlesBySpecificDate(startOfDay, endOfDay);
    let response = result[0] ? result : messages.notFound(startOfDay, endOfDay);    
    res.send(response);
  } catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get('/list/range/:date1/:date2', async (req, res) => {
  const {offset} = req.query;
  let startOfStartDay = JacobDate.startOfDay(req.params.date1);
  let endOfEndDay = JacobDate.endOfDay(req.params.date2);
  try {
    const result = await queries.getArticlesByDateRange(startOfStartDay, endOfEndDay, offset);
    let response = result.results[0] ? result : messages.notFound(startOfStartDay, endOfEndDay, offset);
    res.send(response);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;