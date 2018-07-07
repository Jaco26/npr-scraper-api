const axios = require('axios');
const GeneralContent = require('./models/GeneralContent');
const FeaturedStories = require('./models/FeaturedStories');

const results = async () => {
  return await axios.get('https://www.npr.org')
    .then(response => {
      const html = response.data;
      let featuredStoriesResults = new FeaturedStories(html, '.stories-wrap-featured');
      let generalContentResults = new GeneralContent(html, '.stories-wrap-two');
      return {
        featuredStories: {
          articles: featuredStoriesResults.articles,
          attachmentGroups: featuredStoriesResults.attachmentGroups,
          featuredGroup: featuredStoriesResults.featuredGroup,
        },
        generalContent: {
          articles: generalContentResults.articles,
          attachmentGroups: generalContentResults.attachmentGroups,
        }
      }
    })
    .catch(err => {
      console.log('ERROR******* ', err);
    });
}

module.exports = results;