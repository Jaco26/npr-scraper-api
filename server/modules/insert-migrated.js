const newPool = require('./new-db-pool');

function insertInstance(article) {
  const { title_url, element_type, section_type, story_number, slug_text, slug_url, title_text, teaser_text, classes, ts, article_id } = article;
  const sqlText = `INSERT INTO instances 
    (title_url, slug_text, slug_url, title_text, teaser_text, classes, article_id, element_type, section_type, story_number, ts)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`;
    newPool.query(sqlText, [title_url, slug_text, slug_url, title_text, teaser_text, classes, article_id, element_type, section_type, story_number, ts])
    .then(() => {
      console.log('SUCCESS ON INSERT INTO instances:', title_url);
    })
    .catch(err => {
      console.log('LINE 13', err);
    });
}

function insertArticles(articles) {
  articles.forEach(article => {
    insertInstance(article);
  });
}

module.exports = { insertArticles };
