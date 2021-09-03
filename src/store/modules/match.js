import { createDateAsUTC } from '@/utils/date';

export default {
  namespaced: true,
  state() {
    return {
      date: createDateAsUTC(new Date()),
      scoreIds: [],
      expansionIds: [],
      players: [],
    };
  },
  getters: {
    player: (state) => (id) => {
      return state.players.find((e) => e.id === id);
    },
    playerFull: (state, getters, rootState, rootGetters) => (id) => {
      return {
        name: rootGetters['players/player'](id).name,
      };
    },
  },
  actions: {
    init({ commit }, { expansionIds, scoreIds, players }) {
      commit('SET_EXPANSIONS', expansionIds);
      commit('SET_SCORES', scoreIds);
      players.forEach(({ id, wonderId, score }) => {
        commit('ADD_PLAYER', {
          id,
          wonderId,
          score,
        });
      });
    },
    setPlayerScore({ commit, state }, { playerId, scoreId, score }) {
      const playerIndex = state.players.findIndex((p) => p.id === playerId);
      commit('SET_PLAYER_SCORE', { playerIndex, scoreId, score });
    },
    setPlayerScoreMeta({ commit, state }, { playerId, scoreId, meta }) {
      const playerIndex = state.players.findIndex((p) => p.id === playerId);
      commit('SET_PLAYER_SCORE_META', { playerIndex, scoreId, meta });
    },
  },
  mutations: {
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
    SET_PLAYER_SCORE(state, { playerIndex, scoreId, score }) {
      state.players[playerIndex].score[scoreId] = score;
    },
    SET_PLAYER_SCORE_META(state, { playerIndex, scoreId, meta }) {
      state.players[playerIndex].score[scoreId].meta = meta;
    },
  },
};
