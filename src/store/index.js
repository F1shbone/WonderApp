import { createStore } from 'vuex';

import expansions from './modules/expansions';
import players from './modules/players';
import results from './modules/results';

// Create a new store instance.
const store = createStore({
  modules: {
    expansions,
    players,
    results,
  },
});

export default store;
