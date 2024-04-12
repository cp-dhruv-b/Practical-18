<!-- CategoryForm.vue -->
<template>
    <form @submit.prevent="submitForm" class="max-w-md mx-auto mt-8">
      <div class="mb-4">
        <label for="name" class="block text-gray-700">Category Name</label>
        <input type="text" id="name" v-model="name" required class="form-input mt-1 block w-full">
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: ''
      };
    },
    methods: {
      submitForm() {
        // Implement form submission logic here (create or update category)
        console.log('Submitting category form...');
      }
    }
  }
  </script>
  
  <!-- Add Tailwind CSS styling here -->
  