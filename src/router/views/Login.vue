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
    </div>
  </signed-out>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useFireAuth } from '../../firebase/';

import SignedOut from '../layouts/SignedOut.vue';

const router = useRouter();
const { signIn } = useFireAuth();

const form = ref({
  user: '',
  password: '',
});

const onSubmit = async () => {
  try {
    await signIn(form.value.user, form.value.password);

    router.push({ path: router.currentRoute.value.query?.redirect ?? '/game/empty' });
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
}
</style>
