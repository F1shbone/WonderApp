import { convertUTCToDateString, createDateAsUTC } from '@/utils/date';
import { useFireStore } from '../../firebase/';

export default {
  namespaced: true,
  state() {
    return {
      $initialized: false,
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
      const { getPlayers } = useFireStore();
      commit('RESET_PLAYERS');
      const players = await getPlayers();
      for (const playerId in players) {
        if (!Object.prototype.hasOwnProperty.call(players, playerId)) continue;
        const { name, added, id } = players[playerId];
        commit('ADD_PLAYER', { id, name, added });
      }
      commit('INITIALIZED');
    },
    async addPlayer({ commit, getters }, { name }) {
      const { addPlayer } = useFireStore();
      const player = {
        name,
        id: +getters.index + 1,
        added: createDateAsUTC(new Date()),
      };
      commit('ADD_PLAYER', player);
      try {
        await addPlayer({
          id: player.id,
          name: player.name,
          added: player.added.toString(),
        });
      } catch (e) {
        commit('REMOVE_PLAYER', { id: player.id });
      }
    },
  },
  mutations: {
    INITIALIZED(state) {
      state.$initialized = true;
    },
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
