<!-- LogoutButton.vue -->
<template>
    <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
  </template>
  
  <script>
  export default {
    methods: {
      logout() {
        // Implement logout logic here
        console.log('Logging out...');
      }
    }
  }
  </script>
  
  <!-- Add Tailwind CSS styling here -->
  