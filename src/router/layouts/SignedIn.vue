<template>
  <el-container>
    <el-header class="layout__header">
      <img alt="Vue logo" src="../../assets/logo.png" />

      <el-button icon="el-icon-edit-outline" @click="showNewGame"
        ><span class="visually-hidden">New Game</span></el-button
      >
    </el-header>
    <el-main>
      <slot />

      <new-game v-model="isNewGameDialogVisible" />
    </el-main>
    <el-footer class="layout__footer" height="80">
      <el-menu default-active="1" mode="horizontal" :router="true">
        <li>
          <router-link class="el-menu-item" to="/game" @click="blur">
            <i class="el-icon-notebook-2" />
            <span>Game</span>
          </router-link>
        </li>
        <li>
          <router-link class="el-menu-item" to="/results" @click="blur">
            <i class="el-icon-finished" />
            <span>Results</span>
          </router-link>
        </li>
        <li>
          <router-link class="el-menu-item" to="/stats" @click="blur">
            <i class="el-icon-data-line" />
            <span>Stats</span>
          </router-link>
        </li>
        <li>
          <router-link class="el-menu-item" to="/settings" @click="blur">
            <i class="el-icon-s-operation" />
            <span>Settings</span>
          </router-link>
        </li>
        <li>
          <router-link class="el-menu-item" to="/login" @click="blur">
            <i class="el-icon-lock" />
            <span>Login</span>
          </router-link>
        </li>
      </el-menu>
    </el-footer>
  </el-container>
</template>

<script setup>
import NewGame from '@/components/NewGame.vue';
import useNewGame from '@/composables/useNewGame.js';

const { isNewGameDialogVisible, showNewGame } = useNewGame();

function blur({ srcElement }) {
  setTimeout(() => {
    srcElement.blur();
  }, 250);
}
</script>

<style lang="scss">
@import '../../theme/variables';

.layout {
  &__header {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: $--header-padding !important;

    .el-button {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3.75rem;
      border-radius: 0;
      border-width: 0 1px 0 0;
      i {
        font-size: 150%;
      }
      span {
        margin: 0;
      }
    }

    img {
      max-height: 2.5rem;
    }
  }

  &__footer {
    margin-bottom: 20px;
    .el-menu {
      display: flex;
      border: none !important;

      li {
        flex: 1 1 100%;

        &:focus {
          outline: none;
        }
      }

      &-item {
        display: flex;
        flex-direction: column;
        align-content: center;
        text-align: center;
        border-bottom: none !important;
        border-top: 2px solid transparent;
        text-decoration: none;

        &.router-link-active {
          border-color: $--color-primary;
        }

        > * {
          pointer-events: none;
        }

        &:focus-visible {
          outline: unset;
          outline-offset: unset;
        }
      }

      // refactor
      i {
        flex: 1 1 100%;
        margin: 0.4375rem auto;
        justify-items: center;
        align-items: center;
      }
      span {
        font-size: 75%;
        line-height: 1.2;
        margin: 0.3125rem 0;
      }
    }
  }
}

@media (hover: none) {
  .el-menu-item:hover {
    background-color: inherit;
  }
}
</style>
