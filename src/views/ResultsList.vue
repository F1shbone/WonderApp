<template>
  <div>
    <h1>Results List</h1>

    <ul class="results-list">
      <li v-for="(result, i) in results" :key="`result-${i}`">
        <router-link :to="`/results/${i}`">
          <el-card full>
            <template #header>
              <h4>
                {{ result.label }}
                <br />
                <small class="text-secondary">{{ convertUTCToDateTimeString(result.date) }}</small>
              </h4>
            </template>
            <el-card-list flush>
              <el-card-list-item class="results-list__item">
                <span class="results-list__label">Players:</span>
                <span class="results-list__value">{{ result.players.length }}</span>
              </el-card-list-item>
              <el-card-list-item>
                <span class="results-list__label">Expansions:</span>
                <span class="results-list__value">{{ result.expansionIds.length }}</span>
              </el-card-list-item>
            </el-card-list>
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

import ElCard from '@/components/ElCard.vue';
import ElCardList from '@/components/ElCardList.vue';
import ElCardListItem from '@/components/ElCardListItem.vue';

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
    margin: 0;
  }
  a {
    text-decoration: none;
  }

  .el-card__body {
    padding-top: 0;
    padding-bottom: 0;
  }

  &__item {
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
