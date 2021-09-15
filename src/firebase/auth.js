import { browserLocalPersistence, getAuth, setPersistence, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { ref } from 'vue';

export default function create() {
  const $auth = getAuth();
  const $user = ref({
    uid: undefined,
    email: undefined,
  });
  const isReady = new Promise((resolve) => {
    $auth.onAuthStateChanged((user) => {
      if (user !== null) {
        $user.value.uid = user.uid;
        $user.value.email = user.email;
      }
      resolve($user);
    });
  });

  return function useFireAuth() {
    return {
      isReady,
      user: $user,
      signIn: async (email, password) => {
        await setPersistence($auth, browserLocalPersistence);
        const { user } = await signInWithEmailAndPassword($auth, email, password);

        $user.value.uid = user.uid;
        $user.value.email = user.email;

        return $user;
      },
      signOut: async () => {
        $user.value.uid = undefined;
        $user.value.email = undefined;

        await signOut($auth);
      },
    };
  };
}
