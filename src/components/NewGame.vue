<template>
  <bottom-sheet :visible="modelValue" @close="abort">
    <div class="new-game__container">
      <div class="new-game__main">
        <!-- step 1: -->
        <template v-if="step === 'settings'">
          <player-selector />
          <expansion-selector />
        </template>
        <!-- step 2: -->
        <template v-if="step === 'confirm'">
          <player-list :players="players" />
        </template>
      </div>
      <div class="new-game__footer">
        <el-button type="primary" @click="start" style="width: 100%">Start</el-button>
      </div>
    </div>
  </bottom-sheet>
</template>

<script>
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useStore as useExpansionsStore } from '@/store/expansions';
import { useStore as usePlayersStore } from '@/store/players';
import { useStore as useMatchStore } from '@/store/match';

import BottomSheet from '@/components/BottomSheet.vue';
import ExpansionSelector from '@/components/ExpansionSelector.vue';
import PlayerSelector from '@/components/PlayerSelector.vue';
import PlayerList from '@/components/PlayerList.vue';

export default {
  name: 'NewGame',
  components: {
    BottomSheet,
    ExpansionSelector,
    PlayerSelector,
    PlayerList,
  },
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    const playerStore = usePlayersStore();
    const expansionStore = useExpansionsStore();
    const matchStore = useMatchStore();

    //#region players
    const players = ref([]);
    //#endregion

    //#region BottomSheet
    const router = useRouter();
    watchEffect(() => {
      if (props.modelValue) {
        playerStore.resetActive();
        expansionStore.resetActive();
      }
    });
    // possible values: 'settings', 'confirm'
    const step = ref('settings');
    function start() {
      if (step.value === 'settings') {
        matchStore.initStore();
        players.value = matchStore.players;
        step.value = 'confirm';
      } else {
        close();
        matchStore.players = players.value;
        matchStore.ready = true;
        router.push({ name: 'Game' });
      }
    }

    function close() {
      emit('update:modelValue', false);
      step.value = 'settings';
    }
    function abort() {
      playerStore.resetActive();
      expansionStore.resetActive();
      close();
    }
    //#endregion

    return {
      abort,
      step,
      start,
      players,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../theme/variables';

.new-game {
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
