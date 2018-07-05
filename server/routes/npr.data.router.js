const router = require('express').Router();
const queries = require('../modules/api-queries');
const messages = require('../modules/messages');

function timezoneOffsetHepler(dateStr) {
  let d = new Date(dateStr);
  let timezoneOffsetMilli = (d.getTimezoneOffset() * 60000) * 2;
  let year = d.getFullYear(),
    month = d.getMonth(),
    day = d.getDate(),
    hour = d.getHours(),
    minute = d.getMinutes();
  let utcDate = Date.UTC(year, month, day, hour, minute);
  return new Date(utcDate + timezoneOffsetMilli).toISOString().slice(0, 19);
}

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
  let adjustedDate = timezoneOffsetHepler(req.params.date)
  try {
    const result = await queries.getArticlesBySpecificDate(adjustedDate);
    let response = result[0] ? result : messages.notFound(adjustedDate);    
    res.send(response);
  } catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get('/list/range/:date1/:date2', async (req, res) => {
  const {offset} = req.query;
  let date1 = timezoneOffsetHepler(req.params.date1);
  let date2 = timezoneOffsetHepler(req.params.date2);
  try {
    const result = await queries.getArticlesByDateRange(date1, date2, offset);
    let response = result.results[0] ? result : messages.notFound(date1, date2, offset);
    res.send(response);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;