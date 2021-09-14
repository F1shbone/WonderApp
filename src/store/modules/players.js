import { convertUTCToDateString, createDateAsUTC } from '@/utils/date';
import { useFirebase } from '../../firebase/';

export default {
  namespaced: true,
  state() {
    return {
      players: [],
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
          added: convertUTCToDateString(added),
        };
      });
    },
  },
  actions: {
    async initFromFirestore({ commit }) {
      const { store } = useFirebase();
      commit('RESET_PLAYERS');

      const players = await store.getPlayers();
      for (const id in players) {
        if (!Object.prototype.hasOwnProperty.call(players, id)) continue;

        const { name, added } = players[id];
        commit('ADD_PLAYER', { id, name, added });
      }
    },
    addPlayer({ commit, getters }, { name }) {
      commit('ADD_PLAYER', {
        name,
        id: getters.index + 1,
        added: createDateAsUTC(new Date()),
      });
    },
  },
  mutations: {
    RESET_PLAYERS(state) {
      state.players.length = 0;
    },
    ADD_PLAYER(state, player) {
      state.players.push(player);
    },
    REMOVE_PLAYER(state, { id }) {
      const index = state.players.findIndex((player) => player.id === id);
      state.players.splice(index, 1);
    },
  },
};
