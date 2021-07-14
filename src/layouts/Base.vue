<template>
  <el-container>
    <el-header class="layout__header">
      <el-page-header title="">
        <template #icon><i class="el-icon-magic-stick" /></template>
        <template #content><img alt="Vue logo" src="../assets/logo.png" /></template>
      </el-page-header>
    </el-header>
    <el-main>
      <slot />
    </el-main>
    <el-footer class="layout__footer" height="80">
      <el-menu default-active="1" mode="horizontal" :router="true">
        <li>
          <router-link class="el-menu-item" to="/">
            <i class="el-icon-user" />
            <span>Players</span>
          </router-link>
        </li>
        <li>
          <router-link class="el-menu-item" to="/score">
            <i class="el-icon-trophy" />
            <span>Score</span>
          </router-link>
        </li>
        <li>
          <router-link class="el-menu-item" to="/stats">
            <i class="el-icon-data-line" />
            <span>Stats</span>
          </router-link>
        </li>
        <li>
          <router-link class="el-menu-item" to="/settings">
            <i class="el-icon-s-operation" />
            <span>Settings</span>
          </router-link>
        </li>
      </el-menu>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  //
};
</script>

<style lang="scss">
@import '../theme/variables';
.layout {
  &__header {
    display: flex;
    padding: $--header-padding !important;

    .el-page-header__left,
    .el-page-header__content {
      display: flex;
      align-items: center;
    }
    .el-page-header__left::after {
      height: 100%;
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
        margin: 0.5rem 0;
      }
    }
  }
}
</style>
