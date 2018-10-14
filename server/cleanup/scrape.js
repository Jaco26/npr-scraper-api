const { CronJob } = require('cron');
const nprScraper = require('../scraper/npr-scraper');
const resultReducer = require('../modules/result-reducer');
const cleanInsert = require('./clean-insert-results');

const cleanMakeItGo = async () => {
  const results = await nprScraper();
  const reducedResults = resultReducer(results);
  cleanInsert(reducedResults);
}

module.exports = { cleanMakeItGo };