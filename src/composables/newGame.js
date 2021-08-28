import { ref } from 'vue';
import { ElMessageBox } from 'element-plus';
import store from '@/store';

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
