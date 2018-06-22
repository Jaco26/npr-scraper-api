const api =  axios.create({
    baseURL: 'http://localhost:5000',
  })


const vm = new Vue({
  el: '#app',
  data: {
    headlines: [],
  },
  methods: {
    getHeadlines: function () {
      api.get('/headline/list')
        .then(response => {
          this.headlines = response.data;      
          console.log(this.headlines);
              
        })
        .catch(err => {
          console.log(err);          
        });
    }
  },
  mounted: function () {
    this.getHeadlines();
  }
})