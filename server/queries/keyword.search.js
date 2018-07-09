const pool = require('../modules/pool');

const generateSinglePhraseQuery = (searchPhrase, includeTeaserText, start, end) => {
  let phrase = searchPhrase.replace(/[""]/g, '');
  let sqlText = `SELECT 
      ai.id AS instance_id,
      ai.article_id, 
      ai.element_type, 
      ai.section_type, 
      ai.story_number, 
      av.title_text, 
      av.title_url,
      av.slug_text, 
      av.teaser_text
    FROM article_instances as ai 
    JOIN article_view as av ON ai.id = av.instance_id
    WHERE ai.article_id = ANY (
      SELECT article_id FROM article_view WHERE title_text ILIKE $1 
      ${includeTeaserText 
        ? ` OR teaser_text ILIKE $2) AND ai.ts BETWEEN $3 AND $4` 
        : ') AND ai.ts BETWEEN $2 AND $3'};`;
  let values = includeTeaserText 
    ? [`%${phrase}%`, `%${phrase}%`, start, end] 
    : [`%${phrase}%`, start, end];  
  return {
    sqlText,
    values,
  }
}

const generateMultiPhraseQuery = (searchPhrase, includeTeaserText, start, end) => {
  let searchPhraseLength = searchPhrase.split(' ').length;
  let ILIKE = searchPhrase.split(' ').reduce((accumulator, currentVal, index) => {
    index == 0
      ? accumulator = `ILIKE $${index + 1}`
      : accumulator += ` OR title_text ILIKE $${index + 1}`;
    return accumulator;
  }, '');
  let OR_ILIKE = includeTeaserText 
    ? searchPhrase.split(' ').reduce( (accumulator, currentVal, index) => {
      accumulator += ` OR teaser_text ILIKE $${searchPhraseLength + index + 1}`; 
        return accumulator;
      }, '')
    : '';
  let sqlText = `SELECT 
      ai.id AS instance_id,
      ai.ts,
      ai.article_id, 
      ai.element_type, 
      ai.section_type, 
      ai.story_number, 
      av.title_text, 
      av.title_url,
      av.slug_text, 
      av.teaser_text
    FROM article_instances as ai 
    JOIN article_view as av ON ai.id = av.instance_id
    WHERE ai.article_id = ANY (
      SELECT article_id FROM article_view WHERE title_text ${ILIKE}
      ${includeTeaserText ? OR_ILIKE : ``}
    ) AND ai.ts BETWEEN ${includeTeaserText
      ? `$${searchPhraseLength * 2 + 1} AND $${searchPhraseLength * 2 + 2}`
      : `$${searchPhraseLength + 1} AND $${searchPhraseLength + 2}`};`;
  let values = [...searchPhrase.split(' ').map(word => '%' + word + '%'), start, end];  
  return { sqlText, values };
}

const searchText = (searchString, includeTeaserText, start, end) => {
  if (searchString.split(' ').length > 1 && !searchString.startsWith('"')) {
    let { sqlText, values } = generateMultiPhraseQuery(searchString, includeTeaserText, start, end);
    return pool.query(sqlText, [...values])
      .then(response => response.rows)
      .catch(err => err);
  } else {
    let { sqlText, values } = generateSinglePhraseQuery(searchString, includeTeaserText, start, end);
    return pool.query(sqlText, [...values])
      .then(response => response.rows)
      .catch(err => err);
  }
}

module.exports = searchText;
