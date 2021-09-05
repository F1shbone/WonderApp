<template>
  <h1>Stats</h1>

  <div class="matchStats">
    <el-collapse v-model="activeStat" accordion>
      <h4 class="text-secondary">Player</h4>
      <el-card>
        <el-collapse-item name="player__bestCategory">
          <template #title>Best Category</template>
          <el-card-list-item class="matchStats__item" v-for="score in playerBestCategory" :key="score.playerId">
            <div>{{ getPlayerName(score.playerId) }}</div>
            <div :class="`matchStats__category ${SCORES[score.id].class}`">
              <span class="matchStats__points">{{ score.score }} Points</span>
              <span v-html="SCORES[score.id].icon" />
            </div>
          </el-card-list-item>
        </el-collapse-item>
      </el-card>
      <h4 class="text-secondary">Category</h4>
      <el-card>
        <el-collapse-item name="categories__topScorer">
          <template #title>Top Scorer</template>
          <el-card-list-item
            class="matchStats__item"
            v-for="(score, scoreId) in categoryTopScorer"
            :key="String(scoreId)"
          >
            <div>{{ getPlayerName(Number(score.playerId)) }}</div>

            <div :class="`matchStats__category ${SCORES[score.id].class}`">
              <span class="matchStats__points">{{ score.score }} Points</span>
              <span v-html="SCORES[score.id].icon" />
            </div>
          </el-card-list-item>
        </el-collapse-item>
      </el-card>
      <el-card>
        <el-collapse-item name="categories_highestScore">
          <template #title>Highest score</template>
          <div class="matchStats__entry">
            <span class="text-primary">{{ categoryHighestScore.label }}</span> with
            <span class="text-primary">{{ categoryHighestScore.score }}</span> points scored by
            <span class="text-primary">{{ getPlayerName(categoryHighestScore.playerId) }}</span
            >!
          </div>
        </el-collapse-item>
      </el-card>
    </el-collapse>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import * as SCORES from '@/store/gameInfo/score';

import ElCardListItem from '@/components/ElCardListItem.vue';

const store = useStore();

const props = defineProps({
  players: {
    required: true,
    type: Array,
  },
  scoreIds: {
    required: true,
    type: Array,
  },
});
const activeStat = ref(undefined);

function getPlayerName(id) {
  return store.getters['players/player'](id).name;
}

const playerBestCategory = computed(() => {
  return props.players.map((player) => {
    let high = { score: 0 };
    Object.keys(player.score).forEach((scoreId) => {
      if (player.score[scoreId].score > high.score) {
        high = {
          id: scoreId,
          playerId: player.id,
          score: player.score[scoreId].score,
          meta: player.score[scoreId].meta,
        };
      }
    });
    return high;
  });
});

const categoryTopScorer = computed(() => {
  return props.scoreIds.map((scoreId) => {
    return props.players.reduce(
      (acc, player) => {
        if (player.score[scoreId].score > acc?.score) {
          return {
            id: scoreId,
            playerId: player.id,
            score: player.score[scoreId].score,
            meta: player.score[scoreId].meta,
          };
        } else {
          return acc;
        }
      },
      { score: 0 }
    );
  });
  //
});

const categoryHighestScore = computed(() => {
  const category = props.players.reduce(
    (acc, player) => {
      Object.keys(player.score).forEach((scoreId) => {
        if (player.score[scoreId].score > acc.score) {
          acc = {
            playerId: player.id,
            id: scoreId,
            score: player.score[scoreId].score,
            meta: player.score[scoreId].meta,
          };
        }
      });
      return acc;
    },
    { score: 0 }
  );

  category.label = SCORES[category.id].label;
  category.icon = SCORES[category.id].icon;
  category.class = SCORES[category.id].class;

  return category;
});
</script>

<style lang="scss">
@use 'sass:math';
@import '../theme/variables';

.matchStats {
  .el-card + .el-card,
  .el-collapse + .el-card {
    margin-top: 0.5rem;
  }
  .el-card__body {
    padding-top: 0;
    padding-bottom: 0;
  }
  .el-collapse {
    border-top: 0;
    border-bottom: 0;
  }
  .el-collapse-item > div {
    margin-left: -$--card-padding;
    margin-right: -$--card-padding;
    width: calc(100% + 2 * #{$--card-padding});
    box-sizing: border-box;
  }
  .el-collapse-item__header,
  .el-collapse-item__content {
    font-size: 1rem;
  }
  .el-collapse-item__content {
    padding-bottom: 0;
  }
  .el-collapse-item__header {
    padding-left: $--card-padding;
    padding-right: $--card-padding;
    border-bottom: 0;
    background-color: inherit;
    color: inherit;
  }

  &__entry {
    padding: math.div($--card-padding, 2) $--card-padding;
  }

  &__item {
    align-items: center;
    div {
      &:nth-child(1) {
        flex: 1 1 auto;
      }
    }
  }

  &__category {
    display: flex;
    height: 1.5rem;
    padding: 0.3rem 0.6rem;
    border-radius: 5px;
    span,
    svg {
      height: 100%;
    }
    svg {
      width: 1.5rem;
    }
  }

  &__points {
    padding-right: 0.5rem;
  }
}
</style>
