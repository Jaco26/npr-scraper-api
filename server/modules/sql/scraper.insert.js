const pool = require('../pool');
const router = require('express').Router();
// Practice json file
const results2PM = require('../practiceJSON/dataToClean2PM.json');

// function cleanArticle (article) {
//   article.slugText = article.slugText.replace(/\\n/g, '').trim();
//   article.storyNumber

//   const {featuredStories} = results;
//   articles = featuredStories.articles.map(article => {
//     article.slugText = article.slugText.replace(/\\n/g, '').trim();
//     article.storyNumber = Number(article.storyNumber.match(/\d/g).join(''))
//     return article;
//   });
//   return articles;
// }





router.get('/', (req, res) => {
  
})

module.exports = router