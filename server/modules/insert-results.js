const pool = require('./pool');

/**
 * I need a different way of selecting id from articles for the insance id.
 * 'SELECT DISTINCT' won't work because there are more than one instance ids 
 * for any given title_url. I need a different database design...
 * 
*/

const insertBasic = (article) => {
  const { slugText, slugUrl, titleText, titleUrl, classes, storyNumber} = article;
  const sqlText = `INSERT INTO basic_article_data 
  (slug_text, slug_url, title_text, title_url, classes, story_number, instance_id)
  VALUES($1, $2, $3, $4, $5, $6, (SELECT id FROM articles WHERE title_url = $7));`;
  pool.query(sqlText, [slugText, slugUrl, titleText, titleUrl, classes, storyNumber, titleUrl])
    .then( () => console.log('SUCCESS on insertBasic()'))
    .catch(err => console.log(err));
}

const insertAttachment = (article) => {
  const {titleText, titleUrl, storyNumber} = article;
  const sqlText = `INSERT INTO attachment_data 
  (title_text, title_url, story_number, instance_id)
  VALUES($1, $2, $3, (SELECT  id FROM articles WHERE title_url = $4));`;
  pool.query(sqlText, [titleText, titleUrl, storyNumber, titleUrl])
    .then(() => console.log('SUCCESS on insertAttachment()'))
    .catch(err => console.log(err));
}

const insertStandard = (article) => {
  const {slugText, slugUrl, titleText, titleUrl, teaserText, classes, storyNumber} = article;
  const sqlText = `INSERT INTO standard_article_data
  (slug_text, slug_url, title_text, title_url, teaser_text, classes, story_number, instance_id)
  VALUES($1, $2, $3, $4, $5, $6, $7, (SELECT id FROM articles WHERE title_url = $8));`;
  pool.query(sqlText, [slugText, slugUrl, titleText, titleUrl, teaserText, classes, storyNumber, titleUrl])
    .then(() => console.log('SUCCESS on insertStandard()'))
    .catch(err => console.log(err));
}

const handleOtherInserts = (article) => {
  switch (article.elementType) {
    case 1:
      insertBasic(article);
      break;
    case 2:
      insertAttachment(article);
      break;
    case 3:
      insertStandard(article);
      break;
    default:
      throw 'No elementType id presenet on item';
  }
}

const insertResults = (resultList) => {  
  resultList.forEach(article => {
    const { titleUrl, elementType, sectionType } = article;
    const sqlText = `INSERT INTO articles (title_url, element_type, section_type)
    VALUES($1, $2, $3);`;
    pool.query(sqlText, [titleUrl, elementType, sectionType])
      .then(() => {
        try {
          handleOtherInserts(article);
        } catch (err) {
          console.log(err);
        }
      })
      .catch(err => {
        console.log((err));        
      });
  });

}

module.exports = insertResults;