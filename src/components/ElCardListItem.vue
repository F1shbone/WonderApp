<template>
  <li
    class="el-card__listItem"
    :class="{
      'el-card__listItem--selectable': selected !== undefined,
    }"
  >
    <template v-if="selected !== undefined">
      <button @click="$emit('toggle', !selected)">
        <slot />
        <div class="el-card__listItemSelected">
          <i v-if="selected" class="el-icon-check" />
        </div>
      </button>
    </template>
    <slot v-else />
  </li>
</template>

<script>
export default {
  props: {
    flush: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Boolean,
      default: undefined,
    },
  },
};
</script>

<style lang="scss">
@use 'sass:math';
@import '../theme/variables';

.el-card__listItem {
  display: flex;
  flex-direction: row;
  padding: math.div($--card-padding, 2) $--card-padding;
  user-select: none;
  & + li {
    border-top: 1px solid $--card-border-color;
  }

  &Selected {
    margin-left: auto;
    color: $--color-primary;
  }

  &--selectable {
    display: inherit;
    padding: 0;
    //
  }

  > button {
    display: flex;
    align-items: center;

    width: 100%;
    min-height: 40px;
    box-sizing: border-box;
    margin: 0;
    padding: math.div($--card-padding, 2) $--card-padding;

    background: $--button-default-background-color;
    color: $--button-default-font-color;
    border: none;

    font-size: 1rem;
    font-weight: 500;
    line-height: 1;
    text-align: left;

    white-space: nowrap;
    cursor: pointer;
    outline: none;
    user-select: none;
    -webkit-appearance: none;
  }
}
</style>
