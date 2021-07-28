<template>
  <div class="settings">
    <h1>Settings</h1>

    <el-card full>
      <template #header>
        <h3>Expansions</h3>
      </template>
      <el-card-list flush>
        <el-card-list-item class="listItem" v-for="expansion in expansions" :key="expansion.id">
          <div>{{ expansion.label }}</div>
          <div>
            <el-switch v-model="expansion.owned" />
          </div>
        </el-card-list-item>
      </el-card-list>
    </el-card>

    <el-card full>
      <template #header>
        <h3>Players</h3>
        <el-button type="text" @click="addPlayer">New Player</el-button>
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
import { computed } from 'vue';

import { useStore as useExpansionsStore } from '@/pinia/expansions';
import { useStore as usePlayerStore } from '@/pinia/players';

import ElCard from '@/components/ElCard.vue';
import ElCardList from '@/components/ElCardList.vue';
import ElCardListItem from '@/components/ElCardListItem.vue';
import { ElMessageBox } from 'element-plus';

export default {
  name: 'Settings',
  components: {
    ElCard,
    ElCardList,
    ElCardListItem,
  },
  setup() {
    const { expansions } = useExpansionsStore();
    const { players } = usePlayerStore();

    function addPlayer() {
      ElMessageBox.prompt("What's the name of the new player?", 'Add Player', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
      })
        .then(({ value }) => {
          players.push({
            name: value,
            active: false,
          });
        })
        .catch(() => {});
    }

    return {
      // expansions: ownedExpansions,
      expansions: computed(() => expansions),
      players,
      addPlayer,
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
    height: 2.5rem;
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
.el-message-box {
  width: 90%;
}
</style>
