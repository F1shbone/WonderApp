<template>
  <bottom-sheet height="20rem" :modelValue="visible" @update:modelValue="close" hideBackdrop @close="close">
    <div :class="`keyboard ${props.score.class}`">
      <div class="keyboard__value">
        {{ value.score }}
        <button @click="emit('nextCell')">
          <kbd><i class="el-icon-right" /></kbd>
        </button>
      </div>
      <div class="keyboard__btns keyboard__stepper keyboard__stepper--4cols" v-if="props.score.id === SCORES.COINS.id">
        <button @click="incMeta('+1')"><i class="el-icon-arrow-up" /></button>
        <button @click="incMeta('+3')"><i class="el-icon-arrow-up" /></button>
        <button @click="incMeta('+6')"><i class="el-icon-arrow-up" /></button>
        <button @click="incMeta('-1')"><i class="el-icon-arrow-up" /></button>
        <div class="keyboard__stepper--center">
          <el-badge :value="props.value.meta['+1']" type="danger">
            <img alt="Coins +1" src="../assets/coin__+1.png" />
          </el-badge>
        </div>
        <div class="keyboard__stepper--center">
          <el-badge :value="props.value.meta['+3']" type="danger">
            <img alt="Coins +3" src="../assets/coin__+3.png" />
          </el-badge>
        </div>
        <div class="keyboard__stepper--center">
          <el-badge :value="props.value.meta['+6']" type="danger">
            <img alt="Coins +6" src="../assets/coin__+6.png" />
          </el-badge>
        </div>
        <div class="keyboard__stepper--center">
          <el-badge :value="props.value.meta['-1']" type="danger">
            <img alt="Coins +6" src="../assets/coin__-1.png" />
          </el-badge>
        </div>
        <button @click="decMeta('+1')"><i class="el-icon-arrow-down" /></button>
        <button @click="decMeta('+3')"><i class="el-icon-arrow-down" /></button>
        <button @click="decMeta('+6')"><i class="el-icon-arrow-down" /></button>
        <button @click="decMeta('-1')"><i class="el-icon-arrow-down" /></button>
      </div>
      <div
        class="keyboard__btns keyboard__stepper keyboard__stepper--4cols"
        v-else-if="props.score.id === SCORES.MILITARY.id"
      >
        <button @click="incMeta('-1')"><i class="el-icon-arrow-up" /></button>
        <button @click="incMeta('+1')"><i class="el-icon-arrow-up" /></button>
        <button @click="incMeta('+3')"><i class="el-icon-arrow-up" /></button>
        <button @click="incMeta('+5')"><i class="el-icon-arrow-up" /></button>
        <div class="keyboard__stepper--center">
          <el-badge :value="props.value.meta['-1']" type="danger">
            <img alt="Science Tablet" src="../assets/military__-1.png" />
          </el-badge>
        </div>
        <div class="keyboard__stepper--center">
          <el-badge :value="props.value.meta['+1']" type="danger">
            <img alt="Science Cog" src="../assets/military__+1.png" />
          </el-badge>
        </div>
        <div class="keyboard__stepper--center">
          <el-badge :value="props.value.meta['+3']" type="danger">
            <img alt="Science Compass" src="../assets/military__+3.png" />
          </el-badge>
        </div>
        <div class="keyboard__stepper--center">
          <el-badge :value="props.value.meta['+5']" type="danger">
            <img alt="Science Compass" src="../assets/military__+5.png" />
          </el-badge>
        </div>
        <button @click="decMeta('-1')"><i class="el-icon-arrow-down" /></button>
        <button @click="decMeta('+1')"><i class="el-icon-arrow-down" /></button>
        <button @click="decMeta('+3')"><i class="el-icon-arrow-down" /></button>
        <button @click="decMeta('+4')"><i class="el-icon-arrow-down" /></button>
      </div>
      <div
        class="keyboard__btns keyboard__stepper keyboard__stepper--4rows"
        v-else-if="props.score.id === SCORES.SCIENTIFIC.id"
      >
        <button @click="incMeta('tablet')"><i class="el-icon-arrow-up" /></button>
        <button @click="incMeta('cog')"><i class="el-icon-arrow-up" /></button>
        <button @click="incMeta('compass')"><i class="el-icon-arrow-up" /></button>
        <div class="keyboard__stepper--center">
          <el-badge :value="props.value.meta.tablet" type="danger">
            <img alt="Science Tablet" src="../assets/science__tablet.png" />
          </el-badge>
        </div>
        <div class="keyboard__stepper--center">
          <el-badge :value="props.value.meta.cog" type="danger">
            <img alt="Science Cog" src="../assets/science__cog.png" />
          </el-badge>
        </div>
        <div class="keyboard__stepper--center">
          <el-badge :value="props.value.meta.compass" type="danger">
            <img alt="Science Compass" src="../assets/science__compass.png" />
          </el-badge>
        </div>
        <button @click="decMeta('tablet')"><i class="el-icon-arrow-down" /></button>
        <button @click="decMeta('cog')"><i class="el-icon-arrow-down" /></button>
        <button @click="decMeta('compass')"><i class="el-icon-arrow-down" /></button>
        <el-checkbox-button
          class="keyboard__stepper--fullRow"
          :checked="props.value.meta.aristotle"
          @input="toggleAristotle"
          type="success"
        >
          <img alt="Aristotle" src="../assets/science__aristotle.png" />
        </el-checkbox-button>
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
        <button @click="negative()">
          <kbd><i class="el-icon-minus" /></kbd>
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
import * as SCORES from '@/store/gameInfo/score';
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
const emit = defineEmits(['update:visible', 'update:value', 'update:meta', 'nextCell']);
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
function negative() {
  emit('update:value', {
    ...props.value,
    score: +(props.value.score * -1),
  });
}

function incMeta(key) {
  emit('update:meta', {
    ...props.value.meta,
    [key]: props.value.meta[key] + 1,
  });
}

function decMeta(key) {
  emit('update:meta', {
    ...props.value.meta,
    [key]: props.value.meta[key] === 0 ? 0 : props.value.meta[key] - 1,
  });
}

//#region Scientific
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
  margin-bottom: 20px;

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
      color: inherit;
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
  &__stepper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 0;

    &--4rows {
      grid-template-rows: 1fr 1fr 1fr 1fr;
    }
    &--4cols {
      grid-template-columns: 1fr 1fr 1fr 1fr;
      > *:nth-child(3n) {
        border-right: $--table-border !important;
      }
      > *:nth-child(4n) {
        border-right: none !important;
      }
    }

    &--fullRow {
      grid-column: 1 / 4;
      border-right: none;
      border-top: $--table-border !important;
    }

    &--center {
      display: flex;
      align-items: center;
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
