<template>
  <ul class="el-card__list" :class="{ 'el-card__list--flush': flush }">
    <slot />
  </ul>
</template>

<script>
export default {
  props: {
    flush: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
@use 'sass:math';
@import '../theme/variables';

.el-card__list {
  margin: 0;
  padding: 0;
  list-style-type: none;

  &--flush {
    margin-left: -$--main-padding;
    margin-right: -$--main-padding;
  }
}
</style>
