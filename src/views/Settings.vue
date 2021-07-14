<template>
  <layout>
    <div class="settings">
      <h1>Settings</h1>

      <el-card full>
        <template #header>
          <h3>Extensions</h3>
        </template>
        <el-card-list flush>
          <el-card-list-item v-for="ext in extensions" :key="ext.id" :selected="ext.active" @click="ext.toggle">{{
            ext.label
          }}</el-card-list-item>
        </el-card-list>
        <!--  -->
      </el-card>
    </div>
  </layout>
</template>

<script>
import Layout from '@/layouts/Base.vue';
import ElCard from '@/components/ElCard.vue';
import ElCardList from '@/components/ElCardList.vue';
import ElCardListItem from '@/components/ElCardListItem.vue';

import { useStore as useExtensionStore } from '@/store/extensions';

export default {
  name: 'Settings',
  components: {
    Layout,
    ElCard,
    ElCardList,
    ElCardListItem,
  },
  setup() {
    const extensionsStore = useExtensionStore();
    console.log('Setup');
    return {
      extensions: extensionsStore.extensions.map((e) => {
        switch (e.id) {
          case 'leaders':
            e.toggle = extensionsStore.toggleLeaders;
            break;
          case 'cities':
            e.toggle = extensionsStore.toggleCities;
            break;
          case 'wonderPack':
            e.toggle = extensionsStore.toggleWonderPack;
            break;
          case 'babel':
            e.toggle = extensionsStore.toggleBabel;
            break;
          case 'armada':
            e.toggle = extensionsStore.toggleArmada;
            break;
          default:
            break;
        }
        return e;
      }),
    };
  },
};
</script>

<style lang="scss">
.settings {
  .el-card__body {
    padding-top: 0;
    padding-bottom: 0;
  }
  .el-card__header h3 {
    margin: 0;
  }
}
</style>
