<template>
  <div class="game__empty">
    <el-empty description="No active game" />
  </div>
</template>

<script setup></script>

<style lang="scss">
@import '../../theme/variables';
@import '../../theme/mixins';

.game__empty {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $--body-bg;
  z-index: $--z-index-empty;

  .el-empty {
    padding-top: 0;
  }
}
</style>
