import { useStore } from 'vuex';

export const usePlayer = () => {
  const store = useStore();

  return {
    getPlayerName: (id) => {
      return store.getters['players/player'](id).name;
    },
  };
};
