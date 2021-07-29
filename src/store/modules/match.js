import { createDateAsUTC } from '@/utils/date';

export default {
  namespaced: true,
  state() {
    return {
      ready: false,
      date: undefined,
      // Expansion Ids
      expansionIds: [],
      // Player Objects
      players: [],
    };
  },
  getters: {
    player: (state) => (id) => {
      return state.players.find((e) => e.id === id);
    },
    playerFull: (state, getters) => (id) => {
      const wonderId = getters.player(id).wonder;
      console.log(wonderId);
      // const wonder = '';
    },
  },
  actions: {
    init({ commit }, { expansionIds, players }) {
      commit('SET_READY', true);
      commit('SET_DATE');
      commit('SET_EXPANSIONS', expansionIds);
      players.forEach((player) => {
        delete player.label;
        delete player.value;

        commit('ADD_PLAYER', player);
      });
    },
    reset({ commit }) {
      commit('SET_READY', false);
      commit('SET_DATE', undefined);
      commit('SET_EXPANSIONS', []);
      commit('DELETE_PLAYERS');
    },
  },
  mutations: {
    SET_READY(state, status) {
      state.ready = status;
    },
    SET_DATE(state, date = createDateAsUTC(new Date())) {
      state.date = date;
    },
    SET_EXPANSIONS(state, expansionIds) {
      state.expansionIds = [...expansionIds];
    },
    ADD_PLAYER(state, player) {
      state.players.push(player);
    },
    DELETE_PLAYER(state) {
      state.players = [];
    },
  },
};
