const newPool = require('./new-db-pool');

function insertInstances(article) {
  const { elementType, sectionType, storyNumber, slugText, slugUrl, titleText, titleUrl, teaserText, classes } = article;
  const sqlText = `INSERT INTO instances 
    (slug_text, slug_url, title_url, title_text, teaser_text, classes, article_id, element_type, section_type, story_number)
    VALUES ($1, $2, $3, $4, $5, $6, (SELECT id FROM article_urls WHERE title_url = $7), $8, $9, $10);`;
    newPool.query(sqlText, [slugText, slugUrl, titleUrl, titleText, teaserText, classes, titleUrl, elementType, sectionType, storyNumber])
    .then(() => {
      console.log('SUCCESS ON INSERT INTO instances:', titleUrl);
    })
    .catch(err => {
      console.log(err);
    });
}

function insertArticles(resultList) {
  resultList.forEach(article => {
    const sqlText1 = `SELECT id FROM article_urls WHERE title_url = $1;`;
    newPool.query(sqlText1, [article.titleUrl])
      .then(result => {
        if (!result.rows[0]) {
          const sqlText2 = `INSERT INTO article_urls (title_url) VALUES($1);`;
          newPool.query(sqlText2, [article.titleUrl])
            .then(() => {
              insertInstances(article);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log('ARTICLE ALREADY EXISTS', article.titleUrl);
          insertInstances(article);
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
}

module.exports = insertArticles;