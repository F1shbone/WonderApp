import { createStore } from 'vuex';

import players from './modules/players';

// Create a new store instance.
const store = createStore({
  modules: {
    players,
  },
});

export default store;
