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

const samsGithub = () => {
  return axios.get('https://github.com/samstanding?tab=repositories')
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);
      let repoList = [];
      $('#user-repositories-list').find('ul').first().each(function(i, elem) {
        repoList[i] = {
          
        }
      })
    })
}


module.exports = nprHeadlines;

