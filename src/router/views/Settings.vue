<template>
  <signed-in>
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
              <el-switch :model-value="expansion.owned" @change="toggleOwned(expansion)" />
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
            <div>
              {{ player.name }} <br /><small class="text-secondary">Added: {{ player.added }}</small>
            </div>
            <div>
              <el-button circle icon="el-icon-delete" @click="removePlayer(player)" />
            </div>
          </el-card-list-item>
        </el-card-list>
      </el-card>

      <el-card full>
        <template #header>
          <h3>Account</h3>
        </template>
        <el-card-list flush>
          <el-card-list-item class="listItem">
            <div>E-Mail</div>
            <div>{{ user.email }}</div>
          </el-card-list-item>
        </el-card-list>
        <div class="account__signout">
          <el-button type="danger" class="el-button--block" @click="onSignOut">Sign Out</el-button>
        </div>
      </el-card>
    </div>
  </signed-in>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useFireAuth } from '../../firebase/';

import SignedIn from '../layouts/SignedIn.vue';
import ElCard from '@/components/ElCard.vue';
import ElCardList from '@/components/ElCardList.vue';
import ElCardListItem from '@/components/ElCardListItem.vue';
import { ElMessageBox } from 'element-plus';

const store = useStore();
const router = useRouter();
const { user, signOut } = useFireAuth();

//#region Expansions
const expansions = computed(() => store.getters['expansions/expansions']);
async function toggleOwned(expansion) {
  await store.dispatch('expansions/toggleOwned', { id: expansion.id });
}
//#endregion

//#region Player
const players = computed(() => store.getters['players/formatted']);
function addPlayer() {
  ElMessageBox.prompt("What's the name of the new player?", 'Add Player', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
  })
    .then(({ value }) => {
      store.dispatch('players/addPlayer', { name: value });
    })
    .catch(() => {});
}

function removePlayer(player) {
  store.dispatch('players/removePlayer', player);
}
//#endregion

//#region Account
const onSignOut = async () => {
  await signOut();
  router.push({ path: '/login' });
};
//#endregion
</script>

<style lang="scss">
@import '../../theme/variables';

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

  .account__signout {
    padding-top: $--card-padding;
    padding-bottom: $--card-padding;
    border-top: 1px solid $--card-border-color;
  }
}
.el-message-box {
  width: 90%;
}
</style>
