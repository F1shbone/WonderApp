import { defineStore } from 'pinia';
import { useStore as usePlayerStore } from './players';
import { useStore as useExpansionStore } from './expansions';

import { ShuffleArray } from '@/utils/shuffleArray';

export const useStore = defineStore({
  id: 'match',
  state() {
    return {
      players: [],
    };
  },
  getters: {
    activePlayers() {
      return usePlayerStore().activePlayers;
    },
    activeWonders() {
      return useExpansionStore().activeWonders;
    },
    usedWonders(state) {
      return new Set(state.players.map((e) => e.wonder.id));
    },
    playerCount(state) {
      return state.players.length;
    },
  },
  actions: {
    initPlayers() {
      const players = ShuffleArray(
        this.activePlayers.map((player, i) => {
          return {
            id: i,
            name: player.name,
            wonder: {},
            points: {},
          };
        })
      );
      players.map((player) => {
        player.wonder = this.getRandomWonder();
        return player;
      });

      return players;
    },
    updatePosition(players) {
      players.forEach((player, i) => {
        this.players.find((e) => e.id === player.id).position = i;
      });
    },
    getRandomWonder() {
      let wonder = undefined;
      do {
        wonder = this.activeWonders[Math.floor(Math.random() * this.activeWonders.length)];
      } while (this.usedWonders.has(wonder.id));

      return wonder;
    },
  },
});
