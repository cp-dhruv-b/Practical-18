<!-- UserList.vue -->
<template>
    <div>
      <!-- User list rendering -->
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.username }}
          <!-- Add button to view user details -->
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        users: [] // Populate this array with users fetched from API
      };
    },
    mounted() {
      // Fetch users from API and populate the users array
    }
  }
  </script>
  
  <!-- Add Tailwind CSS styling here -->
  