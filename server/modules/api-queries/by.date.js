const pool = require('../pool');

const getArticlesBySpecificDate = (date) => {
  const sqlText = `SELECT
    date_trunc('minute', ai.ts),
    ai.id AS article_instance_id,
    ai.article_id,
    ai.element_type,
    ai.section_type,
    ai.story_number,
    av.slug_text,
    av.title_text,
    av.teaser_text
  FROM article_instances AS ai
	JOIN article_view AS av ON av.instance_id = ai.id
  WHERE date_trunc('day', ai.ts) = $1
  ORDER BY date_trunc DESC;`;
  return pool.query(sqlText, [date])
    .then(response => response.rows)
    .catch(err => err);
}

const countResults = (date1, date2) => {
  // Count instances of article_ids within the given date range
  const sqlText = `SELECT COUNT(av.article_id) 
    FROM article_view AS av 
    JOIN article_instances AS ai ON ai.id = av.instance_id
    WHERE ai.ts BETWEEN $1 AND $2;`;
  return pool.query(sqlText, [date1, date2])
    .then(response => response.rows[0].count)
    .catch(err => err);
}

const getInstancesOfChange = (date1, date2, offset = 0) => {
  // Select the instances of title_text, slug_text, or teaser_text 
  // change for all articles that appeared within the given date range  
  const sqlText = `SELECT
    date_trunc('minute', ai.ts),
    ai.id AS article_instance_id,
    ai.article_id,
    ai.element_type,
    ai.section_type,
    ai.story_number,
    av.slug_text,
    av.title_text,
    av.teaser_text
  FROM article_instances AS ai
  JOIN article_view AS av ON av.instance_id = ai.id
  WHERE ai.ts BETWEEN $1 AND $2 LIMIT 40 OFFSET $3;`;
  return pool.query(sqlText, [date1, date2, offset])
    .then(response => response.rows)
    .catch(err => err);
}

const getArticlesByDateRange = async (date1, date2, offset = 0) => {
  const count = await countResults(date1, date2);
  return {
    count,
    nextUrl: count - Number(offset) >= 40 ? `/api/list/range/${date1}/${date2}?offset=${Number(offset) + 40}` : '',
    results: await getInstancesOfChange(date1, date2, offset),
  }
}

module.exports = {
  getArticlesBySpecificDate,
  getArticlesByDateRange,
};

