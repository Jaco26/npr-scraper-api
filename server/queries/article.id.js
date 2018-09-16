const pool = require('../modules/pool');

const getAllInstancesByArticleId = (articleId) => {
  const sqlText = `SELECT 
    date_trunc('minute', ts), 
    id AS instance_id, 
    article_id,
    element_type,
    section_type,
    story_number
  FROM article_instances 
  WHERE article_id = $1
  ORDER BY date_trunc DESC;`;
  return pool.query(sqlText, [articleId])
    .then(response => response.rows)
    .catch(err => {
      throw new Error(err)
    });
}

const getArticleById = (articleId) => {
  const sqlText = `SELECT
    teaser_text,
    title_text,
    slug_text,
    instance_id
  FROM article_view
  WHERE article_id = $1
  ORDER BY article_id DESC;`  
  return pool.query(sqlText, [articleId])
    .then( async response => {
      return {
        distinctText: response.rows,
        allInstances: await getAllInstancesByArticleId(articleId),
      }
    })
    .catch(err => {
      throw new Error(err)
    });
}


module.exports = getArticleById;