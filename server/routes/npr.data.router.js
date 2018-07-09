const router = require('express').Router();
const queries = require('../queries');
const messages = require('../modules/messages');
const { utcStartOfDay, utcEndOfDay } = require('../modules/DateTimeHelper');

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

router.get('/list', async (req, res) => {
  let { date } = req.query;
  let start = utcStartOfDay(date)
  let end = utcEndOfDay(date);
  try {
    const result = await queries.getArticlesBySpecificDate(start, end);
    let response = result[0] ? result : messages.notFound(start, end);   
    res.send(response);
  } catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// router.get('/list/range/:date1/:date2', async (req, res) => {
router.get('/list/range', async (req, res) => {
  let {start, end, offset} = req.query;
  start = utcStartOfDay(start);
  end = utcEndOfDay(end);
  try {
    const result = await queries.getArticlesByDateRange(start, end, offset);
    let response = result.results[0] ? result : messages.notFound(start, end, offset);
    res.send(response);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;