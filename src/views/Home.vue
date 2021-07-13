<template>
  <layout>
    <div class="home">
      <h1>Players</h1>

      <player-list />

      <el-button
        type="primary"
        style="display: block; width: calc(100% + 40px); margin: 10px -20px 0 -20px; border-radius: 0"
        >Roll Places</el-button
      >
      <el-button
        type="primary"
        style="display: block; width: calc(100% + 40px); margin: 10px -20px 0 -20px; border-radius: 0"
        >Start Game</el-button
      >
    </div>
  </layout>
</template>

<script>
// @ is an alias to /src
import Layout from '@/layouts/Base.vue';
import PlayerList from '@/components/PlayerList.vue';

export default {
  name: 'Home',
  components: {
    Layout,
    PlayerList,
  },
};
</script>
