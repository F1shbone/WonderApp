export default {
  namespaced: true,
  state() {
    return {
      results: [
        {
          date: 'Fri Sep 03 2021 01:09:28 GMT+0200 (Central European Summer Time)',
          expansionIds: ['BASE', 'WONDER_PACK', 'LEADERS', 'CITIES'],
          players: [
            {
              id: 3,
              wonderId: 'STONEHENGE',
              score: {
                WONDER: { score: 1 },
                COINS: { score: 0 },
                MILITARY: { score: 0 },
                CIVIC: { score: 0 },
                COMMERCIAL: { score: 0 },
                SCIENTIFIC: { score: 0, meta: { aristotle: false, tablet: 0, cog: 0, compass: 0 } },
                GUILDS: { score: 0 },
                LEADER: { score: 0 },
                CITY: { score: 0 },
              },
              total: 1,
            },
            {
              id: 1,
              wonderId: 'HALICARNASSUS',
              score: {
                WONDER: { score: 2 },
                COINS: { score: 0 },
                MILITARY: { score: 0 },
                CIVIC: { score: 0 },
                COMMERCIAL: { score: 0 },
                SCIENTIFIC: { score: 0, meta: { aristotle: false, tablet: 0, cog: 0, compass: 0 } },
                GUILDS: { score: 0 },
                LEADER: { score: 0 },
                CITY: { score: 0 },
              },
              total: 2,
            },
            {
              id: 2,
              wonderId: 'MANNEKEN_PIS',
              score: {
                WONDER: { score: 3 },
                COINS: { score: 0 },
                MILITARY: { score: 0 },
                CIVIC: { score: 0 },
                COMMERCIAL: { score: 0 },
                SCIENTIFIC: { score: 0, meta: { aristotle: false, tablet: 0, cog: 0, compass: 0 } },
                GUILDS: { score: 0 },
                LEADER: { score: 0 },
                CITY: { score: 0 },
              },
              total: 3,
            },
          ],
        },
      ],
    };
  },
  getters: {},
  actions: {
    addMatch({ commit, state, rootState }) {
      const result = {
        date: rootState.match.date,
        expansionIds: rootState.match.expansionIds,
        players: JSON.parse(JSON.stringify(rootState.match.players)),
      };
      commit('ADD_RESULT', result);

      return state.results.length - 1;
    },
  },
  mutations: {
    ADD_RESULT(state, result) {
      state.results.push(result);
    },
  },
};
