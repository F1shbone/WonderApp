import { defineStore } from 'pinia';
import { useStore as usePlayerStore } from './players';
import { useStore as useExpansionStore } from './expansions';

import { ShuffleArray } from '@/utils/shuffleArray';

export const useStore = defineStore({
  id: 'match',
  state() {
    return {
      ready: false,
      players: [],
      scores: [],
    };
  },
  getters: {
    activePlayers() {
      return usePlayerStore().activePlayers;
    },
    activeWonders() {
      return useExpansionStore().activeWonders;
    },
  },
  actions: {
    initStore() {
      this.scores = useExpansionStore().activeScores;

      const players = ShuffleArray(
        this.activePlayers.map((player, i) => {
          const row = {
            id: i,
            name: player.name,
            wonder: {},
            score: this.scores.reduce((acc, curr) => {
              acc[curr.id] = 0;
              return acc;
            }, {}),
            get total() {
              return Object.values(this.score).reduce((acc, val) => (acc += val), 0);
            },
          };

          return row;
        })
      );
      players.map((player) => {
        player.wonder = this.getRandomWonder(players);
        return player;
      });

      this.players = players;
    },
    getRandomWonder(players) {
      const wonderSet = new Set(players.map((e) => e.wonder.id));
      let wonder = undefined;
      do {
        wonder = this.activeWonders[Math.floor(Math.random() * this.activeWonders.length)];
      } while (wonderSet.has(wonder.id));

      return wonder;
    },
  },
});
