<template>
  <div class="flex">
    <SidebarMenu />

    <div class="flex-grow">
      <Header />
      <div class="flex justify-center items-center h-screen">
        <form
          @submit.prevent="updateCategory"
          class="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="categoryName">
              Category Name
            </label>
            <input
              v-model="categoryName"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="categoryName"
              type="text"
              placeholder="Category Name"
            />
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="parentId">
              Parent Category (Optional)
            </label>
            <select
              v-model="parentId"
              class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-3 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              id="parentId"
            >
              <option value="" disabled>Select a parent category (if applicable)</option>
              <option
                v-for="category in filteredCategories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
          <div class="flex items-center justify-between">
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update Category
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
      categoryName: "",
      parentId: "",
      categories: [],
      categoryId: null,
    };
  },
  async created() {
    try {
      const categoryId = this.$route.params.categoryId;
      if (!categoryId) {
        console.error("Category ID is undefined");
        return;
      }
      await this.fetchCategories();
      await this.fetchCategory(categoryId);
    } catch (error) {
      console.error("Error in created hook:", error);
    }
  },
  computed: {
    filteredCategories() {
      return this.categories.filter((category) => !category.parentId);
    },
  },
  methods: {
    async fetchCategories() {
      try {
        const token = localStorage.getItem("token");
        const data = await makeApiRequest("get", "category", null, token);
        this.categories = data;
      } catch (error) {
        console.error("Error fetching categories:", error);
        if (error.status === 401) {
          this.$router.push("/");
        }
      }
    },
    async fetchCategory(categoryId) {
      try {
        const token = localStorage.getItem("token");
        const data = await makeApiRequest("get", `category/${categoryId}`, null, token);
        const category = data;
        this.categoryName = category.name;
        this.parentId = category.parentId;
      } catch (error) {
        console.error("Error fetching category", error.data);
      }
    },
    async updateCategory() {
      try {
        const token = localStorage.getItem("token");
        const data = await makeApiRequest(
          "put",
          `category/${this.$route.params.categoryId}`,
          {
            name: this.categoryName,
            parentId: this.parentId,
          },
          token
        );
        this.$router.push("/categories");
      } catch (error) {
        console.error("Error updating category", error.data);
      }
    },
  },
};
</script>

<style lang="postcss"></style>
