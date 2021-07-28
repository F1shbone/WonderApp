<template>
  <bottom-sheet :visible="props.modelValue" @close="abort">
    <div class="new-game__container">
      <div class="new-game__main">
        <!-- step 1: -->
        <template v-if="step === 'stage1'">
          <player-selector v-model="players" />
          <expansion-selector v-model="expansions" />
        </template>
        <!-- step 2: -->
        <template v-if="step === 'stage2'">
          <player-list v-model="players" />
        </template>
      </div>
      <div class="new-game__footer">
        <el-button type="primary" @click="start" style="width: 100%">Start</el-button>
      </div>
    </div>
  </bottom-sheet>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import { BASE } from '@/store/gameInfo/expansions';
import { ShuffleArray } from '@/utils/shuffleArray';

import BottomSheet from '@/components/BottomSheet.vue';
import ExpansionSelector from '@/components/ExpansionSelector.vue';
import PlayerSelector from '@/components/PlayerSelector.vue';
import PlayerList from '@/components/PlayerList.vue';

const store = useStore();
const router = useRouter();

//#region v-model
const props = defineProps({
  modelValue: {
    type: Boolean,
  },
});
const emit = defineEmits(['update:modelValue']);
//#endregion

//#region expansions
const expansions = ref(
  store.getters['expansions/ownedExpansions'].map((expansion) => ({
    id: expansion.id,
    label: expansion.label,
    value: expansion.id === BASE.id ? true : false,
  }))
);
const activeExpansionIds = computed(() => expansions.value.filter((e) => e.value).map((e) => e.id));
//#endregion

//#region players
const players = ref(
  store.state.players.players.map((player) => ({
    id: player.id,
    label: player.name,
    value: false,
    score: {},
    get total() {
      return Object.values(this.score).reduce((acc, val) => (acc += val), 0);
    },
    wonder: undefined,
  }))
);
// const wonders = ref([]);
function initPlayers() {
  // Shuffle player order
  players.value = ShuffleArray(players.value);
  // Init scores for selected expansion(s)
  const scoreIds = store.getters['expansions/scores'](activeExpansionIds.value);
  players.value.forEach((player) => {
    scoreIds.forEach((score) => (player.score[score] = 0));
  });
  // Roll unique wonders for each player
  const wonderIds = store.getters['expansions/wonders'](activeExpansionIds.value);
  console.log(wonderIds);
}
//#endregion

//#region BottomSheet
// possible values: 'stage1', 'stage2'
const step = ref('stage1');
function start() {
  switch (step.value) {
    case 'stage1': {
      initPlayers();
      // matchStore.initStore();
      // players.value = matchStore.players;
      step.value = 'stage2';
      break;
    }
    case 'stage2': {
      // matchStore.players = players.value;
      // matchStore.ready = true;
      router.push({ name: 'Game' });
      close();
      break;
    }
  }
}

function close() {
  emit('update:modelValue', false);
  step.value = 'settings';
}
function abort() {
  // playerStore.resetActive();
  // expansionStore.resetActive();
  close();
}
//#endregion
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
