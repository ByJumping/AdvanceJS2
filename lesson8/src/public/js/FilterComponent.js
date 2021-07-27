import logoImg from "../img/logo.png";
import searchImg from "../img/search.svg";
const search = {
  data() {
    return {
      searchLine: "",
      logoImg: logoImg,
      searchImg: searchImg,
    };
  },
  template: `
            <div> 
              <a href="index.html"><img class="header__logo" :src="this.logoImg" alt="logo" /></a>
              <form action="#" class="search-form" @input.prevent="$parent.$refs.products.filterGoods(searchLine)">
              <input type="text" class="search-field" v-model="searchLine">
                  <button class="btn-search" type="submit">
                      <img class="header__search" :src="this.searchImg" alt="search" />
                  </button>
              </form>
            </div>`,
};

export default search;
