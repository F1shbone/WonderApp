<template>
  <div :style="{ height: '20rem' }" />
  <bottom-sheet :modelValue="visible" @update:modelValue="close" height="20rem" hideBackdrop hideDrag>
    <div class="keyboard" :style="{ backgroundColor: props.score.bg, color: props.score.color }">
      <div class="keyboard__value">
        {{ value.score }}
        <button @click="emit('nextCell')">
          <kbd><i class="el-icon-right" /></kbd>
        </button>
      </div>
      <div class="keyboard__btns keyboard__scientific" v-if="props.score.id === 'SCIENTIFIC'">
        <button @click="incScienceSymbol('tablet')"><i class="el-icon-arrow-up" /></button>
        <button @click="incScienceSymbol('cog')"><i class="el-icon-arrow-up" /></button>
        <button @click="incScienceSymbol('compass')"><i class="el-icon-arrow-up" /></button>
        <div class="keyboard__scientific--center">
          <el-badge :value="props.value.meta.tablet" type="danger">
            <img alt="Science Tablet" src="../assets/science__tablet.png" />
          </el-badge>
        </div>
        <div class="keyboard__scientific--center">
          <el-badge :value="props.value.meta.cog" type="danger">
            <img alt="Science Tablet" src="../assets/science__cog.png" />
          </el-badge>
        </div>
        <div class="keyboard__scientific--center">
          <el-badge :value="props.value.meta.compass" type="danger">
            <img alt="Science Tablet" src="../assets/science__compass.png" />
          </el-badge>
        </div>
        <button @click="decScienceSymbol('tablet')"><i class="el-icon-arrow-down" /></button>
        <button @click="decScienceSymbol('cog')"><i class="el-icon-arrow-down" /></button>
        <button @click="decScienceSymbol('compass')"><i class="el-icon-arrow-down" /></button>
        <button @click="close">
          <kbd><i class="el-icon-arrow-down" /></kbd>
        </button>
        <el-checkbox-button :checked="props.value.meta.aristotle" @input="toggleAristotle" type="success">
          <img alt="Aristotle" src="../assets/aristotle.png" />
        </el-checkbox-button>
        <span />
      </div>
      <div class="keyboard__btns keyboard__default" v-else>
        <button @click="add('1')">1</button>
        <button @click="add('2')">2</button>
        <button @click="add('3')">3</button>
        <button @click="add('4')">4</button>
        <button @click="add('5')">5</button>
        <button @click="add('6')">6</button>
        <button @click="add('7')">7</button>
        <button @click="add('8')">8</button>
        <button @click="add('9')">9</button>
        <button @click="close">
          <kbd><i class="el-icon-arrow-down" /></kbd>
        </button>
        <button @click="add('0')">0</button>
        <button @click="emit('update:value', { score: 0 })">
          <kbd><i class="el-icon-close" /></kbd>
        </button>
      </div>
    </div>
  </bottom-sheet>
</template>

<script setup>
import BottomSheet from '@/components/BottomSheet.vue';

//#region v-model
const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  value: {
    type: Object,
    required: true,
  },
  score: {
    type: Object,
  },
});
const emit = defineEmits(['update:visible', 'update:value', 'nextCell']);
//#endregion

function close() {
  emit('update:visible', false);
}
function add(number) {
  emit('update:value', {
    ...props.value,
    score: +(props.value.score + number),
  });
}

//#region Scientific
function incScienceSymbol(symbol) {
  emit('update:meta', {
    ...props.value.meta,
    [symbol]: props.value.meta[symbol] + 1,
  });
}
function decScienceSymbol(symbol) {
  emit('update:meta', {
    ...props.value.meta,
    [symbol]: props.value.meta[symbol] === 0 ? 0 : props.value.meta[symbol] - 1,
  });
}
function toggleAristotle() {
  emit('update:meta', {
    ...props.value.meta,
    aristotle: !props.value.meta.aristotle,
  });
}
//#endregion
</script>

<style lang="scss">
@import '../theme/variables';
@import '../theme/mixins';

.keyboard {
  $padding-y: 0.25rem;
  $padding-x: 1rem;
  $font-size: 3rem;
  $line-height: 1.375;

  height: 100%;
  padding-bottom: 20px;

  &__value {
    position: relative;
    background-color: $--color-white;
    color: $--color-black;
    padding: $padding-y $padding-x;
    font-size: $font-size;
    font-weight: 700;
    line-height: $line-height;
    text-align: center;

    button {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      border-radius: 0;
      border: 0 none;
      margin: 0;
      padding: 0;
      font-size: 1.5rem;
    }
  }
  &__btns {
    width: 100%;
    height: calc(100% - 2 * #{$padding-y} - #{$font-size} * #{$line-height});
    border-bottom: $--table-border;
    > * {
      margin: 0;
      background: transparent;
      border-radius: 0;
      border: 0 none;
      border-top: $--table-border;
      border-right: $--table-border;
      font-size: 1rem;
    }
  }
  &__default {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    gap: 1px 1px;

    > *:nth-child(3n) {
      border-right: none;
    }
  }
  &__scientific {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    gap: 1px 1px;

    &--center {
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }

    > * {
      border-top: 0 none;
    }
    > *:nth-child(3n) {
      border-right: none;
    }

    // height: 2.5rem;
    img,
    .el-badge {
      max-height: 2.5rem;
    }
    .el-checkbox-button__inner {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      width: 100%;
      height: 100%;
      background-color: transparent;
      border: none;
    }
    .el-checkbox-button.is-checked .el-checkbox-button__inner {
      background-color: transparent;
      box-shadow: inset 0 0 5px rgb(0 0 0 / 75%);
    }
  }
}
</style>
