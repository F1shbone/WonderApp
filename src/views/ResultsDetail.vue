<template>
  <div class="resultsDetail">
    <!-- <h1>Results Detail</h1> -->
    <div class="resultsDetail__selector">
      <el-radio-group v-model="view" size="small">
        <el-radio-button label="Overview" />
        <el-radio-button label="Details" />
      </el-radio-group>
    </div>

    <!-- <pre><code>{{result}}</code></pre> -->
    <!-- <results /> -->
    <top3-reveal v-if="view === 'Overview'" :players="result.players" />
    <match-scores
      :players="result.players"
      :scoreIds="result.scoreIds"
      :hideTop3="view === 'Overview'"
      :hideDetail="view === 'Overview'"
    />

    <hr />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

import Top3Reveal from '@/components/Top3Reveal.vue';
import MatchScores from '@/components/MatchScores.vue';

const store = useStore();
const { params } = useRoute();
const result = computed(() => store.state.results.results[params.id]);

const view = ref('Overview');
// const goBack = () => {
//   //
// };
</script>

<style lang="scss">
.resultsDetail {
  &__selector {
    display: flex;
    margin-bottom: 1rem;
    justify-content: center;

    .el-radio-button__inner {
      width: 5.25rem;
    }
  }
}
</style>
