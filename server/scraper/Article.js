const Scraper = require('./Scraper');

class Article extends Scraper {
  constructor (html) {
    super(html);
    this.elem = html;
    this.data = {
      slugText: this.setSlugText(),
      slugUrl: this.setSlugUrl(),
      titleText: this.setTitleText(),
      titleUrl: this.setTitleUrl(),
      teaserText: this.setTeaserText(),
      storyNumber: this.setStoryNumber(),
      classes: this.setClasses(),
    }
  }

  setSlugText () {
    let text = this.$(this.elem).find('.slug').children('a').text();
    return text.replace(/\\n/g, '').trim();
  }
  setSlugUrl () {
    return this.$(this.elem).find('.slug').children('a').attr('href');
  }
  setTitleText () {
    let text = this.$(this.elem).find('.title').text();
    return text.replace(/\\/g, '');
  }
  setTitleUrl () {
    return this.$(this.elem).find('a').first().attr('href');
  }
  setTeaserText () {
    let text = this.$(this.elem).find('.teaser').text();
    return text.replace(/\\/g, '');
  }
  setStoryNumber () {
    let metricsObject = this.$(this.elem).find('.story-text').children('a').attr('data-metrics').valueOf();
    return Number(metricsObject.match(/\d/g).join(''));
  }
  setClasses () {
    return this.$(this.elem).attr('class');
  }

}


module.exports = Article