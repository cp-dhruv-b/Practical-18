import { createApp } from 'vue';
import App from './App.vue';
import router from './routes/adminRoutes';

createApp(App).use(router).mount('#app');
