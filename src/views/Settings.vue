<template>
  <div class="settings">
    <h1>Settings</h1>

    <el-card full>
      <template #header>
        <h3>Expansions</h3>
        <el-button class="button" type="text">Add Expansion</el-button>
      </template>
      <el-card-list flush>
        <el-card-list-item class="listItem" v-for="expansion in expansions" :key="expansion.id">
          <div>{{ expansion.label }}</div>
          <div>
            <el-button circle icon="el-icon-delete" @click="toggleExpansion(expansion.id)" />
          </div>
        </el-card-list-item>
      </el-card-list>
    </el-card>

    <el-card full>
      <template #header>
        <h3>Players</h3>
        <el-button class="button" type="text">New Player</el-button>
      </template>
      <el-card-list flush>
        <el-card-list-item class="listItem" v-for="player in players" :key="player.name">
          <div>{{ player.name }}</div>
          <div>
            <el-button circle icon="el-icon-delete" />
          </div>
        </el-card-list-item>
      </el-card-list>
    </el-card>
  </div>
</template>

<script>
import ElCard from '@/components/ElCard.vue';
import ElCardList from '@/components/ElCardList.vue';
import ElCardListItem from '@/components/ElCardListItem.vue';

import { computed } from 'vue';
import { useStore as useExpansionsStore } from '@/store/expansions';
import { useStore as usePlayerStore } from '@/store/players';

export default {
  name: 'Settings',
  components: {
    ElCard,
    ElCardList,
    ElCardListItem,
  },
  setup() {
    const { expansions, toggleOwned } = useExpansionsStore();
    const ownedExpansions = computed(() => expansions.filter((e) => e.owned));

    const { players } = usePlayerStore();

    return {
      expansions: ownedExpansions,
      toggleExpansion: toggleOwned,
      players,
    };
  },
};
</script>

<style lang="scss">
@import '../theme/variables';

.settings {
  .el-card__body {
    padding-top: 0;
    padding-bottom: 0;
  }
  .el-card__header {
    display: flex;
    align-items: center;
    h3 {
      margin: 0;
    }
    .el-button {
      margin-left: auto;
    }
  }

  .el-card + .el-card {
    margin-top: $--card-padding;
  }

  .listItem {
    display: flex;
    align-items: center;
    div {
      &:nth-child(1) {
        flex: 1 1 auto;
      }
    }
    .el-button {
      margin-left: auto;
    }
  }
}
</style>
