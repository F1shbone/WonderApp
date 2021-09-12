<template>
  <div>
    <h1>Results List</h1>

    <ul class="results-list">
      <li v-for="(result, i) in results" :key="`result-${String(i)}`">
        <router-link :to="`/results/${String(i)}`">
          <el-card>
            <template #header>
              <h4>
                {{ convertUTCToDateString(result.date) }}
                <small class="text-secondary">{{ convertUTCToTimeString(result.date) }}</small>
              </h4>
              <div class="results-list__detail">
                <h4>
                  Players
                  <small class="text-secondary">{{ result.players.length }}</small>
                </h4>
                <h4>
                  Extensions
                  <small class="text-secondary">{{ result.expansionIds.length }}</small>
                </h4>
              </div>
            </template>
          </el-card>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { convertUTCToDateString, convertUTCToTimeString } from '@/utils/date';

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
  > li + li {
    margin-top: 0.5rem;
  }
  h4 {
    margin-top: 0;
    margin-bottom: 0;
  }
  small {
    display: block;
    padding-top: 0.5rem;
  }
  a {
    text-decoration: none;
  }

  .el-card__header {
    display: flex;
    align-items: center;

    > * {
      flex: 1 1 auto;
      &:first-child {
        flex-basis: 100%;
      }
    }
  }
  .el-card__body {
    display: none;
  }

  &__detail {
    display: flex;
    text-align: center;
    > * + * {
      margin-left: $--card-padding;
      padding-left: $--card-padding;
      border-left: 1px solid $--card-border-color;
    }
  }
}
</style>
