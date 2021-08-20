import cart from "./CartComponent";
import products from "./ProductComponent";
import error from "./ErrorComponent";
import search from "./FilterComponent";

const app = new Vue({
  el: "#app",
  components: {
    cart,
    products,
    error,
    search,
  },
  methods: {
    async getJson(url) {
      try {
        const result = await fetch(url);
        return await result.json();
      } catch (error) {
        this.$refs.error.text = error;
      }
    },
    async postJson(url, data) {
      try {
        const result = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        return await result.json();
      } catch (error) {
        this.$refs.error.text = error;
      }
    },
    async putJson(url, data) {
      try {
        const result = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        return await result.json();
      } catch (error) {
        this.$refs.error.text = error;
      }
    },
    async minusJson(url, data) {
      try {
        const result = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        return await result.json();
      } catch (error) {
        this.$refs.error.text = error;
      }
    },
    async removeJson(url, data) {
      try {
        const result = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        return await result.json();
      } catch (error) {
        this.$refs.error.text = error;
      }
    },
  },
});

export default app;
