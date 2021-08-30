<template>
  <el-button type="primary" icon="el-icon-magic-stick" @click="emit('update:modelValue', true)" v-if="!modelValue"
    >Reveal Score</el-button
  >

  <bottom-sheet hideDrag fullscreen :modelValue="modelValue" @update:modelValue="close" @close="close">
    <div class="game-result">
      <h1>Results</h1>
    </div>
  </bottom-sheet>
</template>

<script setup>
import BottomSheet from '@/components/BottomSheet.vue';

//#region v-model
defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(['update:modelValue']);
const close = () => emit('update:modelValue', false);
//#endregion
</script>

<style lang="scss">
.game-result {
  padding: 1rem;
  // margin-left: 1rem;
  // margin-right: 1rem;
}
</style>
