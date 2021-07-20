<template>
  <div class="game">
    <el-empty description="No active game" />

    <el-button type="primary" @click="setVisible(true)">Start new Game</el-button>
  </div>

  <bottom-sheet :visible="visible" @close="close">
    <div class="game__container">
      <!-- step 1: -->
      <div class="game__main" v-if="step === 'settings'">
        <player-selector />
        <expansion-selector />
      </div>
      <!-- step 2: -->
      <div class="game__main" v-if="step === 'confirm'">
        <player-list />
        <!-- playerlist -->
        <!--   - change order -->
        <!--   - reroll wonder -->
      </div>
      <div class="game__footer">
        <el-button type="primary" @click="start" style="width: 100%">Start</el-button>
      </div>
    </div>
  </bottom-sheet>
</template>

<script>
import { ref } from 'vue';
import { useStore as useExpansionsStore } from '@/store/expansions';
import { useStore as usePlayersStore } from '@/store/players';

import BottomSheet from '@/components/BottomSheet.vue';
import ExpansionSelector from '@/components/ExpansionSelector.vue';
import PlayerSelector from '@/components/PlayerSelector.vue';
import PlayerList from '@/components/PlayerList.vue';

export default {
  name: 'Game',
  components: {
    BottomSheet,
    ExpansionSelector,
    PlayerSelector,
    PlayerList,
  },
  setup() {
    const playerStore = usePlayersStore();
    const expansionStore = useExpansionsStore();

    const step = ref('settings'); // possible values: 'settings', 'confirm'
    function start() {
      if (step.value === 'settings') {
        step.value = 'confirm';
        // Generate Game Store
      } else {
        console.log('Go');
        close();
      }
    }

    const visible = ref(false);
    function setVisible(val) {
      visible.value = val;
    }
    function close() {
      setVisible(false);
      playerStore.reset();
      expansionStore.reset();
      step.value = 'settings';
    }

    return {
      visible,
      setVisible,
      close,
      step,
      start,
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
