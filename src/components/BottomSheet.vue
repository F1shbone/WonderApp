<template>
  <transition name="fade">
    <div class="bottomSheet__mask" v-if="visible" />
  </transition>
  <transition name="slide">
    <div class="bottomSheet" v-if="visible" ref="target">
      <div class="bottomSheet__drag" v-drag="dragHandler" />
      <p>Test</p>
    </div>
  </transition>
</template>

<script>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const target = ref(null);
    onClickOutside(target, () => {
      emit('close');
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
          target.value.setAttribute('style', `height:${initialHeight - dragState.movement[1]}px;`);
          if (initialHeight / 1.5 < newY) {
            removeStyle = false;
            dragState.cancel();
            emit('close');
          }
        }
      }
    }

    return {
      target,
      dragHandler,
    };
  },
};
</script>

<style scoped>
/* Transitions */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.35s ease-in-out;
}

.slide-enter-from {
  transform: translateY(85%);
}
.slide-leave-to {
  transform: translateY(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
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
  height: 85%;
  background-color: #fff;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  z-index: 20;
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
  }
}
</style>
