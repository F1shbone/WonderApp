<template>
  <div class="playerSelector">
    <h2>Players</h2>
    <div>
      <el-checkbox-button
        v-for="(player, id) in players"
        :key="id"
        :label="id"
        :checked="player.active"
        @input="toggleActive(id)"
        >{{ player.name }}</el-checkbox-button
      >
    </div>
  </div>
</template>

<script>
import { useStore as usePlayersStore } from '@/store/players';

export default {
  setup() {
    const { players, toggle } = usePlayersStore();

    return { players, toggleActive: toggle };
  },
};
</script>

<style lang="scss">
@import '../theme/variables';

.playerSelector {
  h2 {
    margin-top: 0;
    margin-bottom: 0.5rem;

    small {
      font-size: 14px;
      color: $--color-text-secondary;
    }
  }
  .el-checkbox-button {
    padding: 0.25rem;
    &__inner {
      border-left: 1px solid $--border-color-base;
      border-radius: $--border-radius-base !important;
    }
  }
}
</style>
