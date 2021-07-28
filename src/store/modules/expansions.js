import { ARMADA, BABEL_PROJECT, BABEL_TOWER, BASE, CITIES, LEADERS, WONDER_PACK } from '../gameInfo/expansions';

export default {
  namespaced: true,
  state() {
    return {
      [BASE.id]: {
        id: BASE.id,
        label: BASE.label,
        wonders: BASE.wonders.map(({ id }) => id),
        scores: BASE.score.map(({ id }) => id),
        owned: true,
      },
      [LEADERS.id]: {
        id: LEADERS.id,
        label: LEADERS.label,
        wonders: LEADERS.wonders.map(({ id }) => id),
        scores: LEADERS.score.map(({ id }) => id),
        owned: true,
      },
      [CITIES.id]: {
        id: CITIES.id,
        label: CITIES.label,
        wonders: CITIES.wonders.map(({ id }) => id),
        scores: CITIES.score.map(({ id }) => id),
        owned: true,
      },
      [WONDER_PACK.id]: {
        id: WONDER_PACK.id,
        label: WONDER_PACK.label,
        wonders: WONDER_PACK.wonders.map(({ id }) => id),
        scores: WONDER_PACK.score.map(({ id }) => id),
        owned: true,
      },
      [BABEL_TOWER.id]: {
        id: BABEL_TOWER.id,
        label: BABEL_TOWER.label,
        wonders: BABEL_TOWER.wonders.map(({ id }) => id),
        scores: BABEL_TOWER.score.map(({ id }) => id),
        owned: true,
      },
      [BABEL_PROJECT.id]: {
        id: BABEL_PROJECT.id,
        label: BABEL_PROJECT.label,
        wonders: BABEL_PROJECT.wonders.map(({ id }) => id),
        scores: BABEL_PROJECT.score.map(({ id }) => id),
        owned: true,
      },
      [ARMADA.id]: {
        id: ARMADA.id,
        label: ARMADA.label,
        wonders: ARMADA.wonders.map(({ id }) => id),
        scores: ARMADA.score.map(({ id }) => id),
        owned: false,
      },
    };
  },
  getters: {
    expansions: (state) => [
      state[BASE.id],
      state[WONDER_PACK.id],
      state[LEADERS.id],
      state[CITIES.id],
      state[BABEL_TOWER.id],
      state[BABEL_PROJECT.id],
      state[ARMADA.id],
    ],
    ownedExpansions(state, { expansions }) {
      return expansions.filter((e) => e.owned);
    },
    wonders: () => (expansions) =>
      expansions.reduce((wonders, expansion) => {
        wonders.push(...expansion.wonders);
        return wonders;
      }, []),
    scores: () => (expansions) =>
      expansions.reduce((scores, expansion) => {
        scores.push(...expansion.scores);
        return scores;
      }, []),
  },
  actions: {
    toggleOwned({ commit }, { id }) {
      commit('TOGGLE_OWNED', id);
    },
  },
  mutations: {
    TOGGLE_OWNED(state, id) {
      state[id].owned = !state[id].owned;
    },
  },
};
