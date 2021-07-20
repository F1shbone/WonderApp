import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'expansions',
  state: () => ({
    base: {
      id: 'base',
      label: 'Base Game',
      owned: true,
      active: false,
    },
    leaders: {
      id: 'leaders',
      label: 'Leaders',
      owned: true,
      active: false,
    },
    cities: {
      id: 'cities',
      label: 'Cities',
      owned: true,
      active: false,
    },
    wonderPack: {
      id: 'wonderPack',
      label: 'Wonder Pack',
      owned: true,
      active: false,
    },
    babelTower: {
      id: 'babelTower',
      label: 'Babel - Tower',
      owned: true,
      active: false,
    },
    babelProject: {
      id: 'babelProject',
      label: 'Babel - Great Projects',
      owned: true,
      active: false,
    },
    armada: {
      id: 'armada',
      label: 'Armada',
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
    reset() {
      this.expansions.forEach((p) => (p.active = false));
    },
  },
});
