<template>
  <h1>Score</h1>

  <el-table
    border
    :data="scoreTableRows"
    :row-style="getRowBg"
    :class="{ 'game--scoresVisible': scoresVisible }"
    @cell-click="cellClick"
    ref="tableRef"
  >
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
      <template #default="{ row, column }">
        <div
          :class="{
            game__cell: true,
            'game__cell--active': row.no === selectedCell.row && column.no === selectedCell.col,
          }"
          :id="`game-table-cell-${row.no}-${column.no}`"
        >
          {{ row[`player-${player.id}`] }}
        </div>
      </template>
    </el-table-column>
  </el-table>

  <div class="game__btn">
    <game-result v-model="scoresVisible" />
    <!-- <el-button type="primary" icon="el-icon-share">Submit Score</el-button> -->
  </div>

  <keyboard
    v-model:visible="showKeyboard"
    v-model:value="currentValue"
    :score="SCORES[selectedScoreId]"
    @nextCell="nextCell"
    @update:meta="updateScoreMeta"
  />
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

import Keyboard from '@/components/Keyboard.vue';
import GameResult from '@/components/GameResult.vue';

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
const showKeyboard = ref(false);
const tableRef = ref(undefined);
const colIcon = ref(50);
const colWidth = ref(0);

function getRowBg({ row }) {
  return `background-color: ${row.category.bg};color: ${row.category.color}`;
}
//#endregion

//#region Table Events
const selectedCell = ref({
  row: undefined,
  col: undefined,
});
const selectedPlayer = computed(() => store.state.match.players[selectedCell.value.col - 1]);
const selectedScoreId = computed(() => scoreTableRows.value[selectedCell.value.row - 1]?.category.id);
const currentValue = computed({
  get: () => {
    if (selectedPlayer.value) {
      return selectedPlayer.value.score[selectedScoreId.value];
    } else {
      return { score: 0 };
    }
  },
  set: (score) => {
    store.dispatch('match/setPlayerScore', {
      playerId: selectedPlayer.value.id,
      scoreId: selectedScoreId.value,
      score,
    });
  },
});

function updateScoreMeta(meta) {
  store.dispatch('match/setPlayerScoreMeta', {
    playerId: selectedPlayer.value.id,
    scoreId: selectedScoreId.value,
    meta,
  });
}
function cellClick(row, col) {
  if (col.no === 0 || row.no === undefined) {
    selectedCell.value.row = undefined;
    selectedCell.value.col = undefined;
  } else {
    selectedCell.value.row = row.no;
    selectedCell.value.col = col.no;

    showKeyboard.value = true;
  }
}
function nextCell() {
  if (selectedCell.value.col === players.value.length) {
    if (selectedCell.value.row === scoreIds.value.length) {
      showKeyboard.value = false;
      selectedCell.value.row = undefined;
      selectedCell.value.col = undefined;
    } else {
      selectedCell.value.col = 1;
      selectedCell.value.row++;
    }
    // Set scroll of table to left, otherwise 1st cell might not be scrolled into view
    tableRef.value.$el.querySelector('.el-table__body-wrapper').scrollLeft = 0;
  } else {
    selectedCell.value.col++;
  }
  if (selectedCell.value.row && selectedCell.value.col) {
    tableRef.value.$el
      .querySelector(`#game-table-cell-${selectedCell.value.row}-${selectedCell.value.col}`)
      .scrollIntoView();
  }
}
//#endregion

//#region Score
const scoresVisible = ref(false);
// function revealScore() {
//   scoresVisible.value = true;
// }
const scoreTableRows = computed(() => {
  const score = scoreIds.value.map((scoreId, i) => {
    const row = {
      category: SCORES[scoreId],
      no: i + 1,
    };
    players.value.forEach((player) => {
      row[`player-${player.id}`] = player.score[scoreId].score;
    });

    return row;
  });
  const total = {
    category: SCORES.TOTAL,
  };
  players.value.forEach((player) => {
    total[`player-${player.id}`] = player.total;
  });

  if (!scoresVisible.value) {
    return score;
  } else {
    return [...score, total];
  }
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
    > .el-button {
      @include flushBody();
    }
  }

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
  }
  &--scoresVisible {
    .el-table {
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
}
</style>
