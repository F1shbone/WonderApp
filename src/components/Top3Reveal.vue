<template>
  <div class="top3reveal__deck">
    <div
      v-for="(player, i) in top3"
      :key="`player-${String(i)}`"
      :class="`top3reveal__card top3reveal--${Number(i) + 1}`"
    >
      <div class="top3reveal__flip">
        <div class="top3reveal__front">
          <img class="top3reveal__medal" :src="getMedal(Number(i) + 1)" />
          <h4 class="top3reveal__playerInfo">
            {{ getPlayerName(player.id) }}
            <br />
            <small class="text-secondary">{{ getWonderName(player.wonderId) }}</small>
          </h4>
          <p class="top3reveal__playerScore">{{ player.total }}<br />Points</p>
        </div>
        <div class="top3reveal__back"></div>
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
const getPlayerName = (id) => {
  return store.getters['players/player'](id).name;
};
const getWonderName = (id) => {
  return store.getters['expansions/wonder'](id).label.short;
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
    height: var(--height);
    flex: 1 1 33.3333334%;
    order: var(--order);
    margin-left: var(--margin-left);
    margin-right: var(--margin-right);
    z-index: var(--z-index);
    perspective: 1000px;
  }

  &__flip {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
    // flip animation
    transform: rotateY(180deg);
    animation: flip;
    animation-timing-function: ease-in-out;
    animation-duration: 0.8s;
    animation-iteration-count: 1;
    animation-delay: var(--delay);
    animation-fill-mode: forwards;

    @keyframes flip {
      0% {
        transform: rotateY(180deg);
      }
      100% {
        transform: rotateY(0);
      }
    }
  }

  &__front,
  &__back {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: calc(#{$--card-padding} + var(--padding)) $--card-padding;
    box-sizing: border-box;
    border: 1px solid $--card-border-color;
    border-radius: $--card-border-radius;
    background: $--color-white;
    box-shadow: $--box-shadow-base;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  &__back {
    transform: rotateY(180deg);
  }

  &__front {
    display: flex;
    flex-direction: column;
    flex: 1 1 100%;
  }

  &__medal {
    min-height: 3.75rem;
    flex: 1 1 100%;
  }

  &__playerInfo,
  &__playerScore {
    flex: 1 1 auto;
    margin: 0;
    margin-top: 0.5rem;
    white-space: nowrap;
  }

  &--1 {
    --order: 2;
    --margin-left: 0;
    --margin-right: 0;
    --padding: 1.75rem;
    --z-index: 10;
    --height: 16.5rem;
    --delay: 5.5s;
  }
  &--2 {
    --order: 1;
    --margin-left: 0;
    --margin-right: -1rem;
    --padding: 0px;
    --z-index: initial;
    --height: 13rem;
    --delay: 3s;
  }
  &--3 {
    --order: 3;
    --margin-left: -1rem;
    --margin-right: 0;
    --padding: 0px;
    --z-index: initial;
    --height: 13rem;
    --delay: 0.5s;
  }
}
</style>
