import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'expansions',
  state: () => ({
    base: {
      id: 'base',
      label: 'Base Game',
      owned: true,
      active: true,
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
    babel: {
      id: 'babel',
      label: 'Babel',
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
    expansions: (state) => [state.base, state.leaders, state.cities, state.wonderPack, state.babel, state.armada],
    activeExpansions() {
      return this.expansions.filter((e) => e.active);
    },
    ownedExpansions() {
      return this.expansions.filter((e) => e.owned);
    },
  },
  actions: {
    toggleLeaders() {
      this.leaders.active = !this.leaders.active;
    },
    toggleCities() {
      this.cities.active = !this.cities.active;
    },
    toggleWonderPack() {
      this.wonderPack.active = !this.wonderPack.active;
    },
    toggleBabel() {
      this.babel.active = !this.babel.active;
    },
    toggleArmada() {
      this.armada.active = !this.armada.active;
    },
  },
});
