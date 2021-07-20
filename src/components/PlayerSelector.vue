<template>
  <div class="playerSelector">
    <h2>Players</h2>
    <div>
      <el-checkbox-button
        v-for="(player, id) in players"
        :key="id"
        :label="id"
        :checked="player.active"
        @input="toggleActive(player)"
        >{{ player.name }}</el-checkbox-button
      >
    </div>
  </div>
</template>

<script>
import { useStore as usePlayersStore } from '@/store/players';

export default {
  setup() {
    let { players } = usePlayersStore();

    players = players.map((e) => {
      return {
        ...e,
        active: false,
      };
    });

    function toggleActive(player) {
      player.active = !player.active;
    }
    return { players, toggleActive };
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
