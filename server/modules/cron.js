const cron = require('node-cron');
const nprScraper = require('./npr-scraper');
const resultReducer = require('./result-reducer');
const insertArticles = require('./insert-results');

const makeItGo = async () => {
  const results = await nprScraper();
  const reducedResults = resultReducer(results);
  insertArticles(reducedResults);
}

// makeItGo at 4:00 AM
cron.schedule('00 4 * * *', () => {
  makeItGo();
});

// makeItGo at 6:00 AM
cron.schedule('00 6 * * *', () => {
  makeItGo();
});

// makeItGo at 8:00 AM
cron.schedule('00 8 * * *', () => {
  makeItGo();
});

// makeItGo at 10:00 AM
cron.schedule('00 10 * * *', () => {
  makeItGo();
});

// makeItGo at 12:00 PM
cron.schedule('00 12 * * *', () => {
  makeItGo();
});

// makeItGo at 2:00 PM
cron.schedule('00 14 * * *', () => {
  makeItGo();
});

// makeItGo at 4:00 PM
cron.schedule('00 16 * * *', () => {
  makeItGo();
});

// makeItGo at 6:00 PM
cron.schedule('00 18 * * *', () => {
  makeItGo();
});

// makeItGo at 8:00 PM
cron.schedule('00 20 * * *', () => {
  makeItGo();
});

// makeItGo at 10:00 PM
cron.schedule('00 22 * * *', () => {
  makeItGo();
});


module.exports = cron;