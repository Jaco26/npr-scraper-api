const Scraper = require('./Scraper');
const Article = require('./Article');
const Attachment = require('./Attachment');

class GeneralContent extends Scraper {
  constructor (html, wrapper) {
    super(html, wrapper);
    this.articles = this.setArticles();
    this.attachmentGroups = this.setAttachmentGroups();
  }

  setArticles() {
    let articles = [];
    this.$(this.wrapper).children('article').each((i, article) => {
      articles.push(new Article(article).data)
    });
    return articles;
  }
  setAttachmentGroups() {
    let attachmentGroups = [];
    this.$(this.wrapper).children('.attachment-group').each((i, atchGrp) => {
      let article = {};
      let attachments = [];
      // let mainArticle = this.$(atchGrp).find('.variant-group').children('article').first()
      //   ? this.$(atchGrp).find('.variant-group').children('article').first()
      //   : this.$(atchGrp).children('article').first();
      let mainArticle = this.$(atchGrp).find('article').first();
      article = new Article(mainArticle).data;
      this.$(atchGrp).children('.attachment').each((i, atchmnt) => {
        attachments.push(new Attachment(atchmnt).data);
      });
      attachmentGroups.push({ article, attachments });
    });
    return attachmentGroups;
  }

}

module.exports = GeneralContent;