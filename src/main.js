import { createApp } from 'vue';
import './registerServiceWorker';
import router from './router';
// import store from './store';
import { createPinia } from 'pinia';

import ElementPlus from 'element-plus';
import './theme/index.scss';

import App from './App.vue';

createApp(App)
  .use(createPinia())
  // .use(store)
  .use(router)
  .use(ElementPlus)
  .mount('#app');
