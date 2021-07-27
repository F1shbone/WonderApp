import { defineStore } from 'pinia';
import * as expansions from './gameInfo/expansions';
import { ARMADA, BABEL_PROJECT, BABEL_TOWER, BASE, CITIES, LEADERS, WONDER_PACK } from './gameInfo/expansions';

export const useStore = defineStore({
  id: 'expansions',
  state: () => ({
    [BASE.id]: {
      id: BASE.id,
      label: BASE.label,
      owned: true,
      active: true,
    },
    [LEADERS.id]: {
      id: LEADERS.id,
      label: LEADERS.label,
      owned: true,
      active: false,
    },
    [CITIES.id]: {
      id: CITIES.id,
      label: CITIES.label,
      owned: true,
      active: false,
    },
    [WONDER_PACK.id]: {
      id: WONDER_PACK.id,
      label: WONDER_PACK.label,
      owned: true,
      active: false,
    },
    [BABEL_TOWER.id]: {
      id: BABEL_TOWER.id,
      label: BABEL_TOWER.label,
      owned: true,
      active: false,
    },
    [BABEL_PROJECT.id]: {
      id: BABEL_PROJECT.id,
      label: BABEL_PROJECT.label,
      owned: true,
      active: false,
    },
    [ARMADA.id]: {
      id: ARMADA.id,
      label: ARMADA.label,
      owned: false,
      active: false,
    },
  }),
  getters: {
    expansions: (state) => [
      state[BASE.id],
      state[WONDER_PACK.id],
      state[LEADERS.id],
      state[CITIES.id],
      state[BABEL_TOWER.id],
      state[BABEL_PROJECT.id],
      state[ARMADA.id],
    ],
    ownedExpansions() {
      return this.expansions.filter((e) => e.owned);
    },
    activeExpansions() {
      return this.expansions.filter((e) => e.active);
    },
    activeWonders() {
      return this.activeExpansions.reduce((acc, curr) => {
        const expansion = expansions[curr.id];
        return [...acc, ...expansion.wonders];
      }, []);
    },
  },
  actions: {
    toggleOwned(key) {
      this[key].owned = !this[key].owned;
    },
    toggleActive(key) {
      this[key].active = !this[key].active;
    },
    resetActive() {
      this.expansions.forEach((p) => (p.active = false));
    },
  },
});
