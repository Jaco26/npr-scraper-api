const {CronJob} = require('cron');
const nprScraper = require('./npr-scraper');
const resultReducer = require('./result-reducer');
const insertArticles = require('./insert-results');

const makeItGo = async () => {
  const results = await nprScraper();
  const reducedResults = resultReducer(results);
  insertArticles(reducedResults);
}

new CronJob('00 4 * * *', makeItGo, null, true, 'America/Chicago'); 

new CronJob('00 6 * * *', makeItGo, null, true, 'America/Chicago'); 

new CronJob('00 8 * * *', makeItGo, null, true, 'America/Chicago'); 

new CronJob('00 10 * * *', makeItGo, null, true, 'America/Chicago'); 

new CronJob('00 12 * * *', makeItGo, null, true, 'America/Chicago'); 

new CronJob('00 14 * * *', makeItGo, null, true, 'America/Chicago'); 

new CronJob('00 16 * * *', makeItGo, null, true, 'America/Chicago'); 

new CronJob('00 18 * * *', makeItGo, null, true, 'America/Chicago'); 

new CronJob('00 20 * * *', makeItGo, null, true, 'America/Chicago'); 


module.exports = cron;