import { unref, computed } from 'vue';

import * as SCORES from '@/store/gameInfo/score';

export const useMatchScore = ({ players, scoreIds, total = false }) => {
  return {
    score: computed(() => {
      const score = unref(scoreIds).map((scoreId, i) => {
        const row = {
          category: SCORES[scoreId],
          no: i + 1,
        };
        unref(players).forEach((player) => {
          row[`player-${player.id}`] = player.score[scoreId].score;
        });

        return row;
      });

      if (total) {
        const total = {
          category: SCORES.TOTAL,
        };
        unref(players).forEach((player) => {
          total[`player-${player.id}`] = player.total;
        });
        return [...score, total];
      } else {
        return score;
      }
    }),
  };
};
