<template>
  <div class="results">
    <div class="results__carddeck">
      <div class="results__card results--3">
        <img src="../assets/medal__bronze.svg" />
        <h4>Simon</h4>
        <p>50<br />Points</p>
      </div>
      <div class="results__card results--2">
        <img src="../assets/medal__silver.svg" />
        <h4>Bernhard</h4>
        <p>100<br />Points</p>
      </div>
      <div class="results__card results--1">
        <img src="../assets/medal__gold.svg" />
        <h4>Romina</h4>
        <p>110<br />Points</p>
      </div>
    </div>
    <ul class="results__list">
      <li class="results__card">
        <h2>4. <small>Christian</small></h2>
        <p>40 Points</p>
      </li>
      <li class="results__card">
        <h2>5. <small>Daniel</small></h2>
        <p>30 Points</p>
      </li>
      <li class="results__card">
        <h2>6. <small>Daniel</small></h2>
        <p>30 Points</p>
      </li>
      <li class="results__card">
        <h2>7. <small>Daniel</small></h2>
        <p>30 Points</p>
      </li>
      <li class="results__card">
        <h2>8. <small>Daniel</small></h2>
        <p>30 Points</p>
      </li>
    </ul>
    <hr />
    <h1>Stats</h1>
    <li class="results__card">
      <h2>8. <small>Daniel</small></h2>
      <p>30 Points</p>
    </li>
    <li class="results__card">
      <h2>8. <small>Daniel</small></h2>
      <p>30 Points</p>
    </li>
    <li class="results__card">
      <h2>8. <small>Daniel</small></h2>
      <p>30 Points</p>
    </li>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import createConfetti from 'canvas-confetti';

let timerId;
onMounted(() => {
  timerId = setTimeout(createConfetti, 6000);
});
onBeforeUnmount(() => {
  if (timerId) {
    window.clearTimeout(timerId);
  }
});
</script>

<style lang="scss">
@import '../theme/variables';

.results {
  &__carddeck {
    display: flex;
    align-items: center;

    .results__card {
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
  }

  &__card {
    height: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex: 1 1 33.33334%;
    padding: $--card-padding;
    border: 1px solid $--card-border-color;
    border-radius: $--card-border-radius;
    background: $--background-color-base;
    text-align: center;
    box-shadow: $--box-shadow-base;
    perspective: 1000px;

    &.results--1 {
      height: 14rem;
      justify-content: flex-start;

      img {
        margin-bottom: 2.8rem;
      }
    }

    img {
      height: 3.297875rem;
      margin-bottom: 1rem;
    }

    h4 {
      margin: 0;
    }
  }

  &--1 {
    order: 2;
    z-index: 9;
    --delay: 5.5s;
  }
  &--2 {
    order: 1;
    margin-right: -1rem;
    --delay: 3s;
  }
  &--3 {
    order: 3;
    margin-left: -1rem;
    --delay: 0.5s;
  }

  &__list {
    padding: 0;

    li {
      height: auto;
      margin-bottom: 1rem;
      flex-direction: row;
      // padding: 0.5rem 1rem;
    }
    h2 {
      flex: 1 1 50%;
      display: flex;
      margin: 0;
      justify-content: flex-start;
      align-items: center;
      > small {
        margin-left: 1.5rem;
        font-size: 1rem;
      }
    }
    p {
      flex: 1 1 50%;
      display: flex;
      justify-content: flex-end;
      margin: 0;
    }
  }
}
</style>
