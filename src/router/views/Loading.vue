<template>
  <signed-out class="loading__container">
    <div class="loading" v-loading="true" element-loading-text="Loading..." />
  </signed-out>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useFireAuth } from '../../firebase/';

import SignedOut from '../layouts/SignedOut.vue';

const { user, isReady } = useFireAuth();
const router = useRouter();

onMounted(async () => {
  await isReady;
  if (user.value.uid && user.value.email) {
    router.push({ path: router.currentRoute.value.query.redirect });
  } else {
    router.push({ path: '/login', query: router.currentRoute.value.query });
  }
});
</script>

<style lang="scss">
@import '../../theme/variables';
@import '../../theme/mixins';

.loading {
  @include flushBody();

  position: relative;
  height: calc(100% + #{$--main-padding * 2});
  margin-top: -$--main-padding;
  margin-bottom: -$--main-padding;
  padding: $--main-padding;
  background-color: $--color-info-lighter;
  box-sizing: border-box;

  &__container {
    .layout__splash {
      z-index: $--z-index-loader + 1;
    }
  }
}
</style>
