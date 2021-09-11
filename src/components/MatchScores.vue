<template>
  <score-table v-if="!hideDetail" flush total :tableData="scoreTableRows" :players="props.players" />
  <ul v-else class="matchScores__list">
    <li v-for="(player, i) in playersFiltered" :key="`player-${String(i)}`" class="matchScores__card">
      <div class="matchScores__details">
        <h1>{{ Number(i) + (hideTop3 ? 4 : 1) }}</h1>
      </div>
      <div class="matchScores__details">
        <h4>
          {{ getPlayerName(player.id) }}
          <br />
          <small class="text-secondary">{{ getWonderName(player.wonderId) }}</small>
        </h4>
      </div>
      <div class="matchScores__details">
        <p>{{ player.total }} Points</p>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { computed } from 'vue';
import { usePlayer } from '@/composables/usePlayer';
import { useWonder } from '@/composables/useWonder';

import ScoreTable from '@/components/ScoreTable.vue';

import * as SCORES from '@/store/gameInfo/score';

const { getPlayerName } = usePlayer();
const { getWonderName } = useWonder();

const props = defineProps({
  players: {
    required: true,
    type: Array,
  },
  playersSorted: {
    required: true,
    type: Array,
  },
  scoreIds: {
    required: true,
    type: Array,
  },
  hideTop3: {
    type: Boolean,
    default: false,
  },
  hideDetail: {
    type: Boolean,
    default: false,
  },
});

const playersFiltered = computed(() => {
  if (props.hideTop3) {
    return props.playersSorted.slice(3);
  } else {
    return props.playersSorted;
  }
});

//#region Table
// TODO: can this be shared with GameActive.vue?
const scoreTableRows = computed(() => {
  const score = props.scoreIds.map((scoreId, i) => {
    const row = {
      category: SCORES[scoreId],
      no: i + 1,
    };
    playersFiltered.value.forEach((player) => {
      row[`player-${player.id}`] = player.score[scoreId].score;
    });

    return row;
  });

  const total = {
    category: SCORES.TOTAL,
  };
  playersFiltered.value.forEach((player) => {
    total[`player-${player.id}`] = player.total;
  });

  return [...score, total];
});
//#endregion
</script>

<style lang="scss">
@import '../theme/variables';
@import '../theme/mixins';

.matchScores {
  &__list {
    padding: 0;
    list-style-type: none;
  }

  &__card {
    display: flex;
    align-items: center;
    padding: $--card-padding;
    margin-bottom: 1rem;
    border: 1px solid $--card-border-color;
    border-radius: $--card-border-radius;
    background: $--color-white;
    box-shadow: $--box-shadow-base;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 0;
      > small {
        font-size: 75%;
      }
    }
    p {
      margin: 0;
      white-space: nowrap;
    }
  }

  &__details {
    display: flex;
    flex: 1 1 100%;
    flex-direction: column;
    justify-items: center;
    align-items: flex-start;

    + .matchScores__details {
      margin-left: 1rem;
    }

    &:first-child {
      flex: 1 1 auto;
      // justify-items: flex-start;
    }
    &:last-child {
      flex: 1 1 auto;
      align-items: flex-end;
    }
  }

  &__table {
    .el-table {
      @include flushBody();

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

      &__body-wrapper,
      &__fixed-body-wrapper {
        tr:nth-last-child(2) td {
          border-bottom: 2px solid $--color-primary;
        }
        tr:last-child td {
          background-color: rgba($--color-primary, 0.5) !important;
        }
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
  }
}
</style>
