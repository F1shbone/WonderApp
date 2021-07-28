<template>
  <div class="playerList">
    <h2>Players</h2>

    <el-card full>
      <el-card-list flush>
        <draggable
          v-model="players"
          tag="transition-group"
          group="player"
          item-key="id"
          :animation="200"
          ghostClass="ghost"
        >
          <template #item="{ element }">
            <el-card-list-item>
              <div class="playerList__entry">
                <div>{{ element.label }}</div>
                <div class="text-secondary">{{ element.wonder }}</div>
              </div>
              <div class="playerList__append">
                <el-button circle icon="el-icon-refresh" @click="rerollWonder(element)">
                  <span class="visually-hidden">Re-roll Wonder</span>
                </el-button>
              </div>
            </el-card-list-item>
          </template>
        </draggable>
      </el-card-list>
    </el-card>
  </div>
</template>

<script setup>
import { computed } from 'vue';

import draggable from 'vuedraggable';
import ElCard from '@/components/ElCard.vue';
import ElCardList from '@/components/ElCardList.vue';
import ElCardListItem from '@/components/ElCardListItem.vue';

//#region v-model
/**
 * modelValue: {
 *   id: number,
 *   label: string;
 *   wonder: string;
 *   value: boolean;
 * }[]
 */
const props = defineProps({
  modelValue: {
    type: Array,
  },
});
const emit = defineEmits(['update:modelValue']);

const players = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});

function rerollWonder() {
  // function rerollWonder(player) {
  // player.wonder = getRandomWonder(props.players);
}
//#endregion
</script>

<style lang="scss">
@use 'sass:math';
@import '../theme/variables';

.playerList {
  h2 {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }

  .el-card__body {
    padding-top: 0;
    padding-bottom: 0;
  }

  &__entry {
    flex: 1 1 auto;
    margin: 0 math.div($--card-padding, 2);
    user-select: none;
  }
  &__append {
    margin: 0 math.div($--card-padding, 2);
    user-select: none;
    span {
      margin: 0 !important;
    }
  }

  // Animation
  .flip-list-move {
    transition: transform 0.5s;
  }
  .no-move {
    transition: transform 0s;
  }
  .ghost {
    opacity: 0.5;
    background: rgba($--color-primary, 0.5);
  }
}
</style>
