<template>
  <div class="home">
    <h1>Players</h1>

    <player-list />

    <el-button
      type="primary"
      style="display: block; width: calc(100% + 40px); margin: 10px -20px 0 -20px; border-radius: 0"
      >Shuffle Players</el-button
    >
    <el-button
      type="primary"
      style="display: block; width: calc(100% + 40px); margin: 10px -20px 0 -20px; border-radius: 0"
      >Start Game</el-button
    >
  </div>
</template>

<script>
import PlayerList from '@/components/PlayerList.vue';

export default {
  name: 'Home',
  components: {
    PlayerList,
  },
};
</script>
