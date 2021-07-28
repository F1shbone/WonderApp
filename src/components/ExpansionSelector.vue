<template>
  <div class="expansionSelector">
    <h2>
      Expansions
      <br />
      <small class="text-secondary">The base game is always included</small>
    </h2>
    <div>
      <el-checkbox-button
        v-for="expansion in expansions"
        :key="expansion.id"
        :label="expansion.id"
        :checked="expansion.active"
        @input="toggleActive(expansion.id)"
        >{{ expansion.label }}</el-checkbox-button
      >
    </div>
  </div>
</template>

<script>
import { useStore as useExpansionsStore } from '@/pinia/expansions';
import { BASE } from '@/pinia/gameInfo/expansions';

export default {
  setup() {
    const { ownedExpansions, toggleActive } = useExpansionsStore();
    const expansions = ownedExpansions.filter((e) => e.id !== BASE.id);

    return { expansions, toggleActive };
  },
};
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
