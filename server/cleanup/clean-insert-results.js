const pool = require('../modules/pool');

function insertInstances(article) {
  
}

function insertArticles(resultList) {
  resultList.forEach(article => {
    const sqlText1 = `SELECT id FROM article_urls WHERE title_url = $1;`;
    pool.query(sqlText1, [article.titleUrl])
      .then(result => {
        if (!result.rows[0]) {
          const sqlText2 = `INSERT INTO article_urls (title_url) VALUES($1);`;
          pool.query(sqlText2, [article.titleUrl])
            .then(() => {
              insertInstances(article);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          insertInstances(article);
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
}

module.exports = insertArticles;