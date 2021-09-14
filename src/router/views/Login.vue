<template>
  <signed-out>
    <div class="login">
      <h1>Login</h1>

      <el-form :model="form" label-position="top" class="login__form" @submit.prevent="onSubmit">
        <el-form-item label="E-Mail" class="login__form-item">
          <el-input v-model="form.user" />
        </el-form-item>
        <el-form-item label="Password" class="login__form-item">
          <el-input v-model="form.password" show-password />
        </el-form-item>

        <el-button type="primary" native-type="submit" class="el-button--block">Login</el-button>
      </el-form>

      <img src="../../assets/splash.webp" alt="splash" class="login__splash" />
    </div>
  </signed-out>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useFirebase } from '../../firebase/';

import SignedOut from '../layouts/SignedOut.vue';

const store = useStore();
const router = useRouter();
const { auth } = useFirebase();

const form = ref({
  user: '',
  password: '',
});

const onSubmit = async () => {
  try {
    await auth.signIn(form.value.user, form.value.password);
    await Promise.all([
      store.dispatch('expansions/initFromFirestore'),
      store.dispatch('players/initFromFirestore'),
      //
    ]);

    router.push({ path: '/game/active' });
  } catch (error) {
    console.warn(error);
  }
};
</script>

<style lang="scss">
@import '../../theme/variables';
@import '../../theme/mixins';

.login {
  @include flushBody();

  position: relative;
  height: calc(100% + #{$--main-padding * 2});
  margin-top: -$--main-padding;
  margin-bottom: -$--main-padding;
  padding: $--main-padding;
  background-color: $--color-info-lighter;
  box-sizing: border-box;
  overflow: hidden;

  &__form {
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    left: $--main-padding;
    right: $--main-padding;
  }
  &__form-item {
    margin-bottom: 0.625rem;

    label.el-form-item__label {
      padding: 0;
      font-size: 1.125rem;
      text-align: center;
    }
  }

  &__splash {
    position: absolute;
    bottom: 0;
    left: -10%;
    right: -10%;
    max-width: 120%;
    filter: saturate(0.5);
  }
}
</style>
