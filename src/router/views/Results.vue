<template>
  <signed-in>
    <div class="results">
      <router-view />
    </div>
  </signed-in>
</template>

<script setup>
import SignedIn from '../layouts/SignedIn.vue';
</script>
