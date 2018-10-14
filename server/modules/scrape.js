const { CronJob } = require('cron');
const nprScraper = require('../scraper/npr-scraper');
const resultReducer = require('./result-reducer');
const cleanInsert = require('./insert-scraped-results');

const cleanMakeItGo = async () => {
  const results = await nprScraper();
  const reducedResults = resultReducer(results);
  cleanInsert(reducedResults);
}

new CronJob('00 4 * * *', cleanMakeItGo, null, true, 'America/Chicago');

new CronJob('00 6 * * *', cleanMakeItGo, null, true, 'America/Chicago');

new CronJob('00 8 * * *', cleanMakeItGo, null, true, 'America/Chicago');

new CronJob('00 10 * * *', cleanMakeItGo, null, true, 'America/Chicago');

new CronJob('00 12 * * *', cleanMakeItGo, null, true, 'America/Chicago');

new CronJob('00 14 * * *', cleanMakeItGo, null, true, 'America/Chicago');

new CronJob('00 16 * * *', cleanMakeItGo, null, true, 'America/Chicago');

new CronJob('00 18 * * *', cleanMakeItGo, null, true, 'America/Chicago');

new CronJob('00 20 * * *', cleanMakeItGo, null, true, 'America/Chicago');

module.exports = { cleanMakeItGo };
