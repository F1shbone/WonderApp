<template>
  <div class="playerSelector">
    <h2>Players</h2>
    <div>
      <el-checkbox-button
        v-for="(player, i) in props.modelValue"
        :key="i"
        :label="player.label"
        :checked="player.value"
        @input="toggle(player)"
        >{{ player.label }}</el-checkbox-button
      >
    </div>
  </div>
</template>

<script setup>
//#region v-model
/**
 * modelValue: {
 *   id: number,
 *   label: string;
 *   value: boolean;
 * }[]
 */
const props = defineProps({
  modelValue: {
    type: Array,
  },
});
const emit = defineEmits(['update:modelValue']);

function toggle(player) {
  emit(
    'update:modelValue',
    props.modelValue.map((e) => {
      if (e.id === player.id) {
        return {
          id: e.id,
          label: e.label,
          value: !e.value,
        };
      } else {
        return e;
      }
    })
  );
}
//#endregion
</script>

<style lang="scss">
@import '../theme/variables';

.playerSelector {
  h2 {
    margin-top: 0;
    margin-bottom: 0.5rem;

    small {
      font-size: 14px;
      color: $--color-text-secondary;
    }
  }
  .el-checkbox-button {
    padding: 0.25rem;
    &__inner {
      border-left: 1px solid $--border-color-base;
      border-radius: $--border-radius-base !important;
    }
  }
}
</style>
