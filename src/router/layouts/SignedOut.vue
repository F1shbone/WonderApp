<template>
  <el-container>
    <el-header class="layout__header">
      <img alt="Vue logo" src="../../assets/logo.png" />
    </el-header>
    <el-main>
      <slot />
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
}
</style>
