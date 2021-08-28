<template>
  <div class="game">
    <router-view />
  </div>
</template>

<script setup></script>

<style lang="scss">
@import '../theme/variables';
@import '../theme/mixins';

.game {
  position: relative;
  height: 100%;
}
</style>
