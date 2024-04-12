<template>
  <nav class="bg-gray-800 w-64 min-h-screen pt-10">
    <div class="px-6 mb-10">
      <h2 class="text-white text-2xl font-semibold">Menu</h2>
    </div>
    <ul>
      <li v-for="(link, index) in links" :key="index">
        <router-link
          :to="link.path"
          class="text-gray-300 py-2 px-6 hover:bg-gray-700 flex items-center"
        >
          <i :class="['fas', link.icon, 'mr-2']"></i>
          {{ link.label }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { label: "Dashboard", path: "/dashboard", icon: "fa-tachometer-alt" },
        { label: "Categories", path: "/categories", icon: "fa-list" },
        { label: "Products", path: "/products", icon: "fa-box-open" },
        { label: "Users", path: "/users", icon: "fa-users" },
      ],
    };
  },
};
</script>
