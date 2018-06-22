class Article {
  constructor (slugText, slugUrl, titleText, titleUrl, teaserText, teaserUrl, volume) {
    this.slugText = slugText;
    this.slugUrl = slugUrl;
    this.titleText = titleText;
    this.titleUrl = titleUrl;
    this.teaserText = teaserText;
    this.teaserUrl = teaserUrl;
    this.volume = volume;
  }
}

class Basic extends Article {
  constructor (slugText, slugUrl, titleText, titleUrl, volume) {
    super (slugText, slugUrl, titleText, titleUrl);
  }
}

class Attachment extends Article {
  constructor (titleText, titleUrl) {
    super (titleText, titleUrl)
  }
}

module.exports = {
  Article,
  Basic,
  Attachment,
}