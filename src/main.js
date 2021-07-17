import { createApp } from 'vue';
import './registerServiceWorker';
import router from './router';
import { createPinia } from 'pinia';
import { GesturePlugin } from '@vueuse/gesture';

import ElementPlus from 'element-plus';
import './theme/index.scss';

import App from './App.vue';

createApp(App).use(createPinia()).use(GesturePlugin).use(router).use(ElementPlus).mount('#app');
