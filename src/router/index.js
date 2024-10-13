import { createRouter, createWebHistory } from 'vue-router';
import ResetPassword from '../components/ResetPassword.vue';

const routes = [
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
