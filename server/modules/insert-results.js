const pool = require('./pool');

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

const insertToArticleInstances = (article) => {
  const { elementType, sectionType, titleUrl } = article;
  const sqlText = `INSERT INTO article_instances (element_type, section_type, article_id)
  VALUES($1, $2, (SELECT id FROM articles WHERE title_url = $3));`;
  pool.query(sqlText, [elementType, sectionType, titleUrl])
    .then( () => {
      try {
        handleOtherInserts(article);
      } catch (err) {
        console.log(err);
      }
    });
} 

const insertArticles = (resultList) => {  
  resultList.forEach(article => {
    const { titleUrl } = article;
    const sqlText1 = `SELECT id FROM articles WHERE title_url = $1;`;
    pool.query(sqlText1, [titleUrl])
      .then(result => {
        if(!result.rows[0]){
          const sqlText2 = `INSERT INTO articles (title_url)
            VALUES($1);`;
          pool.query(sqlText2, [titleUrl])
            .then(() => {
              insertToArticleInstances(article);
            })
            .catch(err => {
              console.log((err));
            });
        } else {
          console.log('Article already exists in database');
          insertToArticleInstances(article);
        }
      });
  });

}

module.exports = insertArticles;