<template>
  <div class="playerList">
    <h2>Players</h2>

    <el-card full>
      <el-card-list flush>
        <draggable
          v-model="players"
          tag="transition-group"
          group="player"
          item-key="name"
          :animation="200"
          ghostClass="ghost"
        >
          <template #item="{ element }">
            <el-card-list-item>
              <div class="playerList__entry">
                <div>{{ element.name }}</div>
                <div class="text-secondary">{{ element.wonder }}</div>
              </div>
              <div class="playerList__append">
                <el-button circle icon="el-icon-refresh"></el-button>
              </div>
            </el-card-list-item>
          </template>
        </draggable>
      </el-card-list>
    </el-card>
  </div>
</template>

<script>
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
  data() {
    return {
      players: [
        {
          name: 'Simon',
          wonder: 'Éphesos',
        },
        {
          name: 'Daniel',
          wonder: 'Alexandria',
        },
        {
          name: 'Romina',
          wonder: 'Babylon',
        },
        {
          name: 'Bernhard',
          wonder: 'Gizeh',
        },
        {
          name: 'Christian',
          wonder: 'Rhodos',
        },
      ],
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
