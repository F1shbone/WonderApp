<template>
  <el-container>
    <el-header class="layout__header">
      <img alt="Vue logo" src="../../assets/logo.png" />
    </el-header>
    <el-main class="layout__main">
      <slot />

      <img src="../../assets/splash.webp" alt="splash" class="layout__splash" />
    </el-main>
  </el-container>
</template>

<script setup></script>

<style lang="scss">
@import '../../theme/variables';

.layout {
  &__header {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: $--header-padding !important;

    img {
      max-height: 2.5rem;
    }
  }
  &__main {
    position: relative;
  }
  &__splash {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    max-width: 100%;
    filter: saturate(0.5);
  }
}
</style>
