const cron = require('node-cron');
const nprScraper = require('./npr-scraper');
const resultReducer = require('./result-reducer');
const insertArticles = require('./insert-results');

const makeItGo = async () => {
  const results = await nprScraper();
  const reducedResults = resultReducer(results);
  insertArticles(reducedResults);
}

// cron.schedule('50 5 18 * * *', () => {
//   console.log('The cron is working');
//   makeItGo();
// });

// makeItGo at 6:30
cron.schedule('30 18 * * *', () => {
  makeItGo();
});

// makeItGo at 7:00
cron.schedule('00 19 * * *', () => {
  makeItGo();
});

// makeItGo at 7:30
cron.schedule('30 19 * * *', () => {
  makeItGo();
});

cron.schedule('21 20 * * *', () => {
  makeItGo();
});

module.exports = cron;