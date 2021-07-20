import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'players',
  state: () => ({
    players: [
      {
        name: 'Romina',
        active: false,
      },
      {
        name: 'Bernhard',
        active: false,
      },
      {
        name: 'Simon',
        active: false,
      },
      {
        name: 'Daniel',
        active: false,
      },
      {
        name: 'Christian',
        active: false,
      },
    ],
  }),
  getters: {
    activePlayers() {
      return this.players.filter((e) => e.active);
    },
  },
  actions: {
    toggle(id) {
      this.players[id].active = !this.players[id].active;
    },
    reset() {
      this.players.forEach((p) => (p.active = false));
    },
  },
});
