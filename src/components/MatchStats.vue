<template>
  <h1>Stats</h1>

  <div class="matchStats">
    <el-collapse v-model="activeStat" accordion>
      <h4 class="text-secondary">Player</h4>
      <el-card>
        <el-collapse-item class="matchStats__entry" name="player__bestCategory">
          <template #title>Best Category</template>
          <el-card-list-item>Simon</el-card-list-item>
          <el-card-list-item>Romina</el-card-list-item>
          <el-card-list-item>Daniel</el-card-list-item>
          <el-card-list-item>Bernhard</el-card-list-item>
          <el-card-list-item>Christian</el-card-list-item>
        </el-collapse-item>
      </el-card>
      <el-card>
        <el-collapse-item class="matchStats__entry" name="player__topScorer">
          <template #title>Top Scorer</template>
          <el-card-list-item>Simon</el-card-list-item>
          <el-card-list-item>Romina</el-card-list-item>
          <el-card-list-item>Daniel</el-card-list-item>
          <el-card-list-item>Bernhard</el-card-list-item>
          <el-card-list-item>Christian</el-card-list-item>
        </el-collapse-item>
      </el-card>
      <h4 class="text-secondary">Category</h4>
      <el-card>
        <el-collapse-item class="matchStats__entry" name="categories_highestScore">
          <template #title>Highest score</template>
          <el-card-list-item>
            {{ highestScoringCategory.label }} with {{ highestScoringCategory.score }} points scored by Player
            {{ getPlayerName(highestScoringCategory.playerId) }}!
          </el-card-list-item>
        </el-collapse-item>
      </el-card>
    </el-collapse>
  </div>
  <!-- - player list -->
  <!--   - [ ] best category for per player -->
  <!--   - [ ] who won each category -> medals/awards -->
  <!-- - single result -->
  <!--   - [ ] highest scoring category -->

  <!-- - [ ] who achieved more than 25%/50% more points than opponents -->
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
});
const activeStat = ref(undefined);

function getPlayerName(id) {
  return store.getters['players/player'](id).name;
}
const highestScoringCategory = computed(() => {
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
  category.bg = SCORES[category.id].bg;
  category.color = SCORES[category.id].color;

  return category;
});
//
</script>

<style lang="scss">
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
}
</style>
