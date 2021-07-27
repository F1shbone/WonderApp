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
    activeWonders() {
      return useExpansionStore().activeWonders;
    },
    usedWonders(state) {
      return new Set(state.players.map((e) => e.wonder.id));
    },
    activePlayers() {
      return usePlayerStore().activePlayers;
    },
  },
  actions: {
    initPlayers() {
      this.players = ShuffleArray(
        this.activePlayers.map((player, i) => {
          return {
            id: i,
            name: player.name,
            wonder: {},
          };
        })
      );
      this.players.map((player) => {
        player.wonder = this.getRandomWonder();
        return player;
      });
    },
    updatePosition(players) {
      players.forEach((player, i) => {
        this.players.find((e) => e.id === player.id).position = i;
      });
    },
    getRandomWonder() {
      let wonder = undefined;
      do {
        let i = Math.floor(Math.random() * this.activeWonders.length);
        wonder = this.activeWonders[i];
      } while (this.usedWonders.has(wonder.id));

      return wonder;
    },
  },
});
