<template>
  <div
    :class="{
      scoreTable: true,
      'scoreTable--flush': props.flush,
      'scoreTable--total': props.total,
    }"
  >
    <el-table
      border
      :data="props.tableData"
      :row-class-name="getRowClass"
      @cell-click="onSelectCell"
      ref="scoreTableRef"
    >
      <el-table-column fixed label="" :width="50">
        <template #default="{ row }">
          <div class="scoreTable__rowIcon" v-html="row.category.icon" />
        </template>
      </el-table-column>
      <el-table-column
        v-for="player in props.players"
        :key="`player-${player.id}`"
        :prop="`player-${player.id}`"
        :label="getPlayerName(player.id)"
        :width="0"
      >
        <template #default="{ row, column }">
          <div :class="getCellClass(row.no, column.no)" :id="`scoreTable-cell-${row.no}-${column.no}`">
            {{ row[`player-${player.id}`] }}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { usePlayer } from '@/composables/usePlayer';

const props = defineProps({
  tableData: {
    required: true,
    type: Array,
  },
  players: {
    required: true,
    type: Array,
  },
  selectable: {
    type: Boolean,
    default: false,
  },
  selectedRow: {
    type: Number,
  },
  selectedCol: {
    type: Number,
  },
  flush: {
    type: Boolean,
    default: false,
  },
  total: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['selected']);

const { getPlayerName } = usePlayer();

function getRowClass({ row }) {
  return row.category.class;
}

//#region Cell Selected
function getCellClass(rowNumber, colNumber) {
  const cellClass = ['scoreTable__cell'];

  if (props.selectable && props.selectedRow === rowNumber && props.selectedCol === colNumber) {
    cellClass.push('scoreTable__cell--active');
  }

  return cellClass;
}

function onSelectCell(row, col) {
  if (!props.selectable) return;

  if (col.no === 0 || row.no === undefined) {
    emit('update', {
      row: undefined,
      col: undefined,
    });
  } else {
    emit('update', {
      row: row.no,
      col: col.no,
    });
  }
}
//#endregion

//#region Exposed functions
const scoreTableRef = ref(undefined);
const scrollLeft = () => {
  scoreTableRef.value.$el.querySelector('.el-table__body-wrapper').scrollLeft = 0;
};
const scrollIntoView = () => {
  scoreTableRef.value.$el.querySelector(`#scoreTable-cell-${props.selectedRow}-${props.selectedCol}`).scrollIntoView();
};
defineExpose({
  scrollLeft,
  scrollIntoView,
});
//#endregion
</script>

<style lang="scss">
@import '../theme/variables';
@import '../theme/mixins';

.scoreTable {
  &--flush {
    .el-table {
      @include flushBody();
    }
  }
  &--total {
    .el-table__body-wrapper,
    .el-table__fixed-body-wrapper {
      tr:nth-last-child(2) td {
        border-bottom: 2px solid $--color-primary;
      }
      tr:last-child td {
        background-color: rgba($--color-primary, 0.5) !important;
      }
    }
  }

  &__rowIcon {
    display: flex;
    align-content: center;
    justify-content: center;
    flex: 1 1 100%;

    svg {
      flex: 1 1 100%;
      max-width: 1.5rem;
      max-height: 1.5rem;
    }
  }

  &__cell {
    display: flex;
    justify-content: center;
    padding: 0.75rem;

    &--active {
      box-shadow: inset 0 0 5px rgb(0 0 0 / 75%);
    }
  }

  .el-table {
    &__body tr.hover-row > td,
    &__body tr.hover-row.current-row > td {
      background-color: initial;
    }

    th {
      text-align: center;
    }

    td,
    .cell {
      padding: 0 !important;
    }

    &__row td:first-child {
      color: $--body-color !important;
      background-color: $--body-bg !important;
    }
  }
}
</style>
