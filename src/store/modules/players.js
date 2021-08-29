import { convertDateToUTC, createDateAsUTC } from '@/utils/date';

export default {
  namespaced: true,
  state() {
    return {
      players: [
        {
          name: 'Romina',
          id: 1,
          added: 'Wed Jul 28 2021 17:25:40 GMT+0200 (Central European Summer Time)',
        },
        {
          name: 'Bernhard',
          id: 2,
          added: 'Wed Jul 28 2021 17:25:40 GMT+0200 (Central European Summer Time)',
        },
        {
          name: 'Simon',
          id: 3,
          added: 'Wed Jul 28 2021 17:25:40 GMT+0200 (Central European Summer Time)',
        },
        {
          name: 'Daniel',
          id: 4,
          added: 'Wed Jul 28 2021 17:25:40 GMT+0200 (Central European Summer Time)',
        },
        {
          name: 'Christian',
          id: 5,
          added: 'Wed Jul 28 2021 17:25:40 GMT+0200 (Central European Summer Time)',
        },
      ],
    };
  },
  getters: {
    index(state) {
      return state.players.reduce((max, player) => {
        if (player.id > max) max = player.id;
        return max;
      }, 0);
    },
    player: (state) => (id) => {
      return state.players.find((e) => e.id === id);
    },
    formatted(state) {
      return state.players.map(({ name, id, added }) => {
        return {
          name,
          id,
          added: convertDateToUTC(added),
        };
      });
    },
  },
  actions: {
    addPlayer({ commit, getters }, { name }) {
      commit('ADD_PLAYER', {
        name,
        id: getters.index + 1,
        added: createDateAsUTC(new Date()),
      });
    },
  },
  mutations: {
    ADD_PLAYER(state, player) {
      state.players.push(player);
    },
    REMOVE_PLAYER(state, { id }) {
      const index = state.players.findIndex((player) => player.id === id);
      state.players.splice(index, 1);
    },
  },
};