import { createStore } from 'vuex';

import expansions from './modules/expansions';
import players from './modules/players';
import match from './modules/match';

// Create a new store instance.
const store = createStore({
  modules: {
    expansions,
    players,
    match,
  },
});

export default store;
