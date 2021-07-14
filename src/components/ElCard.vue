<template>
  <div
    class="el-card"
    :class="{
      [`is-${shadow}-shadow`]: shadow,
      'is-always-shadow': !shadow,
      'el-card--full': full,
    }"
  >
    <div v-if="$slots.header || header" class="el-card__header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="el-card__body" :style="bodyStyle">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'ElCard',
  props: {
    header: {
      type: String,
      default: '',
    },
    bodyStyle: {
      type: [String, Object, Array],
      default: '',
    },
    shadow: {
      type: String,
      default: '',
    },
    full: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss">
@import '../theme/variables';

.el-card--full {
  margin-left: -$--main-padding;
  margin-right: -$--main-padding;
}
</style>
