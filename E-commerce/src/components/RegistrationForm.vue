<template>
    <form @submit.prevent="register" class="max-w-md mx-auto">
      <div class="mb-4">
        <label for="username" class="block text-gray-700">Username</label>
        <input type="text" id="username" v-model="username" required class="form-input mt-1 block w-full">
      </div>
      <div class="mb-4">
        <label for="email" class="block text-gray-700">Email</label>
        <input type="email" id="email" v-model="email" required class="form-input mt-1 block w-full">
      </div>
      <div class="mb-4">
        <label for="password" class="block text-gray-700">Password</label>
        <input type="password" id="password" v-model="password" required class="form-input mt-1 block w-full">
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: ''
      };
    },
    methods: {
      register() {
        // Implement registration logic here
        console.log('Registering user...');
      }
    }
  }
  </script>
  