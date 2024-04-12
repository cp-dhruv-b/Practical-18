<template>
  <div class="flex">
    <SidebarMenu />
    <div class="flex-grow">
      <Header />
      <div class="flex justify-center items-center h-screen flex-col">
        <h1 class="text-3xl font-bold mb-4 mt-10 flex">Add Product</h1>
        <form class="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
              Product Name
            </label>
            <input
              v-model="name"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Product Name"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="price">
              Price
            </label>
            <input
              v-model="price"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              type="number"
              placeholder="Price"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="category">
              Category
            </label>
            <select
              v-model="categoryId"
              @change="filterSubcategories"
              class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-3 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              id="category"
            >
              <option value="" disabled>Select category</option>
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>

          <div class="mb-4" v-if="subcategories.length > 0">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="subcategory">
              Subcategory
            </label>
            <select
              v-model="subcategoryId"
              class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-3 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              id="subcategory"
            >
              <option value="" disabled>Select subcategory</option>
              <option
                v-for="subcategory in subcategories"
                :key="subcategory.id"
                :value="subcategory.id"
              >
                {{ subcategory.name }}
              </option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="photo">
              Photo
            </label>
            <input
              v-model="photo"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="photo"
              type="url"
              placeholder="Photo Url"
              required
            />
          </div>

          <div class="flex items-center justify-between">
            <button
              @click.prevent="createProduct"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
import { makeApiRequest } from "../api/api.js";
import SidebarMenu from "./SidebarMenu.vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";

export default {
  components: {
    Header,
    Footer,
    SidebarMenu,
  },
  data() {
    return {
      name: "",
      price: null,
      categoryId: null,
      subcategoryId: null,
      categories: [],
      subcategories: [],
      photo: null,
    };
  },
  methods: {
    async createProduct() {
      try {
        const token = localStorage.getItem("token");
        const response = await makeApiRequest("post", "product", {
            name: this.name,
            price: this.price,
            categoryId: this.categoryId,
            subcategoryId: this.subcategoryId,
            photo: this.photo,
          },token
        );
        this.$router.push("/products");
      } catch (error) {
        console.error("Error creating product", error.response.data);
      }
    },
    filterSubcategories() {
      this.subcategories = this.categories.find(cat => cat.id === this.categoryId)?.subcategories || [];
    },
    onFileChange(event) {
      this.photo = event.target.files[0];
      console.log("Selected file:", this.photo);
    },
  },
  async created() {
    try {
      const token = localStorage.getItem("token");
      const data = await makeApiRequest("get", "category", null, token);
      this.categories = data;
    } catch (error) {
      console.error("Error fetching categories", error.response.data);
    }
  },
};
</script>

<style lang="postcss"></style>
