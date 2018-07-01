const pool = require('../pool');

const getArticleById = (articleId) => {
  const sqlText = `SELECT 
    date_trunc('minute', ai.ts), 
    ai.id as article_instance_id, 
    ai.article_id,
    ai.element_type,
    ai.section_type,
    ai.story_number,
    av.slug_text,
    av.title_text,
    av.teaser_text
  FROM article_instances AS ai 
	JOIN article_view AS av ON av.article_id = ai.article_id
  WHERE av.article_id = $1
  ORDER BY date_trunc DESC;`;  
  return pool.query(sqlText, [articleId])
    .then(response => response.rows)
    .catch(err => err);
}

module.exports = getArticleById;