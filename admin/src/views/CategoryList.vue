<template>
  <div class="flex">
    <SidebarMenu />

    <div class="flex-grow">
      <Header />
      <div class="max-w-5xl mx-auto px-4">
        <h1 class="text-3xl font-bold mb-8">Category List</h1>
        <div v-for="category in categories" :key="category.id">
          <template v-if="!category.parentId">
            <div class="bg-white shadow-md rounded-md p-6 mb-6">
              <h2 class="text-xl font-bold mb-4">{{ category.name }}</h2>
              <div class="mt-6 flex justify-end">
                <router-link
                  :to="{
                    name: 'UpdateCategory',
                    params: { categoryId: category.id },
                  }"
                  class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md mr-2 hover:bg-blue-600"
                >
                  Update
                </router-link>
                <button
                  @click="deleteCategory(category)"
                  class="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
              <div v-if="category.subcategories && category.subcategories.length > 0">
                <h3 class="text-lg font-bold mt-4">Subcategories:</h3>
                <div v-for="subcategory in category.subcategories" :key="subcategory.id">
                  <div class="ml-6 mt-2">
                    <router-link
                      :to="{
                        name: 'UpdateCategory',
                        params: { categoryId: subcategory.id },
                      }"
                      class="text-blue-500 hover:underline mr-2"
                    >
                      {{ subcategory.name }}
                    </router-link>
                    <button
                      @click="deleteCategory(subcategory)"
                      class="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <br /><br />
      <Footer />
    </div>
  </div>
</template>

<script>

import { makeApiRequest } from "../api/api.js";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import SidebarMenu from "../components/SidebarMenu.vue";

export default {
  components: {
    Header,
    Footer,
    SidebarMenu,
  },
  data() {
    return {
      categories: [],
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const token = localStorage.getItem("token");
        const data = await makeApiRequest("get", "category", null, token);
        this.categories = data;
        const categoriesMap = new Map();
        this.categories.forEach((category) => {
          const parentId = category.parentId || "0";
          if (!categoriesMap.has(parentId)) {
            categoriesMap.set(parentId, []);
          }
          categoriesMap.get(parentId).push(category);
        });
        this.categories.forEach((category) => {
          const parentId = category.id.toString();
          if (categoriesMap.has(parentId)) {
            category.subcategories = categoriesMap.get(parentId);
          }
        });
      } catch (error) {
        console.error("Error fetching categories:", error);
        if (error.status === 401) {
          this.$router.push("/");
        }
      }
    },
    async deleteCategory(category) {
      try {
        const token = localStorage.getItem("token");
        await makeApiRequest("delete", `category/${category.id}`, null, token);
        this.fetchCategories();
      } catch (error) {
        console.error("Error deleting category:", error.data);
      }
    },
  },
};
</script>