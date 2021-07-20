<template>
  <div class="game">
    <el-empty description="No active game" />

    <el-button type="primary" @click="toggleVisible">Start new Game</el-button>
  </div>

  <bottom-sheet :visible="visible" @close="setVisible(false)">
    <div class="game__container">
      <div class="game__main">
        <player-selector />
        <expansion-selector />
        <!--
          players
          extensions:
            - WonderPack
            - Leaders
            - Cities
            - Babel - Tower
            - Babel - Great Projects
            - Armada (not owned atm)
        -->
      </div>
      <div class="game__footer">
        <el-button type="primary" style="width: 100%">Start</el-button>
      </div>
    </div>
  </bottom-sheet>
</template>

<script>
import { ref } from 'vue';
import BottomSheet from '@/components/BottomSheet.vue';
import ExpansionSelector from '@/components/ExpansionSelector.vue';
import PlayerSelector from '@/components/PlayerSelector.vue';

export default {
  name: 'Game',
  components: {
    BottomSheet,
    ExpansionSelector,
    PlayerSelector,
  },
  setup() {
    const visible = ref(false);
    function setVisible(val) {
      visible.value = val;
    }
    function toggleVisible() {
      visible.value = !visible.value;
    }

    return {
      visible,
      setVisible,
      toggleVisible,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../theme/variables';

.game {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .el-empty {
    padding-top: 0;
  }

  &__container {
    position: relative;
    height: 100%;
    padding: $--main-padding;
    padding-bottom: $--main-padding + 40px;
    box-sizing: border-box;
  }
  &__footer {
    position: absolute;
    bottom: 0;
    left: $--main-padding;
    right: $--main-padding;
    border: none;
  }

  &__main {
    height: 100%;
    display: flex;
    flex-direction: column;

    > div {
      flex: 1 1 auto;
    }
  }
}
</style>
