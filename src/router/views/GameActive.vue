<template>
  <h1>Score</h1>

  <score-table
    flush
    selectable
    :tableData="score"
    :players="players"
    :selectedRow="selectedRow"
    :selectedCol="selectedCol"
    @selected="onCellSelected"
    ref="scoreTableRef"
  />

  <div class="game__btn">
    <el-button type="primary" icon="el-icon-trophy" @click="scoreMatch">Submit Score</el-button>
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
import { computed, ref, nextTick, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { useMatchScore } from '@/composables/useMatchScore';
import router from '@/router';

import { ElMessageBox } from 'element-plus';
import ScoreTable from '@/components/ScoreTable.vue';
import Keyboard from '@/components/Keyboard.vue';

import * as SCORES from '@/store/gameInfo/score';

const store = useStore();

//#region Match
const players = computed(() => store.state.match.players);
const scoreIds = computed(() => store.state.match.scoreIds);
//#endregion

//#region Table
const scoreTableRef = ref(undefined);
const selectedRow = ref(undefined);
const selectedCol = ref(undefined);

const selectedPlayer = computed(() => store.state.match.players[selectedCol.value - 1]);
const selectedScoreId = computed(() => score.value[selectedRow.value - 1]?.category.id);
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

function onCellSelected({ row, col }) {
  selectedRow.value = row;
  selectedCol.value = col;

  if (row !== undefined && col !== undefined) {
    showKeyboard.value = true;
  }
}
function nextCell() {
  if (selectedCol.value === players.value.length) {
    if (selectedRow.value === scoreIds.value.length) {
      showKeyboard.value = false;
      selectedRow.value = undefined;
      selectedCol.value = undefined;
    } else {
      selectedCol.value = 1;
      selectedRow.value++;
    }
    // Set scroll of table to left, otherwise 1st cell might not be scrolled into view
    scoreTableRef.value.scrollLeft();
  } else {
    selectedCol.value++;
  }
  if (selectedRow.value && selectedCol.value) {
    scoreTableRef.value.scrollIntoView();
  }
}
//#endregion

//#region Score
const showKeyboard = ref(false);
watchEffect(() => {
  if (!showKeyboard.value) {
    selectedRow.value = undefined;
    selectedCol.value = undefined;
  }
});
const { score } = useMatchScore({
  players,
  scoreIds,
});

async function scoreMatch() {
  if (store.hasModule('match')) {
    try {
      await ElMessageBox.confirm('If you score this match you can no longer make edits.', 'Are you sure?', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
        buttonSize: 'large',
      });
      await store.dispatch('results/addMatch');
      await router.replace('/results/0');
      await nextTick();
      store.unregisterModule('match');
    } catch (e) {
      console.warn(e);
      return;
    }
  }
}
function updateScoreMeta(meta) {
  store.dispatch('match/setPlayerScoreMeta', {
    playerId: selectedPlayer.value.id,
    scoreId: selectedScoreId.value,
    meta,
  });
}
//#endregion
</script>

<style lang="scss">
@import '../../theme/variables';
@import '../../theme/mixins';

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
      font-size: 1rem;
      @include flushBody();
    }
  }
}
</style>
