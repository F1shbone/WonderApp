<template>
  <div class="results">
    <!-- <el-page-header @back="goBack" content="Results Detail"></el-page-header> -->
    <h1>Results Detail</h1>

    <!-- <pre><code>{{result}}</code></pre> -->
    <!-- <results /> -->
    <top3-reveal :players="result.players" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

// import Results from '@/components/Results.vue';
import Top3Reveal from '@/components/Top3Reveal.vue';

const store = useStore();
const { params } = useRoute();
const result = computed(() => store.state.results.results[params.id]);

// const goBack = () => {
//   //
// };
</script>
