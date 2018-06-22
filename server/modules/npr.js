const axios = require('axios');
const FeaturedStories = require('../models/FeaturedStories');

const results = () => {
  return axios.get('https://www.npr.org')
    .then(response => {
      const html = response.data;
      return {
        featuredStories: new FeaturedStories(html),
        
      }
    })
}