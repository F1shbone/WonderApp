import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'extensions',
  state: () => ({
    base: {
      id: 'base',
      label: 'Base Game',
      active: true,
    },
    leaders: {
      id: 'leaders',
      label: 'Leaders',
      active: false,
    },
    cities: {
      id: 'cities',
      label: 'Cities',
      active: false,
    },
    wonderPack: {
      id: 'wonderPack',
      label: 'Wonder Pack',
      active: false,
    },
    babel: {
      id: 'babel',
      label: 'Babel',
      active: false,
    },
    armada: {
      id: 'armada',
      label: 'Armada',
      active: false,
    },
  }),
  getters: {
    extensions: (state) => [state.base, state.leaders, state.cities, state.wonderPack, state.babel, state.armada],
    activeExtensions() {
      return this.extensions.filter((e) => e.active);
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
