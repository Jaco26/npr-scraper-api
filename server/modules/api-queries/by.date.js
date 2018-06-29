const pool = require('../pool');

const getArticlesByDate = (date) => {
  const sqlText = `SELECT DISTINCT
  date_trunc('minute', ai.ts),
    ai.id as article_instance_id,
    ai.article_id,
    ai.element_type,
    ai.section_type,
    ai.story_number,
    av.slug_text
  FROM article_instances AS ai
	JOIN article_view AS av ON av.article_id = ai.article_id
  WHERE date_trunc('day', ai.ts) = $1
  ORDER BY date_trunc ASC;`;
  return pool.query(sqlText, [date])
    .then(response => response.rows)
    .catch(err => err);
}

module.exports = getArticlesByDate;

