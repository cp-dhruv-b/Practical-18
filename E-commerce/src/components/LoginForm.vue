<!-- LoginForm.vue -->
<template>
    <form @submit.prevent="login" class="max-w-md mx-auto mt-8">
      <div class="mb-4">
        <label for="email" class="block text-gray-700">Email</label>
        <input type="email" id="email" v-model="email" required class="form-input mt-1 block w-full">
      </div>
      <div class="mb-4">
        <label for="password" class="block text-gray-700">Password</label>
        <input type="password" id="password" v-model="password" required class="form-input mt-1 block w-full">
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      login() {
        // Implement login logic here
        console.log('Logging in admin...');
      }
    }
  }
  </script>
  
  <!-- Add Tailwind CSS styling here -->
  