import { createApp } from 'vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import { GesturePlugin } from '@vueuse/gesture';

import ElementPlus from 'element-plus';
import './theme/index.scss';

import App from './App.vue';
const app = createApp(App);

app.use(router);
app.use(store);
app.use(GesturePlugin);
app.use(ElementPlus);

app.mount('#app');
