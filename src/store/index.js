import { createPinia } from 'pinia';
import localstorage from './plugins/localstorage';

const pinia = createPinia();

pinia.use(localstorage);

export default pinia;
