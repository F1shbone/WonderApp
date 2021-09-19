import { useFireStore } from '../../firebase';

function getResultId(date) {
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  mm = (mm > 9 ? '' : '0') + mm;
  let dd = date.getDate();
  dd = (dd > 9 ? '' : '0') + dd;

  let hash = Math.random()
    .toString(36)
    .replace(/[^a-z0-9]+/g, '')
    .substr(0, 12);

  return `${yyyy}-${mm}-${dd}-${hash}`;
}

function placePlayers(a, b) {
  // 1st sort by total VP
  const total = b.total - a.total;
  if (total !== 0) return total;
  // 2nd if total VP are the same, sort by coin value
  const coins = b.score.COINS.score - a.score.COINS.score;
  if (coins !== 0) return coins;
  // 3rd if coin VP are the same, sort by +6 coin amount
  const coins6 = b.score.COINS.meta['+6'] - a.score.COINS.meta['+6'];
  if (coins6 !== 0) return coins6;
  // 4th if coin VP are the same, sort by +3 coin amount
  const coins3 = b.score.COINS.meta['+3'] - a.score.COINS.meta['+3'];
  if (coins3 !== 0) return coins3;
  // 5th if coin VP are the same, sort by +1 coin amount
  const coins1 = b.score.COINS.meta['+1'] - a.score.COINS.meta['+1'];
  return coins1;
}

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
      const players = rootState.match.players
        .map((player) => {
          return JSON.parse(
            JSON.stringify({
              ...player,
              total: Object.values(player.score).reduce((acc, val) => (acc += val.score), 0),
            })
          );
        })
        .sort(placePlayers);
      const result = {
        label: `Match ${state.results.length + 1}`,
        date: rootState.match.date,
        scoreIds: rootState.match.scoreIds,
        expansionIds: rootState.match.expansionIds,
        players,
      };

      await addResult(getResultId(result.date), result);
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
