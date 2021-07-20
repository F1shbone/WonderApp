import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'expansions',
  state: () => ({
    base: {
      id: 'base',
      label: 'Base Game',
      owned: true,
    },
    leaders: {
      id: 'leaders',
      label: 'Leaders',
      owned: true,
    },
    cities: {
      id: 'cities',
      label: 'Cities',
      owned: true,
    },
    wonderPack: {
      id: 'wonderPack',
      label: 'Wonder Pack',
      owned: true,
    },
    babelTower: {
      id: 'babelTower',
      label: 'Babel - Tower',
      owned: true,
    },
    babelProject: {
      id: 'babelProject',
      label: 'Babel - Great Projects',
      owned: true,
    },
    armada: {
      id: 'armada',
      label: 'Armada',
      owned: false,
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
    ownedExpansions() {
      return this.expansions.filter((e) => e.owned);
    },
  },
  actions: {
    toggle(key) {
      console.log(key);
      this[key].owned = !this[key].owned;
    },
    toggleLeaders() {
      this.leaders.owned = !this.leaders.owned;
    },
    toggleCities() {
      this.cities.owned = !this.cities.owned;
    },
    toggleWonderPack() {
      this.wonderPack.owned = !this.wonderPack.owned;
    },
    toggleBabelTower() {
      this.babelTower.owned = !this.babelTower.owned;
    },
    toggleBabelProject() {
      this.babelProject.owned = !this.babelProject.owned;
    },
    toggleArmada() {
      this.armada.owned = !this.armada.owned;
    },
  },
});
