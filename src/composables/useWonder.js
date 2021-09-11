import { useStore } from 'vuex';

export const useWonder = () => {
  const store = useStore();

  return {
    getWonderName: (id) => {
      return store.getters['expansions/wonder'](id).label.short;
    },
  };
};
