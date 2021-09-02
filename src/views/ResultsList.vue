<template>
  <div>
    <h1>Results List</h1>

    <ul class="results-list">
      <li v-for="(result, i) in results" :key="`result-${i}`">
        <router-link :to="`/results/${i}`">
          <el-card>
            <template #header>
              <div class="card-header">
                <h4>
                  {{ result.label }}
                  <br />
                  <small class="text-secondary">{{ convertUTCToDateTimeString(result.date) }}</small>
                </h4>
                <!-- <el-descriptions-item label="Players:">{{ result.players.length }}</el-descriptions-item> -->
              </div>
            </template>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <span class="results-list__label">Players:</span>
                <span class="results-list__value">{{ result.players.length }}</span>
              </li>
              <li class="list-group-item">
                <span class="results-list__label">Expansions:</span>
                <span class="results-list__value">{{}}</span>
              </li>
            </ul>
          </el-card>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { convertUTCToDateTimeString } from '@/utils/date';

const store = useStore();
const results = computed(() => store.state.results.results);
</script>

<style lang="scss">
@import '../theme/variables';
@import '../theme/mixins';

.results-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  li + li {
    margin-top: 0.5rem;
  }
  h4 {
    margin: 0;
  }
  a {
    text-decoration: none;
  }

  .el-card__body {
    padding: 0.5rem 0;
  }

  .list-group-item {
    display: flex;
  }

  &__label {
    flex: 1 1 65%;
    font-weight: 700;
    font-size: 90%;
  }

  &__value {
    flex: 1 1 35%;
  }
}
</style>
