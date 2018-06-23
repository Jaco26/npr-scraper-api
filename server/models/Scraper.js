class Scraper {
  constructor (html, wrapper) {
    this.cheerio = require('cheerio');
    this.$ = this.cheerio.load(html);
    this.wrapper = wrapper;
  }
}

module.exports = Scraper;













