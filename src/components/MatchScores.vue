<template>
  <div v-if="!hideDetail" class="matchScores__table">
    <el-table border :data="scoreTableRows" :row-style="getRowBg" ref="tableRef">
      <el-table-column fixed label="" :width="50">
        <template #default="{ row }">
          <div class="matchScores__rowIcon" v-html="row.category.icon" />
        </template>
      </el-table-column>
      <el-table-column
        v-for="player in playersFiltered"
        :key="`player-${player.id}`"
        :prop="`player-${player.id}`"
        :label="getPlayerName(player.id)"
        :width="colWidth"
      >
        <template #default="{ row }">
          <div class="matchScores__cell">
            {{ row[`player-${player.id}`] }}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <ul v-else class="matchScores__list">
    <li v-for="(player, i) in playersFiltered" :key="`player-${String(i)}`" class="matchScores__card">
      <h2>
        {{ Number(i) + (hideTop3 ? 4 : 1) }} <small>{{ getPlayerName(player.id) }}</small>
      </h2>
      <p>{{ player.total }} Points</p>
    </li>
  </ul>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

import * as SCORES from '@/store/gameInfo/score';

const store = useStore();

const props = defineProps({
  players: {
    required: true,
    type: Array,
  },
  scoreIds: {
    required: true,
    type: Array,
  },
  hideTop3: {
    type: Boolean,
    default: false,
  },
  hideDetail: {
    type: Boolean,
    default: false,
  },
});

const playersFiltered = computed(() =>
  props.hideTop3
    ? props.players
        .slice(0)
        .sort((a, b) => b.total - a.total)
        .slice(3)
    : props.players
);
const getPlayerName = (index) => {
  return store.getters['players/player'](index).name;
};

//#region Table
// TODO: can this be shared with GameActive.vue?
const tableRef = ref(undefined);
const colWidth = ref(0);

const scoreTableRows = computed(() => {
  const score = props.scoreIds.map((scoreId, i) => {
    const row = {
      category: SCORES[scoreId],
      no: i + 1,
    };
    playersFiltered.value.forEach((player) => {
      row[`player-${player.id}`] = player.score[scoreId].score;
    });

    return row;
  });

  const total = {
    category: SCORES.TOTAL,
  };
  playersFiltered.value.forEach((player) => {
    total[`player-${player.id}`] = player.total;
  });

  return [...score, total];
});
function getRowBg({ row }) {
  return `background-color: ${row.category.bg};color: ${row.category.color}`;
}
//#endregion
</script>

<style lang="scss">
@import '../theme/variables';
@import '../theme/mixins';

.matchScores {
  &__list {
    padding: 0;
    list-style-type: none;
  }

  &__card {
    display: flex;
    align-items: center;
    padding: $--card-padding;
    margin-bottom: 1rem;
    border: 1px solid $--card-border-color;
    border-radius: $--card-border-radius;
    background: $--background-color-base;
    box-shadow: $--box-shadow-base;

    h2 {
      flex: 1 1 50%;
      display: flex;
      margin: 0;
      justify-content: flex-start;
      align-items: center;
      > small {
        margin-left: 1.5rem;
        font-size: 1rem;
      }
    }
    p {
      flex: 1 1 50%;
      display: flex;
      justify-content: flex-end;
      margin: 0;
    }
  }

  &__table {
    .el-table {
      @include flushBody();

      &__body tr.hover-row > td,
      &__body tr.hover-row.current-row > td {
        background-color: initial;
      }

      th {
        text-align: center;
      }

      td,
      .cell {
        padding: 0 !important;
      }

      &__row td:first-child {
        color: $--body-color !important;
        background-color: $--body-bg !important;
      }

      &__body-wrapper,
      &__fixed-body-wrapper {
        tr:nth-last-child(2) td {
          border-bottom: 2px solid $--color-primary;
        }
        tr:last-child td {
          background-color: rgba($--color-primary, 0.5) !important;
        }
      }
    }
  }

  &__rowIcon {
    display: flex;
    align-content: center;
    justify-content: center;
    flex: 1 1 100%;

    svg {
      flex: 1 1 100%;
      max-width: 1.5rem;
      max-height: 1.5rem;
    }
  }

  &__cell {
    display: flex;
    justify-content: center;
    padding: 0.75rem;
  }
}
</style>
