import { defineStore } from 'pinia';
import { useStore as usePlayerStore } from './players';
import { useStore as useExpansionStore } from './expansions';

import * as expansions from './gameInfo/expansions';
import { ShuffleArray } from '@/utils/shuffleArray';

export const useStore = defineStore({
  id: 'match',
  getters: {
    expansions() {
      const expansions = useExpansionStore();

      return expansions.activeExpansions;
    },
    players() {
      const playerStore = usePlayerStore();

      return playerStore.activePlayers.map((player, i) => {
        return {
          name: player.name,
          wonder: this.wonders[i],
          id: +`${i}`,
          position: +`${i}`,
        };
      });
    },
    wonders() {
      const wonders = this.expansions.reduce((acc, curr) => {
        const expansion = expansions[curr.id];
        return [...acc, ...expansion.wonders];
      }, []);

      return ShuffleArray(wonders);
    },
  },
  actions: {
    updatePosition(players) {
      players.forEach((player, i) => {
        this.players.find((e) => e.id === player.id).position = i;
      });
    },
  },
});
