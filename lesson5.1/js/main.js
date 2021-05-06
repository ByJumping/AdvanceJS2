const API = 'https://raw.githubusercontent.com/' +
    'GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    userSearch: '',
    catalogUrl: '/catalogData.json',
    products: [],
    imgCatalog: 'https://via.placeholder.com/350x150',
    imgCatalogCard: 'https://via.placeholder.com/50x50',
    visible: false,
    cardItems: [],
    cartUrl: '/getBasket.json',
    filtered: [],
  },
  methods: {
    getJson(url){
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },
    addProduct(product) {
      this.getJson(`${API}/addToBasket.json`)
          .then(data => {
            if (data.result === 1) {
              let find = this.cardItems.find(el => el.id_product === product.id_product);
              if (find) {
                find.quantity++;
              } else {
                let prod = Object.assign({quantity: 1}, product);
                this.cardItems.push(prod)
              }
            } else {
              alert('Error');
            }
          })
    },
    deleteItem(item) {
      this.getJson(`${API}/deleteFromBasket.json`)
          .then(data => {
            if (data.result === 1) {
              if (item.quantity > 1) {
                item.quantity--;
              } else {
                this.cardItems.splice(this.cardItems.indexOf(item), 1)
              }
            }
          })
    },
    filter() {
      let regexp = new RegExp(this.userSearch, 'i');
      this.filtered = this.products.filter(el => regexp.test(el.product_name));
    },
  },
  beforeCreate() {},
  created() {
    this.getJson(`${API + this.cartUrl}`)
        .then(data => {
          for (let el of data.contents) {
            this.cardItems.push(el);
            this.filtered.push(el);
          }
        });
    this.getJson(`${API + this.catalogUrl}`)
        .then(data => {
          for (let el of data) {
            this.products.push(el);
          }
        });
  },
  mounted() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
});
