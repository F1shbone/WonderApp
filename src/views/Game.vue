<template>
  <div class="game">
    <div class="game__empty" v-if="playerCount === 0">
      <el-empty description="No active game" />
    </div>

    <h1>Score:</h1>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore as useMatchStore } from '@/store/match';

export default {
  name: 'Game',
  components: {},
  setup() {
    const matchStore = useMatchStore();

    return { playerCount: computed(() => matchStore.playerCount) };
  },
};
</script>

<style lang="scss" scoped>
@import '../theme/variables';

.game {
  position: relative;
  height: 100%;

  &__empty {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $--body-bg;

    .el-empty {
      padding-top: 0;
    }
  }
}
</style>
