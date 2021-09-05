export default {
  namespaced: true,
  state() {
    return {
      results: [
        {
          label: 'Match 2',
          date: 'Fri Sep 03 2021 01:19:28 GMT+0200 (Central European Summer Time)',
          expansionIds: ['BASE', 'WONDER_PACK', 'LEADERS'],
          scoreIds: ['WONDER', 'COINS', 'MILITARY', 'CIVIC', 'COMMERCIAL', 'SCIENTIFIC', 'GUILDS', 'LEADER'],
          players: [
            {
              id: 3,
              wonderId: 'GIZA',
              score: {
                WONDER: { score: 2 },
                COINS: { score: 1 },
                MILITARY: { score: 13 },
                CIVIC: { score: 20 },
                COMMERCIAL: { score: 0 },
                SCIENTIFIC: { score: 5, meta: { aristotle: false, tablet: 0, cog: 0, compass: 0 } },
                GUILDS: { score: 12 },
                LEADER: { score: 15 },
              },
              total: 68,
            },
            {
              id: 2,
              wonderId: 'EPHESUS',
              score: {
                WONDER: { score: 10 },
                COINS: { score: 4 },
                MILITARY: { score: 2 },
                CIVIC: { score: 26 },
                COMMERCIAL: { score: 0 },
                SCIENTIFIC: { score: 0, meta: { aristotle: false, tablet: 0, cog: 0, compass: 0 } },
                GUILDS: { score: 4 },
                LEADER: { score: 0 },
              },
              total: 46,
            },
            {
              id: 4,
              wonderId: 'ALEXANDRIA',
              score: {
                WONDER: { score: 10 },
                COINS: { score: 4 },
                MILITARY: { score: -4 },
                CIVIC: { score: 19 },
                COMMERCIAL: { score: 5 },
                SCIENTIFIC: { score: 10, meta: { aristotle: false, tablet: 0, cog: 0, compass: 0 } },
                GUILDS: { score: 0 },
                LEADER: { score: 13 },
              },
              total: 57,
            },
            {
              id: 1,
              wonderId: 'BABYLON',
              score: {
                WONDER: { score: 0 },
                COINS: { score: 1 },
                MILITARY: { score: 3 },
                CIVIC: { score: 0 },
                COMMERCIAL: { score: 0 },
                SCIENTIFIC: { score: 50, meta: { aristotle: false, tablet: 0, cog: 0, compass: 0 } },
                GUILDS: { score: 4 },
                LEADER: { score: 3 },
              },
              total: 61,
            },
            {
              id: 5,
              wonderId: 'HALICARNASSUS',
              score: {
                WONDER: { score: 4 },
                COINS: { score: 1 },
                MILITARY: { score: 12 },
                CIVIC: { score: 10 },
                COMMERCIAL: { score: 0 },
                SCIENTIFIC: { score: 10, meta: { aristotle: false, tablet: 0, cog: 0, compass: 0 } },
                GUILDS: { score: 6 },
                LEADER: { score: 0 },
              },
              total: 42,
            },
          ],
        },
        {
          label: 'Match 1',
          date: 'Fri Sep 03 2021 01:09:28 GMT+0200 (Central European Summer Time)',
          expansionIds: ['BASE', 'WONDER_PACK', 'LEADERS', 'CITIES'],
          scoreIds: ['WONDER', 'COINS', 'MILITARY', 'CIVIC', 'COMMERCIAL', 'SCIENTIFIC', 'GUILDS', 'LEADER', 'CITY'],
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
        scoreIds: rootState.match.scoreIds,
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
