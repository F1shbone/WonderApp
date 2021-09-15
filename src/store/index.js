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

export const initStore = async () => {
  const promises = [];
  for (const module in store.state) {
    if (store.state[module].$initialized === false) {
      promises.push(store.dispatch(`${module}/initFromFirestore`));
    }
  }
  await Promise.all(promises);
};

export default store;
