<template>
  <div class="game">
    <el-empty description="No active game" />

    <el-button type="primary" @click="toggleVisible">Start new Game</el-button>
  </div>

  <bottom-sheet :visible="visible" @close="setVisible(false)" />
</template>

<script>
import { ref } from 'vue';
import BottomSheet from '@/components/BottomSheet.vue';

export default {
  name: 'Game',
  components: {
    BottomSheet,
  },
  setup() {
    const visible = ref(false);
    function setVisible(val) {
      visible.value = val;
    }
    function toggleVisible() {
      visible.value = !visible.value;
    }

    return {
      visible,
      setVisible,
      toggleVisible,
    };
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
