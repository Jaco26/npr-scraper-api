const axios = require('axios');
const cheerio = require('cheerio');

const nprHeadlines = () => {
  return axios.get(`https://www.npr.org/`)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html)
      let articleList = [];
      $('.stories-wrap').children('article').each(function (i, elem) {
        articleList[i] = {
          title: $(this).find('.story-wrap').find('.story-text').children('a').first().find('h3').text(),
          teaser: $(this).find('.story-wrap').find('.story-text').find('.teaser').text(),
          url: $(this).find('.story-wrap').find('.story-text').children('a').last().attr('href'),
        }
      });
      const articleListTrimmed = articleList.filter(n => n != undefined);
      return articleListTrimmed;
    })
    .catch(err => console.log(err))
} 

module.exports = nprHeadlines;

