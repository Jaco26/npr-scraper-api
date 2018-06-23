class Scraper {
  constructor (html) {
    this.cheerio = require('cheerio');
    this.$ = this.cheerio.load(html);
  }
}

module.exports = Scraper;













