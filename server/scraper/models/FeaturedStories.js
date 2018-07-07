const GeneralContent = require('./GeneralContent');
const Article = require('./Article')

class FeaturedStories extends GeneralContent {
  constructor (html, wrapper) {
    super(html, wrapper);
    this.featuredGroup = this.setFeaturedGroup();
  }

  setFeaturedGroup () {
    let articles = [];
    this.$(this.wrapper).children('.featured-group').each( (i, ftrGrp) => {
      let featured = [];
      this.$(ftrGrp).children('article').each( (i, article) => {
        featured.push(new Article(article).data);
      });
      articles.push({featured});
    });
    return articles;
  }

}

module.exports = FeaturedStories