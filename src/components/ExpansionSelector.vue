<template>
  <div class="expansionSelector">
    <h2>
      Expansions
      <br />
      <small class="text-secondary">The base game is always included</small>
    </h2>
    <div>
      <el-checkbox-button
        v-for="(expansion, i) in expansions"
        :key="i"
        :label="expansion.label"
        :checked="expansion.value"
        @input="toggle(expansion)"
        >{{ expansion.label }}</el-checkbox-button
      >
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { BASE } from '@/store/gameInfo/expansions';

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

const expansions = computed(() => props.modelValue.filter((e) => e.id !== BASE.id));
function toggle(expansion) {
  emit(
    'update:modelValue',
    props.modelValue.map((e) => {
      if (e.id === expansion.id) {
        e.value = !e.value;
      }
      return e;
    })
  );
}
//#endregion
</script>

<style lang="scss">
@import '../theme/variables';

.expansionSelector {
  h2 {
    margin-top: 0;
    margin-bottom: 0.5rem;

    small {
      font-size: 14px;
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
