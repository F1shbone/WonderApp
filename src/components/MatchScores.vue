<template>
  <score-table v-if="!hideDetail" flush total :tableData="score" :players="props.players" />
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
import { useMatchScore } from '@/composables/useMatchScore';

import ScoreTable from '@/components/ScoreTable.vue';

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
const { score } = useMatchScore({
  players: playersFiltered,
  scoreIds: props.scoreIds,
  total: true,
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
}
</style>
