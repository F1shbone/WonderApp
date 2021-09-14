<template>
  <signed-in>
    <div class="game">
      <router-view />
    </div>
  </signed-in>
</template>

<script setup>
import SignedIn from '../layouts/SignedIn.vue';
</script>

<style lang="scss">
@import '../../theme/variables';
@import '../../theme/mixins';

.game {
  position: relative;
  height: 100%;
}
</style>
