<template>
  <div class="stats">
    <h1>Stats</h1>

    <p>Counter: {{ test }}</p>
  </div>
</template>

<script>
import useStore from '@/store';

export default {
  name: 'Stats',
  components: {},
  setup() {
    const store = useStore();

    store.increment();

    return {
      test: store.counter,
    };
  },
};
</script>
