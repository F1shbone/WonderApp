import { defineStore } from 'pinia';
import { ARMADA, BABEL_PROJECT, BABEL_TOWER, BASE, CITIES, LEADERS, WONDER_PACK } from './gameInfo/expansions';

export const useStore = defineStore({
  id: 'expansions',
  state: () => ({
    base: {
      id: BASE.id,
      label: BASE.label,
      owned: true,
      active: false,
    },
    leaders: {
      id: LEADERS.id,
      label: LEADERS.label,
      owned: true,
      active: false,
    },
    cities: {
      id: CITIES.id,
      label: CITIES.label,
      owned: true,
      active: false,
    },
    wonderPack: {
      id: WONDER_PACK.id,
      label: WONDER_PACK.label,
      owned: true,
      active: false,
    },
    babelTower: {
      id: BABEL_TOWER.id,
      label: BABEL_TOWER.label,
      owned: true,
      active: false,
    },
    babelProject: {
      id: BABEL_PROJECT.id,
      label: BABEL_PROJECT.label,
      owned: true,
      active: false,
    },
    armada: {
      id: ARMADA.id,
      label: ARMADA.label,
      owned: false,
      active: false,
    },
  }),
  getters: {
    expansions: (state) => [
      state.base,
      state.wonderPack,
      state.leaders,
      state.cities,
      state.babelTower,
      state.babelProject,
      state.armada,
    ],
    activeExpansions() {
      return this.expansions.filter((e) => e.active);
    },
    ownedExpansions() {
      return this.expansions.filter((e) => e.owned);
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
