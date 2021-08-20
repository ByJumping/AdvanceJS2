import cartImg from "../img/cart.svg";
import accountImg from "../img/account.svg";

const cartsItem = {
  props: ["product", "img", "formNum"],
  template: `<div class="cart-item" v-bind:data-id="product.id_product">
                <div class="product-bio">
                    <div class="cart__img-wrap"><img :src="img" alt="Img"></div>
                    <div class="cart-text">
                        <p class="product-title">{{ product.product_name }}</p>
                        <p class="product-quantity"><span class="quantity-block" @click="$emit('minus-goods', product)">-</span>Quantity: {{ product.quantity }} <span class="quantity-block"@click="$emit('add-goods', product)">+</span></p>
                        <p class="product-single-price">$ {{ formNum(product.price) }} each</p>
                    </div>
                </div>
                <div class="right-block">
                    <p class="product-price">$ {{ formNum(product.quantity*product.price) }}</p>
                    <button class="del-btn" @click="$emit('delete-goods', product)">&times;</button>
                </div>
            </div>`,
};

const cart = {
  data() {
    return {
      cartUrl: "/getBasket.json",
      carts: [],
      show: false,
      totalSum: 0,
      cartImg: cartImg,
      accountImg: accountImg,
    };
  },
  components: {
    cartsItem,
  },
  mounted() {
    this.$parent.getJson(`/api/cart`).then((data) => {
      this.$data.carts = [...data.contents];
      this.totalSum = this.calcSum();
    });
  },
  methods: {
    addProduct(product) {
      let productId = +product.id_product;
      let find = this.carts.find((product) => product.id_product === productId);
      if (find) {
        this.$parent
          .putJson(`/api/cart/${find.id_product}`, find)
          .then((data) => {
            if (data.result === 1) {
              find.quantity++;
              this.totalSum = this.calcSum();
            }
          });
      } else {
        const newProduct = Object.assign({ quantity: 1 }, product);
        this.$parent.postJson(`/api/cart`, newProduct).then((data) => {
          if (data.result === 1) {
            this.carts.push(newProduct);
            this.totalSum = this.calcSum();
          }
        });
      }
    },
    minusGoods(goods) {
      let goodsId = +goods.id_product;
      let find = this.carts.find((product) => product.id_product === goodsId);
      if (find.quantity > 1) {
        this.$parent
          .minusJson(`/api/cart/${find.id_product}/minus`, goods)
          .then((data) => {
            if (data.result === 1) {
              find.quantity--;
              this.totalSum = this.calcSum();
            }
          });
      } else {
        this.deleteGoods(goods);
        this.totalSum = this.calcSum();
      }
    },
    deleteGoods(goods) {
      let goodsId = +goods.id_product;
      let find = this.carts.find((product) => product.id_product === goodsId);
      this.$parent
        .removeJson(`/api/cart/${find.id_product}`, goods)
        .then((data) => {
          if (data.result === 1) {
            this.carts.splice(this.carts.indexOf(goods), 1);
            this.totalSum = this.calcSum();
          }
        });
    },
    countCarts() {
      return this.carts.reduce((count, item) => (count += item.quantity), 0);
    },
    calcSum() {
      return this.carts.reduce(
        (accum, item) => (accum += item.price * item.quantity),
        0
      );
    },
    formatNumber(num) {
      return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ");
    },
  },

  template: `
            <div>
                <a href="#">
                  <img
                    class="header-icons__account"
                    :src="this.accountImg"
                    alt="account"
                  />
                </a>
                <button class="header-icons__cart-link" type="button" @click="show = !show">
                    <img
                    class="header-icons__cart"
                    :src="this.cartImg"
                    alt="cart"
                    />
                    <span class="header-icons__cart-count"> {{ this.countCarts() }} </span>
                </button>
                <div class="cart-block" v-show="show">
                    <div class="carts-placeholder" v-if="!carts.length">Корзина пуста</div>
                    <cartsItem
                        v-for="goods of carts"
                        :key="goods.id_product"
                        :product="goods"
                        :img="goods.img"
                        :formNum="formatNumber"
                        @add-goods="addProduct"
                        @delete-goods="deleteGoods"
                        @minus-goods="minusGoods"
                    ></cartsItem>
                    <div class="result-price" v-if="carts.length">Всего {{ this.formatNumber(totalSum) }}$</div>
                </div>
            </div>
    `,
};

export default cart;
