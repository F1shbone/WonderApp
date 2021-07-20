import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'players',
  state: () => ({
    players: [
      {
        name: 'Romina',
      },
      {
        name: 'Bernhard',
      },
      {
        name: 'Simon',
      },
      {
        name: 'Daniel',
      },
      {
        name: 'Christian',
      },
    ],
  }),
});
