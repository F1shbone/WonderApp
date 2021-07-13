<template>
  <el-container>
    <el-header class="layout__header">
      <el-page-header @back="goBack" icon="el-icon-magic-stick" title="">
        <template #content><img alt="Vue logo" src="../assets/logo.png" /></template>
      </el-page-header>
    </el-header>
    <el-main>
      <slot />
    </el-main>
    <el-footer class="layout__footer" height="80">
      <el-menu default-active="1" mode="horizontal">
        <el-menu-item index="1">
          <i class="el-icon-user" />
          <span>Players</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-trophy" />
          <span>Score</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-data-line" />
          <span>Stats</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-s-operation" />
          <span>Settings</span>
        </el-menu-item>
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

    img {
      max-height: 2rem;
    }
  }

  &__footer {
    margin-bottom: 20px;
    .el-menu {
      display: flex;
      border: none !important;
      > li {
        display: flex;
        flex-direction: column;
        align-content: center;
        flex: 1 1 100%;
        text-align: center;
        border-bottom: none !important;
        border-top: 2px solid transparent;

        &.is-active {
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
