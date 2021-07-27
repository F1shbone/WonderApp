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
    activePlayers() {
      return usePlayerStore().activePlayers;
    },
  },
  actions: {
    initPlayers() {
      this.players = ShuffleArray(
        this.activePlayers
          .map((player, i) => {
            return {
              id: i,
              name: player.name,
              wonder: {},
            };
          })
          .map((player) => {
            player.wonder = this.getRandomWonder();
            return player;
          })
      );
    },
    updatePosition(players) {
      players.forEach((player, i) => {
        this.players.find((e) => e.id === player.id).position = i;
      });
    },
    getRandomWonder() {
      return {
        label: {
          short: 'FooBar',
        },
      };
    },
  },
});
