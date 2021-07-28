import { createApp } from 'vue';
import './registerServiceWorker';
import router from './router';
import pinia from './store';

import { GesturePlugin } from '@vueuse/gesture';

import ElementPlus from 'element-plus';
import './theme/index.scss';

import App from './App.vue';

createApp(App).use(router).use(pinia).use(GesturePlugin).use(ElementPlus).mount('#app');
