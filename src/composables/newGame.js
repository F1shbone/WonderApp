import { ref } from 'vue';
import { ElMessageBox } from 'element-plus';
import store from '@/store';
import router from '@/router';

let isNewGameDialogVisible = ref(false);

export default function () {
  return {
    showNewGame: async () => {
      if (store.hasModule('match')) {
        try {
          await ElMessageBox.confirm('Do you want to quit the current game and create a new game?', 'New Game', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
            buttonSize: 'large',
          });
          if (router.currentRoute.value.path === '/game/active') {
            await router.replace('/game/empty');
          }
          store.unregisterModule('match');
        } catch {
          return;
        }
      }
      isNewGameDialogVisible.value = true;
    },
    isNewGameDialogVisible,
  };
}
