import { createDateAsUTC } from '@/utils/date';

export default {
  namespaced: true,
  state() {
    return {
      ready: false,
      date: undefined,
      // Expansion Ids
      expansionIds: [],
      scoreIds: [],
      // Player Objects
      players: [],
    };
  },
  getters: {
    player: (state) => (id) => {
      return state.players.find((e) => e.id === id);
    },
    playerFull: (state, getters, rootState, rootGetters) => (id) => {
      // const wonderId = getters.player(id).wonder;
      // console.log(rootState.players.players, wonderId);
      // const wonder = '';
      return {
        name: rootGetters['players/player'](id).name,
      };
    },
  },
  actions: {
    init({ commit }, { expansionIds, scoreIds, players }) {
      commit('SET_DATE');
      commit('SET_EXPANSIONS', expansionIds);
      commit('SET_SCORES', scoreIds);
      commit('DELETE_PLAYERS');
      players.forEach((player) => {
        delete player.label;
        delete player.value;

        commit('ADD_PLAYER', player);
      });
      commit('SET_READY', true);
    },
    reset({ commit }) {
      commit('SET_READY', false);
      commit('SET_DATE', undefined);
      commit('SET_EXPANSIONS', []);
      commit('SET_SCORES', []);
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
    SET_SCORES(state, scoreIds) {
      state.scoreIds = [...scoreIds];
    },
    ADD_PLAYER(state, player) {
      state.players.push(player);
    },
    DELETE_PLAYERS(state) {
      state.players = [];
    },
  },
};
