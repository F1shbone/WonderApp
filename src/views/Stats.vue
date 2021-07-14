<template>
  <layout>
    <div class="stats">
      <h1>Stats</h1>

      <p>Counter: {{ test }}</p>
    </div>
  </layout>
</template>

<script>
// @ is an alias to /src
import Layout from '@/layouts/Base.vue';

import useStore from '@/store';

export default {
  name: 'Stats',
  components: {
    Layout,
  },
  setup() {
    const store = useStore();

    store.increment();

    return {
      test: store.counter,
    };
  },
};
</script>
