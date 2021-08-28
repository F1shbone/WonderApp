<template>
  <h1>Score</h1>

  <el-table border :data="scoreTableRows" :row-style="getRowBg" @cell-click="cellClick" ref="tableRef">
    <el-table-column fixed label="" :width="colIcon">
      <template #default="{ row }">
        <div class="game__rowIcon" v-html="row.category.icon" />
      </template>
    </el-table-column>
    <el-table-column
      v-for="player in players"
      :key="`player-${player.id}`"
      :prop="`player-${player.id}`"
      :label="getPlayerName(player.id)"
      :width="colWidth"
    >
      <template #default="{ row, column }"
        ><div
          :class="{
            game__cell: true,
            'game__cell--active': row.no === activeCell.row && column.no === activeCell.col,
          }"
        >
          {{ row[`player-${player.id}`] }}
        </div></template
      >
    </el-table-column>
  </el-table>

  <div class="game__btn">
    <el-button type="primary" icon="el-icon-share">Submit Score</el-button>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

import * as SCORES from '@/store/gameInfo/score';

const store = useStore();

//#region Match
const players = computed(() => store.state.match.players);
const scoreIds = computed(() => store.state.match.scoreIds);

function getPlayerName(id) {
  return store.getters['match/playerFull'](id).name;
}
//#endregion

//#region Table
const tableRef = ref(undefined);
const colIcon = ref(50);
const colWidth = ref(0);
// useResizeObserver(tableRef, (entries) => {
//   const width = entries[0].contentRect.width - colIcon.value;
//   colWidth.value = width / players.value.length;
//   if (colWidth.value < 90) colWidth.value = 90;
//   // Update table
//   tableRef.value.doLayout();
// });
function getRowBg({ row }) {
  return `background-color: ${row.category.bg};color: ${row.category.color}`;
}
//#endregion

//#region Table Events
const activeCell = ref({
  row: undefined,
  col: undefined,
});
function cellClick(row, col) {
  if (col.no === 0 || row.no === undefined) {
    activeCell.value.row = undefined;
    activeCell.value.col = undefined;
  } else {
    activeCell.value.row = row.no;
    activeCell.value.col = col.no;

    // TODO: remove test code:
    // const scoreId = scoreTableRows.value[activeCell.value.row - 1].category.id;
    // const newVal = Math.floor(Math.random() * (10 - 1) + 1);
    // matchStore.players[activeCell.value.col - 1].score[scoreId] = newVal;
  }
}
//#endregion

//#region Score
const scoreTableRows = computed(() => {
  const score = scoreIds.value.map((scoreId, i) => {
    const row = {
      category: SCORES[scoreId],
      no: i + 1,
    };
    players.value.forEach((player) => {
      // console.log(player.score[scoreId]);
      row[`player-${player.id}`] = player.score[scoreId];
    });

    return row;
  });
  const total = {
    category: SCORES.TOTAL,
  };
  players.value.forEach((player) => {
    total[`player-${player.id}`] = player.total;
  });

  return [...score, total];
});
//#endregion
</script>

<style lang="scss">
@import '../theme/variables';
@import '../theme/mixins';

.game {
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

    &--active {
      box-shadow: inset 0 0 5px rgb(0 0 0 / 75%);
    }
  }

  &__btn {
    margin-top: 1rem;
    // iOS margin-bottom hack
    // margin-bottom gets collapsed since it's the last margin on page
    &::after {
      content: '';
      display: block;
      height: 1rem;
    }
    .el-button {
      @include flushBody();
    }
  }

  .el-table {
    @include flushBody();

    &__body tr.hover-row > td,
    &__body tr.hover-row.current-row > td {
      background-color: initial;
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
  }
}
</style>
