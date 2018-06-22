const Scraper = require('./Scraper');
const {Article, Attachment, Basic} = require('./Article')

class FeaturedStories extends Scraper {
  constructor (html) {
    super(html);
    this.articles = [];
    this.attachmentGroups = []

    this.featuredGroup = {
      articles: [],
    };
  }

  getArticles(){
    return 
  }

}

module.exports = FeaturedStories