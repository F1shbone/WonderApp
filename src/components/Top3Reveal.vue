<template>
  <div class="top3reveal__deck">
    <div
      v-for="(player, i) in top3"
      :key="`player-${String(i)}`"
      :class="`top3reveal__card top3reveal--${Number(i) + 1}`"
    >
      <div class="top3reveal__flip">
        <img class="top3reveal__medal" :src="getMedal(Number(i) + 1)" />
        <h4>{{ getPlayerName(player.id) }}</h4>
        <p>{{ player.total }}<br />Points</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import createConfetti from 'canvas-confetti';

import GoldMedal from '../assets/medal__gold.svg';
import SilverMedal from '../assets/medal__silver.svg';
import BronzeMedal from '../assets/medal__bronze.svg';

const store = useStore();

const props = defineProps({
  players: {
    required: true,
    type: Array,
  },
});

//#region life-cycle
let timerId;
onMounted(() => {
  timerId = setTimeout(createConfetti, 6000);
});
onBeforeUnmount(() => {
  if (timerId) {
    window.clearTimeout(timerId);
  }
});
//#endregion

const top3 = computed(() => {
  return props.players
    .slice(0)
    .sort((a, b) => b.total - a.total)
    .slice(0, 3);
  //
});
const getMedal = (index) => {
  switch (index) {
    case 1:
      return GoldMedal;
    case 2:
      return SilverMedal;
    case 3:
      return BronzeMedal;
  }
};
const getPlayerName = (index) => {
  return store.getters['players/player'](index).name;
};
</script>

<style lang="scss">
@import '../theme/variables';

.top3reveal {
  &__deck {
    display: flex;
    align-items: center;
  }
  &__card {
    flex: 1 1 33.3333334%;
    order: var(--order);
    padding: $--card-padding;
    border: 1px solid $--card-border-color;
    border-radius: $--card-border-radius;
    background: $--background-color-base;
    box-shadow: $--box-shadow-base;
    margin-left: var(--margin-left);
    margin-right: var(--margin-right);
    z-index: var(--z-index);
    perspective: 1000px;
  }
  &__flip {
    height: var(--height);
    padding-top: var(--padding);
    padding-bottom: var(--padding);
    box-sizing: border-box;
    text-align: center;
    // flip animation
    transform: rotateY(180deg);
    transform-style: preserve-3d;
    animation: flip;
    animation-timing-function: ease-in-out;
    animation-duration: 0.8s;
    animation-iteration-count: 1;
    animation-delay: var(--delay);
    animation-fill-mode: forwards;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;

    @keyframes flip {
      0% {
        transform: rotateY(180deg);
      }
      100% {
        transform: rotateY(0);
      }
    }
  }
  &__medal {
    height: 3.75rem;
  }

  &--1 {
    --order: 2;
    --margin-left: 0;
    --margin-right: 0;
    // --padding: calc(#{$--card-padding} + 1.75rem);
    --padding: 1.75rem;
    --z-index: 10;
    --height: 14rem;
    --delay: 5.5s;
  }
  &--2 {
    --order: 1;
    --margin-left: 0;
    --margin-right: -1rem;
    --padding: 0;
    --z-index: initial;
    --height: 10.5rem;
    --delay: 3s;
  }
  &--3 {
    --order: 3;
    --margin-left: -1rem;
    --margin-right: 0;
    --padding: 0;
    --z-index: initial;
    --height: 10.5rem;
    --delay: 0.5s;
  }
  //
}
</style>
