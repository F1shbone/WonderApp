import { ARMADA, BABEL_PROJECT, BABEL_TOWER, BASE, CITIES, LEADERS, WONDER_PACK } from '../gameInfo/expansions';
import * as WONDERS from '../gameInfo/wonders';
import { useFirebase } from '../../firebase/';

export default {
  namespaced: true,
  state() {
    return {
      [BASE.id]: {
        id: BASE.id,
        label: BASE.label,
        wonders: BASE.wonders.map(({ id }) => id),
        scores: BASE.score.map(({ id }) => id),
        owned: false,
      },
      [LEADERS.id]: {
        id: LEADERS.id,
        label: LEADERS.label,
        wonders: LEADERS.wonders.map(({ id }) => id),
        scores: LEADERS.score.map(({ id }) => id),
        owned: false,
      },
      [CITIES.id]: {
        id: CITIES.id,
        label: CITIES.label,
        wonders: CITIES.wonders.map(({ id }) => id),
        scores: CITIES.score.map(({ id }) => id),
        owned: false,
      },
      [WONDER_PACK.id]: {
        id: WONDER_PACK.id,
        label: WONDER_PACK.label,
        wonders: WONDER_PACK.wonders.map(({ id }) => id),
        scores: WONDER_PACK.score.map(({ id }) => id),
        owned: false,
      },
      [BABEL_TOWER.id]: {
        id: BABEL_TOWER.id,
        label: BABEL_TOWER.label,
        wonders: BABEL_TOWER.wonders.map(({ id }) => id),
        scores: BABEL_TOWER.score.map(({ id }) => id),
        owned: false,
      },
      [BABEL_PROJECT.id]: {
        id: BABEL_PROJECT.id,
        label: BABEL_PROJECT.label,
        wonders: BABEL_PROJECT.wonders.map(({ id }) => id),
        scores: BABEL_PROJECT.score.map(({ id }) => id),
        owned: false,
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
    wonders: (state) => (expansionIds) =>
      expansionIds.reduce((wonders, id) => {
        wonders.push(...state[id].wonders);
        return wonders;
      }, []),
    wonder: () => (wonderId) => {
      return WONDERS[wonderId];
    },
    scores: (state) => (expansionIds) =>
      expansionIds.reduce((scores, id) => {
        scores.push(...state[id].scores);
        return scores;
      }, []),
  },
  actions: {
    async initFromFirestore({ commit }) {
      const { store } = useFirebase();

      const expansions = await store.getExpansions();
      for (const id in expansions) {
        if (!Object.prototype.hasOwnProperty.call(expansions, id)) continue;

        commit('SET_OWNED', { id, owned: expansions[id].owned });
      }
    },
    async toggleOwned({ commit, state }, { id }) {
      const { store } = useFirebase();
      const old = state[id].owned;

      commit('TOGGLE_OWNED', id);
      try {
        await store.setExpansionOwned(id, {
          owned: !old,
        });
      } catch {
        commit('SET_OWNED', { id, owned: old });
      }
    },
  },
  mutations: {
    SET_OWNED(state, { id, owned }) {
      state[id].owned = owned;
    },
    TOGGLE_OWNED(state, id) {
      state[id].owned = !state[id].owned;
    },
  },
};
