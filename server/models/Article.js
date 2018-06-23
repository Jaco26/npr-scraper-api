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
    return this.$(this.elem).find('.slug').children('a').text();
  }
  setSlugUrl () {
    return this.$(this.elem).find('.slug').children('a').attr('href');
  }
  setTitleText () {
    return this.$(this.elem).find('.title').text();
  }
  setTitleUrl () {
    return this.$(this.elem).find('a').first().attr('href');
  }
  setTeaserText () {
    return this.$(this.elem).find('.teaser').text();
  }
  setStoryNumber () {
    return this.$(this.elem).find('.story-text').children('a').attr('data-metrics').valueOf();
  }
  setClasses () {
    return this.$(this.elem).attr('class');
  }

}


module.exports = Article