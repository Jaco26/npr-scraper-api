const Scraper = require('./Scraper');

class Attachment extends Scraper {
  constructor(html) {
    super(html);
    this.elem = html;
    this.data = {
      titleText: this.setTitleText(),
      titleUrl: this.setTitleUrl(),
      storyNumber: this.setStoryNumber(),
    }
  }
 
  setTitleText() {
    let text = this.$(this.elem).find('.title').text();
    return text.replace(/\\/g, '');
  }
  setTitleUrl() {
    return this.$(this.elem).find('a').first().attr('href');
  }
  setStoryNumber () {
    let metricsObject = this.$(this.elem).find('.story-wrap').attr('data-metrics').valueOf();
    return Number(metricsObject.match(/\d/g).join());
  }
}

module.exports = Attachment;