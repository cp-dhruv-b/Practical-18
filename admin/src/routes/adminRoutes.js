  import { createRouter, createWebHistory } from 'vue-router';
  import AdminLoginForm from '../components/AdminLoginForm.vue';
  import AdminRegisterForm from '../components/AdminRegisterForm.vue';
  import ProductForm from '../components/ProductForm.vue';
  import CategoryForm from '../components/CategoryForm.vue';
  import UpdateCategoryForm from '../components/UpdateCategoryForm.vue';
  import UpdateProductForm from '../components/UpdateProductForm.vue';
  import UserList from '../views/UserList.vue';
  import Dashboard from '../views/Dashboard.vue';
  import ProductList from '../views/ProductList.vue';
  import CategoryList from '../views/CategoryList.vue';


  const routes = [
    {
      path: '/',
      name: 'Login',
      component: AdminLoginForm
    },
    {
      path: '/register',  
      name: 'Register',
      component: AdminRegisterForm
    },
    {
      path: '/product',
      name: 'ProductsForm',
      component: ProductForm
    },
    {
      path: '/category',
      name: 'CategoryForm',
      component: CategoryForm
    },
    {
      path: '/users',
      name: 'UsersList',
      component: UserList
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/categories',
      name: 'CategoryList',
      component: CategoryList
    },
    {
      path: '/products',
      name: 'ProductList',
      component: ProductList
    },
    {
      path: '/updatecategory/:categoryId',
      name: 'UpdateCategory',
      component: UpdateCategoryForm
    },
    {
      path: '/updateproduct/:productId',
      name: 'UpdateProduct',
      component: UpdateProductForm
    }
  ];

  const router = createRouter({
    history: createWebHistory(),
    routes
  });

  export default router;
