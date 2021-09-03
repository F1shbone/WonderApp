export default {
  namespaced: true,
  state() {
    return {
      results: [
        {
          label: 'Match 2',
          date: 'Fri Sep 03 2021 01:19:28 GMT+0200 (Central European Summer Time)',
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
              id: 4,
              wonderId: 'OLYMPIA',
              score: {
                WONDER: { score: 2 },
                COINS: { score: 10 },
                MILITARY: { score: 0 },
                CIVIC: { score: 0 },
                COMMERCIAL: { score: 0 },
                SCIENTIFIC: { score: 0, meta: { aristotle: false, tablet: 0, cog: 0, compass: 0 } },
                GUILDS: { score: 0 },
                LEADER: { score: 0 },
                CITY: { score: 0 },
              },
              total: 12,
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
        {
          label: 'Match 1',
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
  getters: {
    // list(state) {
    //   // return state.results;
    //   return state.results.reverse();
    //   // .map((e, i) => {
    //   //   e.label = `Match ${state.results.length - i}`;
    //   //   return e;
    //   // });
    // },
  },
  actions: {
    addMatch({ commit, state, rootState }) {
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
        expansionIds: rootState.match.expansionIds,
        players,
      };
      commit('ADD_RESULT', result);

      return state.results.length - 1;
    },
  },
  mutations: {
    ADD_RESULT(state, result) {
      state.results.splice(0, 0, result);
    },
  },
};
