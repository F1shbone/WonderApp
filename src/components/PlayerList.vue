<template>
  <div class="playerList">
    <h2>Players</h2>

    <el-card full>
      <el-card-list flush>
        <draggable
          :list="players"
          tag="transition-group"
          group="player"
          item-key="id"
          :animation="200"
          ghostClass="ghost"
        >
          <template #item="{ element }">
            <el-card-list-item>
              <div class="playerList__entry">
                <div>{{ element.name }}</div>
                <div class="text-secondary">{{ element.wonder.label.short }}</div>
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

<script>
import { useStore as useMatchStore } from '@/store/match';

import draggable from 'vuedraggable';
import ElCard from '@/components/ElCard.vue';
import ElCardList from '@/components/ElCardList.vue';
import ElCardListItem from '@/components/ElCardListItem.vue';

export default {
  components: {
    draggable,
    ElCard,
    ElCardList,
    ElCardListItem,
  },
  setup() {
    const { players, getRandomWonder } = useMatchStore();

    function rerollWonder(player) {
      console.log(player);
      player.wonder = getRandomWonder();
    }

    return {
      players,
      rerollWonder,
    };
  },
};
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
