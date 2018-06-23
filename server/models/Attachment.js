const Scraper = require('./Scraper');

class Attachment extends Scraper {
  constructor (elem) {
    super(elem);
    this.elem = elem;
    this.data = {
      titleText: this.setTitleText(),
      titleUrl: this.setTitleUrl(),
      storyNumber: this.setStoryNumber(),
    }
  }
 
  setTitleText() {
    return this.$(this.elem).find('.title').text();
  }
  setTitleUrl() {
    return this.$(this.elem).find('a').first().attr('href');
  }
  setStoryNumber () {
    return this.$(this.elem).find('.story-wrap').attr('data-metrics').valueOf();
  }
}

module.exports = Attachment;