import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // Certifique-se de que o router foi importado

createApp(App).use(router).mount('#app');
