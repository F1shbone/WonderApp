<template>
  <div class="game__active">
    <p>Game Ready</p>
  </div>
</template>

<script setup></script>

<style lang="scss">
@import '../theme/variables';
@import '../theme/mixins';

.game__active {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $--body-bg;
}
</style>
