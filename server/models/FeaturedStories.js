const Scraper = require('./Scraper');
const Article = require('./Article')

class FeaturedStories extends Scraper {
  constructor (html) {
    super(html);
    this.wrapper = '.stories-wrap-featured'
    this.articles = this.setArticles();
    this.sections = this.setSections()
  }

  setArticles(){
    let articles = []
    this.$(this.wrapper).find('article').each( (i, elem) => {
      articles.push(new Article(elem))
    });
    return articles;
  }

  setSections () {
    let sections = [];
    this.$(this.wrapper).find('section').each( (i, section) => {
      let articles = [];
      this.$(section).find('article').each( (i, article) => {
        articles.push(new Article(article));
      });
      sections.push({articles: articles})
    });
    return sections;
  }

}

module.exports = FeaturedStories