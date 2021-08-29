<template>
  <bottom-sheet :modelValue="props.modelValue" @close="close">
    <div class="new-game__container">
      <div class="new-game__main">
        <!-- step 1: -->
        <template v-if="step === STEPS.ONE">
          <player-selector v-model="players" />
          <expansion-selector v-model="expansions" />
        </template>
        <!-- step 2: -->
        <template v-if="step === STEPS.TWO">
          <player-list v-model="players" @reroll="rerollWonder" />
        </template>
      </div>
      <div class="new-game__footer">
        <el-button type="primary" @click="start" style="width: 100%">Start</el-button>
      </div>
    </div>
  </bottom-sheet>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import { BASE } from '@/store/gameInfo/expansions';
import * as SCORES from '@/store/gameInfo/score';
import { ShuffleArray } from '@/utils/shuffleArray';

import BottomSheet from '@/components/BottomSheet.vue';
import ExpansionSelector from '@/components/ExpansionSelector.vue';
import PlayerSelector from '@/components/PlayerSelector.vue';
import PlayerList from '@/components/PlayerList.vue';
import match from '../store/modules/match';

const store = useStore();
const router = useRouter();

//#region v-model
const props = defineProps({
  modelValue: {
    type: Boolean,
  },
});
const emit = defineEmits(['update:modelValue']);

watchEffect(() => {
  if (props.modelValue) {
    players.value = initPlayers();
    expansions.value = initExpansions();
  }
});
//#endregion

//#region expansions
const expansions = ref([]);
function initExpansions() {
  return store.getters['expansions/ownedExpansions'].map((expansion) => ({
    id: expansion.id,
    label: expansion.label,
    value: expansion.id === BASE.id ? true : false,
  }));
}
const activeExpansionIds = computed(() => expansions.value.filter((e) => e.value).map((e) => e.id));
const activeScoreIds = computed(() => store.getters['expansions/scores'](activeExpansionIds.value));
//#endregion

//#region players
const players = ref([]);
function initPlayers() {
  console.log('init Players');
  return store.state.players.players.map((player) => ({
    id: player.id,
    label: player.name,
    value: false,
    score: {},
    wonderId: undefined,
  }));
}
//#endregion

//#region Wonders
const wonders = new Set();
function getRandomWonder() {
  const wonderIds = store.getters['expansions/wonders'](activeExpansionIds.value);
  let wonder = undefined;
  do {
    wonder = wonderIds[Math.floor(Math.random() * wonderIds.length)];
  } while (wonders.has(wonder));

  wonders.add(wonder);
  return wonder;
}
function rerollWonder(player) {
  const oldId = player.wonderId;
  player.wonderId = getRandomWonder();
  wonders.delete(oldId);
}
//#endregion

//#region BottomSheet
const STEPS = {
  ONE: 'step1',
  TWO: 'step2',
};
const step = ref(STEPS.ONE);

function initMatch() {
  // Shuffle player order
  players.value = ShuffleArray(players.value.filter((e) => e.value));
  players.value.forEach((player) => {
    // Init scores for selected expansion(s)
    activeScoreIds.value.forEach((scoreId) => {
      const score = SCORES[scoreId].getScore();
      player.score[scoreId] = score;
    });
    // Roll unique wonders for each player
    player.wonderId = getRandomWonder();
  });
}

async function start() {
  switch (step.value) {
    case STEPS.ONE: {
      initMatch();
      step.value = STEPS.TWO;
      return;
    }
    case STEPS.TWO: {
      store.registerModule('match', match);
      store.dispatch('match/init', {
        expansionIds: activeExpansionIds.value,
        scoreIds: activeScoreIds.value,
        players: players.value,
      });
      router.push({ path: '/game/active' });
      close();
      return;
    }
  }
}
function close() {
  emit('update:modelValue', false);
  step.value = STEPS.ONE;
  // Reset data
  expansions.value = initExpansions();
  players.value = initPlayers();
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
