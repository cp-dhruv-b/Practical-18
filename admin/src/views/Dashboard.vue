<template>
  <div class="flex">
    <SidebarMenu />

    <div class="flex-grow">
      <Header />

      <div class="container mx-auto px-4 py-6">
        <div class="mb-6">
          <h2 class="text-2xl font-semibold">Welcome, Admin!</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="item in items" :key="item.title">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-lg font-semibold mb-4">{{ item.title }}</h3>
              <button
                @click="item.action"
                class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center"
              >
                <i class="fas" :class="item.iconClass"></i> {{ item.buttonText }}
              </button>
            </div>
          </div>
        </div>

        <div class="mt-6">
          <h3 class="text-lg font-semibold mb-4">Recently Added Products</h3>
          <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
            <li v-for="product in recentProducts" :key="product.id">
              <div class="bg-white rounded-lg shadow-md p-4">
                <p class="font-semibold">{{ product.name }}</p>
                <p class="text-gray-500">${{ product.price }}</p>
              </div>
            </li>
          </ul>
        </div>
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

export default {
  components: {
    Header,
    Footer,
    SidebarMenu,
  },
  data() {
    return {
      recentProducts: [],
      items: [
        {
          title: "View Products",
          action: this.navigateToProducts,
          iconClass: "fa-eye",
          buttonText: "View Products",
        },
        {
          title: "View Users",
          action: this.navigateToUsers,
          iconClass: "fa-eye",
          buttonText: "View Users",
        },
        {
          title: "View Categories",
          action: this.navigateToCategories,
          iconClass: "fa-eye",
          buttonText: "View Categories",
        },
        {
          title: "Add Product",
          action: this.navigateToAddProduct,
          iconClass: "fa-plus-circle",
          buttonText: "Add Product",
        },
        {
          title: "Add Category",
          action: this.navigateToAddCategory,
          iconClass: "fa-plus-circle",
          buttonText: "Add Category",
        },
      ],
    };
  },
  created() {
    this.fetchRecentProducts();
  },
  methods: {
    async fetchRecentProducts() {
      try {
        const token = localStorage.getItem("token");
        const data = await makeApiRequest("get", "recent/product", null, token);
        this.recentProducts = data;
      } catch (error) {
        console.error("Error fetching categories:", error);
        if (error.status === 401) {
          this.$router.push("/");
        }
      }
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
      console.log("Logged out");
    },
    navigateToAddCategory() {
      this.$router.push("/category");
      console.log("Navigate to Add Category");
    },
    navigateToAddProduct() {
      this.$router.push("/product");
      console.log("Navigate to Add Product");
    },
    navigateToCategories() {
      this.$router.push("/categories");
      console.log("Navigate to View Categories");
    },
    navigateToProducts() {
      this.$router.push("/products");
      console.log("Navigate to View Products");
    },
    navigateToUsers() {
      this.$router.push("/users");
      console.log("Navigate to View Users");
    },
  },
};
</script>
