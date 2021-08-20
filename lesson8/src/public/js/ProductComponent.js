const product = {
  props: ["goods", "img", "formNum"],
  template: `
    <div class="card main-cards_center">
        <div class="card__img-wrap">
            <img class="card__img" :src="img" alt="card">
            <div class="card-overlay">
                <button class="card-btn" @click="$emit('add-product', goods)">
                    Add to Cart
                </button>
            </div>
        </div>
        <div class="card-content">
            <a href="#">
                <h4 class="card-content__heading"> {{ goods.product_name }} </h4>
            </a>
            <p class="card-content__desc"> {{ goods.description }} </p>
            <span class="card-content__price">$ {{  formNum(goods.price) }} </span>
        </div>
    </div>
  `,
};

const products = {
  data() {
    return {
      products: [],
      filtered: [],
    };
  },
  components: {
    product,
  },
  mounted() {
    this.$parent.getJson(`/api/products`).then((data) => {
      this.$data.products = [...data];
      this.$data.filtered = [...data];
    });
  },
  methods: {
    filterGoods(searchLine) {
      const regExp = new RegExp(searchLine, "i");
      this.filtered = this.products.filter((product) =>
        regExp.test(product.product_name)
      );
    },
  },
  template: `
            <div class="main-cards-wrap">
                <product
                    v-for="goods of filtered"
                    :key="goods.id_product"
                    :goods="goods"
                    :img="goods.img"
                    :formNum="$parent.$refs.cart.formatNumber"
                    @add-product="$parent.$refs.cart.addProduct"
                ></product>
            </div>
            `,
};

export default products;
