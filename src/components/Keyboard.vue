<template>
  <div :style="{ height: '20rem' }" />
  <bottom-sheet
    :modelValue="visible"
    @update:modelValue="emit('update:visible', $event)"
    height="20rem"
    hideBackdrop
    hideDrag
  >
    <div class="keyboard" :style="{ backgroundColor: props.score.bg, color: props.score.color }">
      <div class="keyboard__value">
        {{ value }}
        <button @click="emit('nextCell')">
          <kbd><i class="el-icon-right" /></kbd>
        </button>
      </div>
      <div class="keyboard__btns">
        <button @click="add('1')">1</button>
        <button @click="add('2')">2</button>
        <button @click="add('3')">3</button>
        <button @click="add('4')">4</button>
        <button @click="add('5')">5</button>
        <button @click="add('6')">6</button>
        <button @click="add('7')">7</button>
        <button @click="add('8')">8</button>
        <button @click="add('9')">9</button>
        <button @click="emit('update:visible', false)">
          <kbd><i class="el-icon-arrow-down" /></kbd>
        </button>
        <button @click="add('0')">0</button>
        <button @click="emit('update:value', 0)">
          <kbd><i class="el-icon-close" /></kbd>
        </button>
      </div>
    </div>
  </bottom-sheet>
</template>

<script setup>
// import { computed, ref } from 'vue';

import BottomSheet from '@/components/BottomSheet.vue';

//#region v-model
const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  score: {
    type: Object,
  },
});
const emit = defineEmits(['update:visible', 'update:value', 'nextCell']);

function add(number) {
  emit('update:value', +(props.value + number));
}
//#endregion
</script>

<style lang="scss">
@import '../theme/variables';
@import '../theme/mixins';

.keyboard {
  $padding-y: 0.25rem;
  $padding-x: 1rem;
  $font-size: 3rem;
  $line-height: 1.375;

  height: 100%;
  padding-bottom: 20px;

  &__value {
    position: relative;
    background-color: $--color-white;
    padding: $padding-y $padding-x;
    font-size: $font-size;
    font-weight: 700;
    line-height: $line-height;
    text-align: center;

    button {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      border-radius: 0;
      border: 0 none;
      margin: 0;
      padding: 0;
      font-size: 1.5rem;
    }
  }
  &__btns {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    gap: 1px 1px;
    width: 100%;
    height: calc(100% - 2 * #{$padding-y} - #{$font-size} * #{$line-height});
    // background: $--table-border-color;
    border-bottom: $--table-border;

    > * {
      margin: 0;
      background: transparent;
      border-radius: 0;
      border: 0 none;
      border-top: $--table-border;
      border-right: $--table-border;
      font-size: 1rem;

      &:nth-child(3n) {
        border-right: none;
      }
      // border-collapse: ;
    }
  }
}
</style>
