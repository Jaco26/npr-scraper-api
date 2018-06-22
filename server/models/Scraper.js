class Scraper {
  constructor (html) {
    this.cheerio = require('cheerio');
    this.$ = this.cheerio.load(html);
  }
}

// class Test extends Scraper {
//   constructor(html){
//     super(html);
//     this.text = this.getText()
//   }

//   getText(){
//     return this.$('.div-1').text();
//   }

// }

// let html = `<div class="div-1">Hello</div>`

// let test = new Test(html);

// console.log('******************* TEST,',test.text);


module.exports = Scraper;













