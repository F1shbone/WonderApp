import { createStore } from 'vuex';

import expansions from './modules/expansions';
import players from './modules/players';

// Create a new store instance.
const store = createStore({
  modules: {
    expansions,
    players,
  },
});

export default store;
