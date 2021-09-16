import { v4 } from 'uuid';
import { useFireStore } from '../../firebase';

export default {
  namespaced: true,
  state() {
    return {
      $initialized: false,
      results: [],
    };
  },
  getters: {},
  actions: {
    async initFromFirestore({ commit }) {
      const { getResults } = useFireStore();
      commit('RESET_RESULTS');
      const results = await getResults();
      for (const resultId in results) {
        if (!Object.prototype.hasOwnProperty.call(results, resultId)) continue;
        results[resultId].date = new Date(results[resultId].date.seconds * 1000);
        commit('ADD_RESULT', results[resultId]);
      }
      commit('INITIALIZED');
    },
    async addMatch({ commit, state, rootState }) {
      const { addResult } = useFireStore();
      const players = rootState.match.players.map((player) => {
        return JSON.parse(
          JSON.stringify({
            ...player,
            total: Object.values(player.score).reduce((acc, val) => (acc += val.score), 0),
          })
        );
      });
      const result = {
        label: `Match ${state.results.length + 1}`,
        date: rootState.match.date,
        scoreIds: rootState.match.scoreIds,
        expansionIds: rootState.match.expansionIds,
        players,
      };

      await addResult(v4(), result);
      commit('ADD_RESULT', result);

      return state.results.length - 1;
    },
  },
  mutations: {
    INITIALIZED(state) {
      state.$initialized = true;
    },
    RESET_RESULTS(state) {
      state.results = [];
    },
    ADD_RESULT(state, result) {
      state.results.splice(0, 0, result);
    },
  },
};
