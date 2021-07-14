<template>
  <el-card class="playerList">
    <draggable
      v-model="players"
      tag="transition-group"
      :component-data="{
        tag: 'ul',
        type: 'transition-group',
        name: !drag ? 'flip-list' : null,
      }"
      group="player"
      @start="drag = true"
      @end="drag = false"
      item-key="name"
      :animation="200"
      :disabled="false"
      ghostClass="ghost"
    >
      <template #item="{ element }">
        <li>
          <div class="playerList__entry">
            <div>{{ element.name }}</div>
            <div class="text-secondary">{{ element.wonder }}</div>
          </div>
          <div class="playerList__append">
            <el-button circle icon="el-icon-refresh"></el-button>
            <el-button circle icon="el-icon-delete"></el-button>
          </div>
        </li>
      </template>
    </draggable>
  </el-card>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  components: {
    draggable,
  },
  data() {
    return {
      drag: false,
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
  margin-left: -$--main-padding;
  margin-right: -$--main-padding;

  .el-card__body {
    padding: 0;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;

    li {
      display: flex;
      flex-direction: row;
      padding: math.div($--card-padding, 2) 0;
      user-select: none;
      & + li {
        border-top: 1px solid $--card-border-color;
      }
    }
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
    background: #c8ebfb;
  }
}
</style>
