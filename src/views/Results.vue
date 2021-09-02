<template>
  <div class="results">
    <router-view />
  </div>
</template>

<script setup></script>

<style lang="scss">
@import '../theme/variables';
@import '../theme/mixins';

.results {
  position: relative;
  height: 100%;
}
</style>
