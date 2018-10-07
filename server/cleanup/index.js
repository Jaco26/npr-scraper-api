/*
  As designed, the database I created to hold scraped headline data is cumbersome, 
  complex, barely useful, and dumb. This module aims to provide functionality to assemble 
  all article data into a cohesive, simple, usable model. Once completed, I will use it to migrate
  the bad database to a new one with one table. It might not be the most space-efficient 
  but it won't be dumb.
*/

const pool = require('../modules/pool');

const articleTypes = {
  1: 'basic',
  2: 'attachment',
  3: 'standard',
};

const prevDetailsCache = {
  basic: {},
  attachment: {},
  standard: {},
}

async function getArticleInstnaces(articleId) {
  const sqlText = `SELECT * FROM article_instances WHERE article_id = $1 ORDER BY id;`;
  return pool.query(sqlText, [articleId])
    .then(res => res.rows)
    .catch(err => console.log(err));
}

async function getTextDetails(instanceId, detailTable) {
  const sqlText = `SELECT * FROM ${detailTable} WHERE instance_id = $1;`;
  return pool.query(sqlText, [instanceId])
    .then(res => res.rows)
    .catch(err => console.log(err));
}

async function getArticles(limit) {
  const sqlText = `SELECT * FROM article_urls ORDER BY id LIMIT $1;`;
  return pool.query(sqlText, [limit])
    .then(res => res.rows)
    .catch(err => console.log(err));
}

function mergeDetailsCorrectly(instanceTextData, table, instanceNumberData) {
  // if initialDetails is empty, set it equal to the last 
  // 'full' details of the same table

  // if initialDetails has stuff, add that stuff to the cache
  // so when initialDetails is empty, we can use the cached details that
  // have been associated with the proper table. This is all necessary because
  // I designed the database badly...
  if (instanceTextData[0]) {
    delete instanceTextData[0].instance_id;
    prevDetailsCache[table] = instanceTextData[0];
    return { ...instanceTextData[0], ...instanceNumberData };
  } 
  // if instanceTextData is empty, substitute the most recent details from the 
  // appropriate table 
  return { ...prevDetailsCache[table], ...instanceNumberData };
}

async function main() {
  const final = [];
  
  const articles = await getArticles(10);

  let i;
  for (i = 0; i < articles.length; i++) {
    const articleId = articles[i].id;

    const articleInstances = await getArticleInstnaces(articleId);

    let j;
    for (j = 0; j < articleInstances.length; j++) {
      const instance = articleInstances[j];

      const detailTable = articleTypes[instance.element_type];

      const initialDetails = await getTextDetails(instance.id, detailTable);

      const mergedNumbersAndText = mergeDetailsCorrectly(initialDetails, detailTable, instance);

      final.push(mergedNumbersAndText);
    }
  }
  return final;
}

module.exports = { main };