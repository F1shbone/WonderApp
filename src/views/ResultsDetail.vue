<template>
  <div class="results">
    <h1>Results Detail</h1>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const { params } = useRoute();

console.log(params.id);
//
</script>
