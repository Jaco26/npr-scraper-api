const pool = require('./pool');

const insertBasic = (article) => {
  const { slugText, slugUrl, titleText, titleUrl, classes } = article;
  // Check for changes in title_text
  const sqlText1 = `SELECT * FROM basic WHERE title_text = $1;`;
  pool.query(sqlText1, [titleText])
    .then(result => {
      // If none, don't insert
      if (!result.rows[0]) {
        const sqlText2 = `INSERT INTO basic (
          slug_text, slug_url, title_text, title_url, classes, instance_id
        ) VALUES (
          $1, $2, $3, $4, $5,
          (SELECT MAX(ai.id) FROM article_instances AS ai JOIN article_urls AS au ON ai.article_id = au.id WHERE au.title_url = $6)
        );`;
        pool.query(sqlText2, [slugText, slugUrl, titleText, titleUrl, classes, titleUrl])
          .then(() => console.log('SUCCESS on insertBasic()'))
          .catch(err => console.log(err));
      }
    })
    .catch(err => {
      console.log('Error on check for basic', err);
    });
}

const insertAttachment = (article) => {
  const {titleText, titleUrl } = article;
  // Check for changes in title_text  
  const sqlText1 = `SELECT * FROM attachment WHERE title_text = $1;`;
  pool.query(sqlText1, [titleText])
    .then(result => {
      // If none, don't insert
      if (!result.rows[0]) {
        const sqlText2 = `INSERT INTO attachment (
          title_text, title_url, instance_id
        ) VALUES (
          $1, $2,
          (SELECT MAX(ai.id) FROM article_instances AS ai JOIN article_urls AS au ON ai.article_id = au.id WHERE au.title_url = $3)
        );`;
        pool.query(sqlText2, [titleText, titleUrl, titleUrl])
          .then(() => console.log('SUCCESS on insertAttachment()'))
          .catch(err => console.log(err));
      }
    })
    .catch(err => {
      console.log('Error on check for attachment', err);
    });
}

const insertStandard = (article) => {
  const {slugText, slugUrl, titleText, titleUrl, teaserText, classes} = article;
  // Check for changes in title_text
  const sqlText1 = `SELECT * FROM standard WHERE title_text = $1 AND teaser_text = $2;`;
  pool.query(sqlText1, [titleText, teaserText])
    .then(result => {
      // If none, don't insert
      if (!result.rows[0]) {
        const sqlText2 = `INSERT INTO standard (
          slug_text, slug_url, title_text, title_url, teaser_text, classes, instance_id
        ) VALUES (
            $1, $2, $3, $4, $5, $6, 
            (SELECT MAX(ai.id) FROM article_instances AS ai JOIN article_urls AS au ON ai.article_id = au.id WHERE au.title_url = $7)
          );`;
        pool.query(sqlText2, [slugText, slugUrl, titleText, titleUrl, teaserText, classes, titleUrl])
          .then(() => console.log('SUCCESS on insertStandard()'))
          .catch(err => console.log(err));
      }
    })
    .catch(err => {
      console.log('Error on check for standard', err);
    });
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

const insertInstances = (article) => {
  const { elementType, sectionType, titleUrl } = article;
  const storyNumber = article.storyNumber ? article.storyNumber : null;
  const sqlText = `INSERT INTO article_instances (element_type, section_type, story_number, article_id)
  VALUES($1, $2, $3, (SELECT id FROM article_urls WHERE title_url = $4));`;
  pool.query(sqlText, [elementType, sectionType, storyNumber, titleUrl])
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
    const sqlText1 = `SELECT id FROM article_urls WHERE title_url = $1;`;
    pool.query(sqlText1, [titleUrl])
      .then(result => {
        if(!result.rows[0]){
          const sqlText2 = `INSERT INTO article_urls (title_url)
            VALUES($1);`;
          pool.query(sqlText2, [titleUrl])
            .then(() => {
              insertInstances(article);
            })
            .catch(err => {
              console.log((err));
            });
        } else {
          console.log('Article already exists in database');
          insertInstances(article);
        }
      });
  });

}

module.exports = insertArticles;