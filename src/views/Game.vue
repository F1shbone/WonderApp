<template>
  <div class="game">
    <div class="game__empty" v-if="playerCount === 0">
      <el-empty description="No active game" />
    </div>

    <h1>Score:</h1>

    <el-table :data="score" :row-style="getRowBg" ref="tableRef">
      <el-table-column fixed label="" :width="colIcon">
        <template #default="{ row }">
          <div class="game__rowIcon" v-html="row.category.icon" />
        </template>
      </el-table-column>
      <el-table-column
        v-for="player in players"
        :key="`player-${player.id}`"
        :prop="`player-${player.id}`"
        :label="player.name"
        :width="colWidth"
      />
    </el-table>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import { useStore as useMatchStore } from '@/store/match';

export default {
  name: 'Game',
  components: {},
  setup() {
    const matchStore = useMatchStore();

    const tableRef = ref(undefined);
    const colIcon = ref(50);
    const colWidth = ref(0);
    useResizeObserver(tableRef, (entries) => {
      let { width } = entries[0].contentRect;
      width -= colIcon.value;
      colWidth.value = width / playerCount.value;
      if (colWidth.value < 90) colWidth.value = 90;
      tableRef.value.doLayout();
    });

    const players = computed(() => matchStore.players);
    const playerCount = computed(() => matchStore.playerCount);
    const score = computed(() => {
      return matchStore.activeScores.map((category) => {
        const row = {
          category,
        };
        players.value.forEach((player) => {
          row[`player-${player.id}`] = player.score[category.id];
        });
        return row;
      });
    });

    function getRowBg({ row }) {
      return `background-color: ${row.category.bg};color: ${row.category.color}`;
    }

    return {
      tableRef,
      colIcon,
      colWidth,
      score,
      playerCount,
      players,
      getRowBg,
    };
  },
};
</script>

<style lang="scss">
@import '../theme/variables';
@import '../theme/mixins';

.game {
  position: relative;
  height: 100%;

  &__empty {
    position: absolute;
    top: 0;
    bottom: 0;
    left: -$--main-padding;
    right: -$--main-padding;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $--body-bg;
    z-index: $--z-index-empty;

    .el-empty {
      padding-top: 0;
    }
  }

  &__rowIcon {
    display: flex;
    align-content: center;
    justify-content: center;

    svg {
      flex: 1 1 100%;
      max-width: 1.5rem;
      max-height: 1.5rem;
    }
  }

  .el-table {
    @include flushBody();
    .cell {
      text-align: center;
    }

    &__row td:first-child {
      color: $--body-color;
      background-color: $--body-bg;
    }
  }
}
</style>
