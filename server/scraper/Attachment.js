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
    let re = /(click\s?attached\s?story\s?\d)/i;
    return this.$('.story-wrap').attr('href');
  }
  setStoryNumber() {
    if (this.$(this.elem).find('.story-wrap').data('metrics')) {
      let metricsObject = this.$(this.elem).find('.story-wrap').data('metrics');
      return Number(metricsObject.action.match(/\d/g).join());
    } else {
      return 'no data metrics'
    }
 
  }

}

module.exports = Attachment;