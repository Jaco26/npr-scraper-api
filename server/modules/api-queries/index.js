module.exports = {
  keywordSearch: require('./keyword.search'),
  getArticleById: require('./article.id'),
  getArticlesBySpecificDate: require('./by.date').getArticlesBySpecificDate,
  getArticlesByDateRange: require('./by.date').getArticlesByDateRange,
}