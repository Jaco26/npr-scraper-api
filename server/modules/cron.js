const cron = require('node-cron');
const nprScraper = require('./npr-scraper');
const resultReducer = require('./result-reducer');
const insertArticles = require('./insert-results');

const makeItGo = async () => {
  const results = await nprScraper();
  const reducedResults = resultReducer(results);
  insertArticles(reducedResults);
}

// makeItGo() at 4am, 8am, 12pm, 4pm, and 8pm
cron.schedule('4,8,12,16,20 * * *', () => {
  makeItGo();
});
