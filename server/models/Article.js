const Scraper = require('./Scraper');

class Article extends Scraper {
  constructor (elem) {
    super(elem);
    this.elem = elem;
    this.slugText = this.setSlugText();
    this.slugUrl = this.setSlugUrl();
    this.titleText = this.setTitleText();
    this.titleUrl = this.setTitleUrl();
    this.teaserText = this.setTeaserText();
    this.volume = this.setVolume();
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
  setVolume () {
    return this.$(this.elem).attr('class')
  }

}


module.exports = Article