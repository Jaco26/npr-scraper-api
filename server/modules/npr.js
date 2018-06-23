const axios = require('axios');
const FeaturedStories = require('../models/FeaturedStories');

const results = () => {
  return axios.get('https://www.npr.org')
    .then(response => {
      const html = response.data;
      console.log(new FeaturedStories(html));
      return {
        featuredStories: new FeaturedStories(html),
      }
    })
    .catch(err => {
      console.log('ERROR******* ', err);
    });
}

module.exports = results;