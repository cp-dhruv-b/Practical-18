<template>
  <header class="bg-gray-800 text-white p-4 flex justify-between items-center">
    <div class="text-xl font-bold">E-com Admin Panel</div>
    <nav class="flex items-center space-x-4">
      <router-link to="/product" class="hover:text-gray-300">Add Product</router-link>
      <router-link to="/category" class="hover:text-gray-300">Add Category</router-link>
      <button @click="logout" class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded">
        Logout
      </button>
    </nav>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/");
      console.log("Logged out");
    },
  },
};
</script>
