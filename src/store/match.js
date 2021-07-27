import { defineStore } from 'pinia';
import { useStore as usePlayerStore } from './players';
import { useStore as useExpansionStore } from './expansions';

import { ShuffleArray } from '@/utils/shuffleArray';

export const useStore = defineStore({
  id: 'match',
  state() {
    return {
      players: [],
      // stub
      // players: [
      //   {
      //     id: 4,
      //     name: 'Christian',
      //     wonder: {
      //       id: 'OLYMPIA',
      //       label: { long: 'The Statue of Zeus in Olympia', short: 'Olympia' },
      //       variants: {
      //         a: {
      //           produces: 'lumber',
      //           costs: [
      //             { cost: { lumber: 2 }, reward: { vp: 3 } },
      //             {
      //               cost: { stone: 2 },
      //               reward: { special: ['A player can, once per age, build a structure of their choice for free.'] },
      //             },
      //             { cost: { ore: 2 }, reward: { vp: 7 } },
      //           ],
      //         },
      //         b: {
      //           produces: 'lumber',
      //           costs: [
      //             {
      //               cost: { lumber: 2 },
      //               reward: {
      //                 special: [
      //                   'The player can purchase raw materials from his/her two neighborig cities for the price of one coin instead of two.',
      //                 ],
      //               },
      //             },
      //             { cost: { stone: 2 }, reward: { vp: 5 } },
      //             {
      //               cost: { loom: 1, ore: 2 },
      //               reward: {
      //                 special: [
      //                   'The player can copy a Guild of their choice built by one of their two neighboring cities.',
      //                 ],
      //               },
      //             },
      //           ],
      //         },
      //       },
      //     },
      //     points: {},
      //   },
      //   {
      //     id: 1,
      //     name: 'Bernhard',
      //     wonder: {
      //       id: 'STONEHENGE',
      //       label: { long: 'Stonehenge', short: 'Stonehenge' },
      //       variants: {
      //         a: {
      //           produces: 'lumber',
      //           costs: [
      //             { cost: { ore: 1, clay: 1 }, reward: { vp: 3 } },
      //             { cost: { press: 1, clay: 2 }, reward: { vp: 5 } },
      //             {
      //               cost: { loom: 1, lumber: 3 },
      //               reward: {
      //                 special: [
      //                   'At the end of the game, the Player scores 2 victory points for each Stone resource present on their brown cards.',
      //                 ],
      //               },
      //             },
      //           ],
      //         },
      //         b: {
      //           produces: 'lumber',
      //           costs: [
      //             {
      //               cost: { ore: 3 },
      //               reward: {
      //                 special: [
      //                   "This Stage grants 1 coin for each Stone resource symbol presen on the player's borwn cards when it's built. At the end of the game, this Stage scores 1 victory point for each Stone resource symbol present on the player's brown cards.",
      //                 ],
      //               },
      //             },
      //             {
      //               cost: { press: 1, clay: 3 },
      //               reward: {
      //                 special: [
      //                   'At the end of the game, the player flips face-up the card used to build this Stage. Then, the player scores 1 victory point for each card of the color present in both meighboring cities',
      //                 ],
      //               },
      //             },
      //           ],
      //         },
      //       },
      //     },
      //     points: {},
      //   },
      //   {
      //     id: 3,
      //     name: 'Daniel',
      //     wonder: {
      //       id: 'GIZA',
      //       label: { long: 'The Pyramids of Giza', short: 'Giza' },
      //       variants: {
      //         a: {
      //           produces: 'stone',
      //           costs: [
      //             { cost: { stone: 2 }, reward: { vp: 3 } },
      //             { cost: { lumber: 3 }, reward: { vp: 5 } },
      //             { cost: { stone: 4 }, reward: { vp: 7 } },
      //           ],
      //         },
      //         b: {
      //           produces: 'stone',
      //           costs: [
      //             { cost: { lumber: 2 }, reward: { vp: 3 } },
      //             { cost: { stone: 3 }, reward: { vp: 5 } },
      //             { cost: { clay: 3 }, reward: { vp: 5 } },
      //             { cost: { press: 1, stone: 3 }, reward: { vp: 7 } },
      //           ],
      //         },
      //       },
      //     },
      //     points: {},
      //   },
      //   {
      //     id: 0,
      //     name: 'Romina',
      //     wonder: {
      //       id: 'ABU_SIMBEL',
      //       label: { long: 'Abu Simbel', short: 'Abu Simbel' },
      //       variants: {
      //         a: {
      //           produces: 'press',
      //           costs: [
      //             { cost: { stone: 1, clay: 1 }, reward: { vp: 3 } },
      //             { cost: { lumber: 1, ore: 1 }, reward: { vp: 5 } },
      //             {
      //               cost: { glassworks: 1, loom: 1, stone: 2 },
      //               reward: {
      //                 special: [
      //                   "At the moment when this Wonder Stage is built, the player must choose one of their previously recruited Leaders and place it face-down on the space reserved for that on their board. The player can no longer benefit from the chpsen Leader's effect. At the end of the game, the player scores a number of points equivalent to double the Leader's cost.",
      //                 ],
      //               },
      //             },
      //           ],
      //         },
      //         b: {
      //           produces: 'press',
      //           costs: [
      //             {
      //               cost: { loom: 1, clay: 2 },
      //               reward: {
      //                 special: [
      //                   "At the moment when this Wonder Stage is built, the player must choose one of their previously recruited Leaders and place it face-down on the space reserved for that on their board. The player can no longer benefit from the chpsen Leader's effect. At the end of the game, the player scores a number of points equivalent to double the Leader's cost.",
      //                 ],
      //               },
      //             },
      //             {
      //               cost: { glassworks: 1, lumber: 2 },
      //               reward: {
      //                 special: [
      //                   "At the moment when this Wonder Stage is built, the player must choose one of their previously recruited Leaders and place it face-down on the space reserved for that on their board. The player can no longer benefit from the chpsen Leader's effect. At the end of the game, the player scores a number of points equivalent to double the Leader's cost.",
      //                 ],
      //               },
      //             },
      //           ],
      //         },
      //       },
      //     },
      //     points: {},
      //   },
      //   {
      //     id: 2,
      //     name: 'Simon',
      //     wonder: {
      //       id: 'BABYLON',
      //       label: { long: 'The Hanging Gardens of Babylon', short: 'Babylon' },
      //       variants: {
      //         a: {
      //           produces: 'clay',
      //           costs: [
      //             { cost: { clay: 2 }, reward: { vp: 3 } },
      //             {
      //               cost: { lumber: 3 },
      //               reward: {
      //                 special: ['At the end of the game, the player gains an extra scientific symbol of their choice.'],
      //               },
      //             },
      //             { cost: { clay: 4 }, reward: { vp: 7 } },
      //           ],
      //         },
      //         b: {
      //           produces: 'clay',
      //           costs: [
      //             { cost: { loom: 1, clay: 1 }, reward: { vp: 3 } },
      //             {
      //               cost: { glassworks: 1, lumber: 2 },
      //               reward: {
      //                 special: [
      //                   "Instead of discarding the last card each round, the player can either: play it by paying it's costs, discard it to earn 3 coins or use it to build the third phase of this wonder",
      //                 ],
      //               },
      //             },
      //             {
      //               cost: { press: 1, clay: 3 },
      //               reward: {
      //                 special: ['At the end of the game, the player gains an extra scientific symbol of their choice.'],
      //               },
      //             },
      //           ],
      //         },
      //       },
      //     },
      //     points: {},
      //   },
      // ],
    };
  },
  getters: {
    activePlayers() {
      return usePlayerStore().activePlayers;
    },
    activeScores() {
      return useExpansionStore().activeScores;
    },
    activeWonders() {
      return useExpansionStore().activeWonders;
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
        player.wonder = this.getRandomWonder(players);
        return player;
      });

      return players;
    },
    updatePosition(players) {
      players.forEach((player, i) => {
        this.players.find((e) => e.id === player.id).position = i;
      });
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
