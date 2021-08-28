<template>
  <transition name="fade">
    <div class="bottomSheet__mask" v-if="modelValue && !hideBackdrop" />
  </transition>
  <transition name="slide">
    <div class="bottomSheet" :style="`height: ${height};`" v-if="modelValue" ref="target">
      <div class="bottomSheet__drag" v-drag="dragHandler" v-if="!hideDrag" />
      <div class="bottomSheet__content">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

//#region v-model
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  height: {
    type: String,
    default: '85%',
  },
  hideBackdrop: {
    type: Boolean,
    default: false,
  },
  hideDrag: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue', 'close']);
//#endregion

const target = ref(null);
onClickOutside(target, () => {
  if (!props.hideBackdrop) {
    emit('update:modelValue', false);
    emit('close');
  }
});

let initialY = 0;
let initialHeight = 0;
let removeStyle = true;
function dragHandler(dragState) {
  if (dragState.first) {
    const { y, height } = target.value.getBoundingClientRect();
    initialY = y;
    initialHeight = height;
    removeStyle = true;
  } else if (dragState.last) {
    // do nothing, remove style is not necessary as the element is removed anyway
    if (removeStyle) {
      target.value.removeAttribute('style');
    }
  } else {
    const newY = initialY + dragState.movement[1];
    if (newY > initialY) {
      target.value.setAttribute('style', `transform:translateY(${dragState.movement[1]}px);`);
      if (initialHeight / 1.5 < newY) {
        removeStyle = false;
        dragState.cancel();
        emit('close');
      }
    }
  }
}
</script>

<style scoped>
/* Transitions */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.25s ease-in-out;
}

.slide-enter-from {
  transform: translateY(85%) !important;
}
.slide-leave-to {
  transform: translateY(100%) !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<style lang="scss">
@import '../theme/variables';

.bottomSheet {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  z-index: $--z-index-bottom-sheet;
  transform: translateY(0);

  &__drag {
    position: relative;
    height: 2.5rem;
    background-color: $--border-color-base;
    border-top-left-radius: 1.5rem;
    border-top-right-radius: 1.5rem;
    cursor: drag;
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: block;
      height: 0.5rem;
      width: 8rem;
      border-radius: 0.35rem;
      background-color: #000;
    }
  }

  &__mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: $--z-index-bg-shadow;
  }

  &__content {
    flex: 1 1 100%;
    margin-bottom: 20px;
  }
}
</style>
