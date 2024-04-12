<template>
  <div class="flex">
    <SidebarMenu />

    <div class="flex-grow">
      <Header />
      <div class="max-w-5xl mx-auto px-4">
        <h1 class="text-3xl font-bold mb-8">Product List</h1>
        <ul>
          <li v-for="product in products" :key="product.id">
            <div class="flex items-center mb-4">
              <img :src="product.photo" alt="Product Image" class="w-1/3 h-48 m-4" />
              <div>
                <h2 class="text-lg font-semibold">{{ product.name }}</h2>
                <p class="text-gray-700">Price: ${{ product.price }}</p>
                <p class="text-gray-700">
                  Category: {{ getCategoryName(product.categoryId) }}
                </p>
                <p class="text-gray-700">
                  Subcategory: {{ getSubategoryName(product.subcategoryId) }}
                </p>
                <div class="mt-2">
                  <button
                    @click="goToUpdateProduct(product.id)"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                  >
                    Update
                  </button>
                  <button
                    @click="deleteProduct(product.id)"
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
import { makeApiRequest } from "../api/api.js";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import SidebarMenu from "../components/SidebarMenu.vue";
import UpdateProductForm from "../components/UpdateProductForm.vue";

export default {
  components: {
    Header,
    Footer,
    SidebarMenu,
    UpdateProductForm,
  },
  data() {
    return {
      products: [],
      categories: [],
    };
  },
  created() {
    this.fetchCategories();
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const token = localStorage.getItem("token");
        const data = await makeApiRequest("get", "product", null, token);
        this.products = data;
      } catch (error) {
        console.error("Error fetching products:", error);
        if (error && error.status === 401) {
          this.$router.push("/");
        }
      }
    },
    async fetchCategories() {
      try {
        const token = localStorage.getItem("token");
        const data = await makeApiRequest("get", "category", null, token);
        this.categories = data;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    getCategoryName(categoryId) {
      const category = this.categories.find((cat) => cat.id === categoryId);
      return category ? category.name : "";
    },
    getSubategoryName(subcategoryId) {
      const subcategory = this.categories
        .reduce((acc, cur) => {
          return cur.subcategories ? [...acc, ...cur.subcategories] : acc;
        }, [])
        .find((subcat) => subcat.id === subcategoryId);
      return subcategory ? subcategory.name : "";
    },
    async deleteProduct(productId) {
      try {
        const token = localStorage.getItem("token");
        await makeApiRequest("delete", `product/${productId}`, null, token);

        this.products = this.products.filter((product) => product.id !== productId);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    },
    goToUpdateProduct(productId) {
      this.$router.push({ name: "UpdateProduct", params: { productId } });
    },
  },
};
</script>
