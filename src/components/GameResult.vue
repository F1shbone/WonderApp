<template>
  <bottom-sheet hideDrag fullscreen :modelValue="modelValue" @update:modelValue="close" @close="close">
    <div class="game-result">
      <div class="game-result__container">
        <h1>Results</h1>
      </div>
      <div class="game-result__container game-result--scroll">
        <results />
      </div>
    </div>
  </bottom-sheet>
</template>

<script setup>
// TODO: find a way to make the bottom-sheet closable but not hide the results row at the same time
import { watchEffect } from 'vue';
import createConfetti from 'canvas-confetti';

import BottomSheet from '@/components/BottomSheet.vue';
import Results from '@/components/Results.vue';

//#region v-model
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(['update:modelValue']);
const close = () => emit('update:modelValue', false);
//#endregion

let timerId;
watchEffect(() => {
  if (props.modelValue) {
    timerId = setTimeout(createConfetti, 6000);
  } else {
    window.clearTimeout(timerId);
  }
});
</script>

<style lang="scss">
@import '../theme/variables';

.game-result {
  height: 100%;
  display: flex;
  flex-direction: column;

  &__container {
    flex: 0 0 4.5rem;
    padding: 0 1rem;
    box-sizing: border-box;
  }

  &--scroll {
    flex: 1 0 calc(100% - 4.5rem);
    padding: 1rem;
    overflow-y: auto;
  }
}
</style>
