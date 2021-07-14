import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'test',
  state: () => ({
    counter: 0,
  }),
  actions: {
    increment() {
      this.counter++;
    },
    randomizeCounter() {
      this.counter = Math.round(100 * Math.random());
    },
  },
});

export default useStore;
