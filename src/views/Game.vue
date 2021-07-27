<template>
  <div class="game">
    <div class="game__empty" v-if="playerCount === 0">
      <el-empty description="No active game" />
    </div>

    <h1>Score:</h1>

    <!-- <p v-for="player in players" :key="player.id">{{ player.name }}</p> -->
    <el-table :data="score" :row-style="getRowBg">
      <!-- <el-table-column label="Date" width="180">
        <template #default="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row }}</span>
        </template>
      </el-table-column> -->
      <el-table-column fixed label="" width="50">
        <template #default="{ row }">
          <div class="game__rowIcon" v-html="row.category.icon" />
          <!-- <i :class="['game__rowIcon', row.category.icon]" /> -->
        </template>
      </el-table-column>
      <el-table-column
        v-for="player in players"
        :key="`player-${player.id}`"
        :prop="`player-${player.id}`"
        :label="player.name"
        width="90"
      />
    </el-table>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore as useMatchStore } from '@/store/match';

export default {
  name: 'Game',
  components: {},
  setup() {
    const matchStore = useMatchStore();
    // Wonder
    // Coins
    // Military
    // Blue
    // Yellow
    // Green
    // Purple
    // Black
    // Leader
    // Babel Tower
    // ---
    // Total
    const score = ref(
      matchStore.activeScores.map((score) => ({
        category: score,
        'player-0': 0,
        'player-1': 0,
        'player-2': 0,
        'player-3': 0,
        'player-4': 0,
      }))
    );

    function getRowBg({ row }) {
      return `background-color: ${row.category.bg};color: ${row.category.color}`;
    }

    return {
      score,
      playerCount: computed(() => matchStore.playerCount),
      players: computed(() => matchStore.players),
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
