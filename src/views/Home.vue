<template>
  <layout>
    <div class="home">
      <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
      <el-button type="primary">Primary</el-button>

      <HelloWorld msg="Welcome to Your Vue.js App" />
      <HelloWorld msg="Welcome to Your Vue.js App" />
      <HelloWorld msg="Welcome to Your Vue.js App" />
      <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
  </layout>
</template>

<script>
// @ is an alias to /src
import Layout from '@/layouts/Base.vue';
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    Layout,
    HelloWorld,
  },
};
</script>
