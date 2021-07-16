<template>
  <layout>
    <div class="game">
      <el-empty description="No active game" />

      <el-button type="primary">Start new Game</el-button>
    </div>
  </layout>
</template>

<script>
import Layout from '@/layouts/Base.vue';

export default {
  name: 'Game',
  components: {
    Layout,
  },
};
</script>

<style lang="scss" scoped>
.game {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .el-empty {
    padding-top: 0;
  }
}
</style>
