<!-- CategoryList.vue -->
<template>
    <div>
      <!-- Category list rendering -->
      <ul>
        <li v-for="category in categories" :key="category.id">
          {{ category.name }}
          <!-- Render subcategories for each category -->
          <ul>
            <li v-for="subcategory in category.subcategories" :key="subcategory.id">
              {{ subcategory.name }}
              <!-- Add buttons for update and delete actions for subcategories -->
            </li>
          </ul>
          <!-- Add buttons for update and delete actions for categories -->
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        categories: [] // Populate this array with categories and their subcategories fetched from API
      };
    },
    mounted() {
      // Fetch categories and their subcategories from API and populate the categories array
    }
  }
  </script>
  
  <!-- Add Tailwind CSS styling here -->
  