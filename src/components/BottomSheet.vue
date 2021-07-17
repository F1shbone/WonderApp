<template>
  <div class="bottomSheet__mask" v-if="visible" />
  <div class="bottomSheet" :class="{ 'bottomSheet--visible': visible }" ref="target">
    <div class="bottomSheet__drag" v-drag="dragHandler" />
    <p>Test</p>
  </div>
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
    function dragHandler(dragState) {
      if (dragState.first) {
        const { y, height } = target.value.getBoundingClientRect();
        initialY = y;
        initialHeight = height;
        console.log(initialY, initialHeight);
      } else if (dragState.last) {
        target.value.removeAttribute('style');
      } else {
        const newY = initialY + dragState.movement[1];
        if (newY > initialY) {
          target.value.setAttribute('style', `top: ${newY}px;bottom: unset;`);
          if (initialHeight / 2 < newY) {
            target.value.removeAttribute('style');
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

<style lang="scss">
@import '../theme/variables';

.bottomSheet {
  $position: -85%;
  $height: 85%;

  position: fixed;
  left: 0;
  right: 0;
  bottom: $position;
  height: $height;
  background-color: #fff;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  z-index: 20;
  animation: slideDown 0.45s;
  animation-iteration-count: 1;
  animation-timing-function: cubic-bezier(0.65, 0.05, 0.36, 1);

  &--visible {
    bottom: 0;
    animation: slideUp 0.45s;
  }

  @keyframes slideUp {
    from {
      bottom: $position;
    }
    to {
      bottom: 0;
    }
  }
  @keyframes slideDown {
    from {
      bottom: 0;
    }
    to {
      bottom: $position;
    }
  }

  &__drag {
    position: relative;
    height: 2.5rem;
    background-color: $--border-color-base;
    border-top-left-radius: 1.5rem;
    border-top-right-radius: 1.5rem;
    cursor: drag;
    // <div style="width: 200px; height: 20px; margin: 0.5rem auto; background: #000" />
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: block;
      height: 1rem;
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
    animation: backgroundColor 0.25s;
    animation-iteration-count: 1;
    animation-delay: 0.2s;
    animation-fill-mode: forwards;

    @keyframes backgroundColor {
      from {
        background-color: transparent;
      }
      to {
        background-color: rgba(0, 0, 0, 0.5);
      }
    }
  }
}
</style>
