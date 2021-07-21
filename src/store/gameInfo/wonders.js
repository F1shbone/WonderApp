import { CLAY, COIN, GLASSWORKS, LOOM, LUMBER, ORE, PRESS, STONE } from './resources';

export const RHODES = {
  label: {
    long: 'The Colossus of Rhodes',
    short: 'Rhodes',
  },
  variants: {
    a: {
      produces: ORE,
      costs: [
        {
          cost: {
            [LUMBER]: 2,
          },
          reward: {
            vp: 3,
          },
        },
        {
          cost: {
            [CLAY]: 3,
          },
          reward: {
            military: 2,
          },
        },
        {
          cost: {
            [ORE]: 4,
          },
          reward: {
            vp: 7,
          },
        },
      ],
    },
    b: {
      produces: ORE,
      costs: [
        {
          cost: {
            [STONE]: 3,
          },
          reward: {
            vp: 3,
            military: 1,
            coins: 3,
          },
        },
        {
          cost: {
            [ORE]: 4,
          },
          reward: {
            vp: 4,
            military: 1,
            coins: 4,
          },
        },
      ],
    },
  },
};

export const ALEXANDRIA = {
  label: {
    long: 'The Lighthouse of Alexandria',
    short: 'Alexandria',
  },
  variants: {
    a: {
      produces: GLASSWORKS,
      costs: [
        {
          cost: {
            [STONE]: 2,
          },
          reward: {
            vp: 3,
          },
        },
        {
          cost: {
            [ORE]: 2,
          },
          reward: {
            special: ['The player gains a resource of their choice from among the 4 raw material types every turn.'],
          },
        },
        {
          cost: {
            [GLASSWORKS]: 2,
          },
          reward: {
            vp: 7,
          },
        },
      ],
    },
    b: {
      produces: GLASSWORKS,
      costs: [
        {
          cost: {
            [CLAY]: 2,
          },
          reward: {
            special: ['The player gains a resource of their choice from among the 4 raw material types every turn.'],
          },
        },
        {
          cost: {
            [LUMBER]: 2,
          },
          reward: {
            special: [
              'The player gains a resource of their choice from among the 3 manufactured material types every turn.',
            ],
          },
        },
        {
          cost: {
            [STONE]: 3,
          },
          reward: {
            vp: 7,
          },
        },
      ],
    },
  },
};

export const EPHESUS = {
  label: {
    long: 'The Temple of Artemis in Ephesus',
    short: 'Ephesus',
  },
  variants: {
    a: {
      produces: PRESS,
      costs: [
        {
          cost: {
            [STONE]: 2,
          },
          reward: {
            vp: 3,
          },
        },
        {
          cost: {
            [LUMBER]: 2,
          },
          reward: {
            coins: 9,
          },
        },
        {
          cost: {
            [PRESS]: 2,
          },
          reward: {
            vp: 7,
          },
        },
      ],
    },
    b: {
      produces: PRESS,
      costs: [
        {
          cost: {
            [STONE]: 2,
          },
          reward: {
            vp: 2,
            coins: 4,
          },
        },
        {
          cost: {
            [LUMBER]: 2,
          },
          reward: {
            vp: 3,
            coins: 4,
          },
        },
        {
          cost: {
            [PRESS]: 1,
            [LOOM]: 1,
            [GLASSWORKS]: 1,
          },
          reward: {
            vp: 5,
            coins: 4,
          },
        },
      ],
    },
  },
};

export const BABYLON = {
  label: {
    long: 'The Hanging Gardens of Babylon',
    short: 'Babylon',
  },
  variants: {
    a: {
      produces: CLAY,
      costs: [
        {
          cost: {
            [CLAY]: 2,
          },
          reward: {
            vp: 3,
          },
        },
        {
          cost: {
            [LUMBER]: 3,
          },
          reward: {
            special: ['At the end of the game, the player gains an extra scientific symbol of their choice.'],
          },
        },
        {
          cost: {
            [CLAY]: 4,
          },
          reward: {
            vp: 7,
          },
        },
      ],
    },
    b: {
      produces: CLAY,
      costs: [
        {
          cost: {
            [LOOM]: 1,
            [CLAY]: 1,
          },
          reward: {
            vp: 3,
          },
        },
        {
          cost: {
            [GLASSWORKS]: 1,
            [LUMBER]: 2,
          },
          reward: {
            special: [
              "Instead of discarding the last card each round, the player can either: play it by paying it's costs, discard it to earn 3 coins or use it to build the third phase of this wonder",
            ],
          },
        },
        {
          cost: {
            [PRESS]: 1,
            [CLAY]: 3,
          },
          reward: {
            special: ['At the end of the game, the player gains an extra scientific symbol of their choice.'],
          },
        },
      ],
    },
  },
};

export const OLYMPIA = {
  label: {
    long: 'The Statue of Zeus in Olympia',
    short: 'Olympia',
  },
  variants: {
    a: {
      produces: LUMBER,
      costs: [
        {
          cost: {
            [LUMBER]: 2,
          },
          reward: {
            vp: 3,
          },
        },
        {
          cost: {
            [STONE]: 2,
          },
          reward: {
            special: ['A player can, once per age, build a structure of their choice for free.'],
          },
        },
        {
          cost: {
            [ORE]: 2,
          },
          reward: {
            vp: 7,
          },
        },
      ],
    },
    b: {
      produces: LUMBER,
      costs: [
        {
          cost: {
            [LUMBER]: 2,
          },
          reward: {
            special: [
              'The player can purchase raw materials from his/her two neighborig cities for the price of one coin instead of two.',
            ],
          },
        },
        {
          cost: {
            [STONE]: 2,
          },
          reward: {
            vp: 5,
          },
        },
        {
          cost: {
            [LOOM]: 1,
            [ORE]: 2,
          },
          reward: {
            special: ['The player can copy a Guild of their choice built by one of their two neighboring cities.'],
          },
        },
      ],
    },
  },
};

export const HALICARNASSUS = {
  label: {
    long: 'The Mausoleum of Halicarnassus',
    short: 'Halicarnassus',
  },
  variants: {
    a: {
      produces: LOOM,
      costs: [
        {
          cost: {
            [CLAY]: 2,
          },
          reward: {
            vp: 3,
          },
        },
        {
          cost: {
            [ORE]: 3,
          },
          reward: {
            special: [
              'The player can look through all of the cards discarded since the beginning of the game (those discarded for coins as well as those discarded at the end of an age), pick one, and build it for free.',
            ],
          },
        },
        {
          cost: {
            [LOOM]: 2,
          },
          reward: {
            vp: 7,
          },
        },
      ],
    },
    b: {
      produces: LOOM,
      costs: [
        {
          cost: {
            [ORE]: 2,
          },
          reward: {
            vp: 2,
            special: [
              'The player can look through all of the cards discarded since the beginning of the game (those discarded for coins as well as those discarded at the end of an age), pick one, and build it for free.',
            ],
          },
        },
        {
          cost: {
            [CLAY]: 3,
          },
          reward: {
            vp: 1,
            special: [
              'The player can look through all of the cards discarded since the beginning of the game (those discarded for coins as well as those discarded at the end of an age), pick one, and build it for free.',
            ],
          },
        },
        {
          cost: {
            [GLASSWORKS]: 1,
            [PRESS]: 1,
            [LOOM]: 1,
          },
          reward: {
            special: [
              'The player can look through all of the cards discarded since the beginning of the game (those discarded for coins as well as those discarded at the end of an age), pick one, and build it for free.',
            ],
          },
        },
      ],
    },
  },
};

export const GIZA = {
  label: {
    long: 'The Pyramids of Giza',
    short: 'Giza',
  },
  variants: {
    a: {
      produces: STONE,
      costs: [
        {
          cost: {
            [STONE]: 2,
          },
          reward: {
            vp: 3,
          },
        },
        {
          cost: {
            [LUMBER]: 3,
          },
          reward: {
            vp: 5,
          },
        },
        {
          cost: {
            [STONE]: 4,
          },
          reward: {
            vp: 7,
          },
        },
      ],
    },
    b: {
      produces: STONE,
      costs: [
        {
          cost: {
            [LUMBER]: 2,
          },
          reward: {
            vp: 3,
          },
        },
        {
          cost: {
            [STONE]: 3,
          },
          reward: {
            vp: 5,
          },
        },
        {
          cost: {
            [CLAY]: 3,
          },
          reward: {
            vp: 5,
          },
        },
        {
          cost: {
            [PRESS]: 1,
            [STONE]: 3,
          },
          reward: {
            vp: 7,
          },
        },
      ],
    },
  },
};

export const ROME = {
  label: {
    long: 'Rome - Colosseum',
    short: 'Rome',
  },
  variants: {
    a: {
      static: 'Recruit your Leaders for free',
      costs: [
        {
          cost: {
            [CLAY]: 1,
            [LUMBER]: 1,
            [ORE]: 1,
          },
          reward: {
            vp: 4,
          },
        },
        {
          cost: {
            [LOOM]: 1,
            [CLAY]: 1,
            [STONE]: 2,
          },
          reward: {
            vp: 6,
          },
        },
      ],
    },
    b: {
      static:
        'Reduce the recruitment costs of your Leaders by 2 coins. Neighboring cities benefit from a reduction of 1 coin on the recruitment of their Leaders.',
      costs: [
        {
          cost: {
            [CLAY]: 1,
            [LUMBER]: 1,
          },
          reward: {
            coins: 5,
            special: ['The Player immediately draws 4 Leader cards and adds them to his or her hand of Leader cards.'],
          },
        },
        {
          cost: {
            [LOOM]: 1,
            [STONE]: 1,
            [CLAY]: 1,
          },
          reward: {
            vp: 3,
            special: ["The Player can immediately put in play an extra Leader by paying it's cost."],
          },
        },
        {
          cost: {
            [PRESS]: 1,
            [STONE]: 2,
          },
          reward: {
            vp: 3,
            special: ["The Player can immediately put in play an extra Leader by paying it's cost."],
          },
        },
      ],
    },
  },
};

export const PETRA = {
  label: {
    long: 'The Al-Khazneh of Petra',
    short: 'Petra',
  },
  variants: {
    a: {
      produces: CLAY,
      costs: [
        {
          cost: {
            [LUMBER]: 1,
            [STONE]: 1,
          },
          reward: {
            vp: 3,
          },
        },
        {
          cost: {
            [COIN]: 7,
          },
          reward: {
            vp: 7,
          },
        },
        {
          cost: {
            [PRESS]: 1,
            [LUMBER]: 1,
            [STONE]: 2,
          },
          reward: {
            vp: 7,
          },
        },
      ],
    },
    b: {
      produces: CLAY,
      costs: [
        {
          cost: {
            [CLAY]: 2,
            [ORE]: 2,
          },
          reward: {
            vp: 3,
            special: ['Every other Player loses 2 coins.'],
          },
        },
        {
          cost: {
            [COIN]: 14,
          },
          reward: {
            vp: 14,
          },
        },
      ],
    },
  },
};

export const BYZANTIUM = {
  label: {
    long: 'The Hagia Sophia of Byzantium',
    short: 'Byzantium',
  },
  variants: {
    a: {
      produces: STONE,
      costs: [
        {
          cost: {
            [ORE]: 1,
            [CLAY]: 1,
          },
          reward: {
            vp: 3,
          },
        },
        {
          cost: {
            [PRESS]: 1,
            [LUMBER]: 2,
          },
          reward: {
            vp: 2,
            special: ['Earn a diplomacy token.'],
          },
        },
        {
          cost: {
            [LOOM]: 1,
            [GLASSWORKS]: 1,
            [CLAY]: 2,
          },
          reward: {
            vp: 7,
          },
        },
      ],
    },
    b: {
      produces: CLAY,
      costs: [
        {
          cost: {
            [PRESS]: 1,
            [GLASSWORKS]: 1,
            [LUMBER]: 1,
            [ORE]: 1,
          },
          reward: {
            vp: 3,
            special: ['Earn a diplomacy token.'],
          },
        },
        {
          cost: {
            [LOOM]: 1,
            [CLAY]: 1,
            [ORE]: 2,
          },
          reward: {
            vp: 4,
            special: ['Earn a diplomacy token.'],
          },
        },
      ],
    },
  },
};

export const GREAT_WALL = {
  label: {
    long: 'The Great Wall',
    short: 'Great Wall',
  },
  variants: {
    a: {
      produces: LOOM,
      static: "The stages of the Great Wall can be built in any order, ath the player's choice.",
      costs: [
        {
          cost: {
            [LUMBER]: 1,
          },
          reward: {
            coins: 8,
          },
        },
        {
          cost: {
            [PRESS]: 1,
            [GLASSWORKS]: 1,
            [LOOM]: 1,
          },
          reward: {
            special: ['At the end of the game, the player gains an extra scientific symbol of their choice.'],
          },
        },
        {
          cost: {
            [STONE]: 3,
          },
          reward: {
            military: 2,
          },
        },
        {
          cost: {
            [ORE]: 3,
          },
          reward: {
            special: [
              'The player can look through all of the cards discarded since the beginning of the game (those discarded for coins as well as those discarded at the end of an age), pick one, and build it for free.',
            ],
          },
        },
      ],
    },
    b: {
      produces: LOOM,
      static: "The stages of the Great Wall can be built in any order, ath the player's choice.",
      costs: [
        {
          cost: {
            [PRESS]: 1,
            [LUMBER]: 1,
          },
          reward: {
            coins: 8,
            special: ['The two neighboring cities each also take 2 coins from the bank.'],
          },
        },
        {
          cost: {
            [ORE]: 1,
            [CLAY]: 2,
          },
          reward: {
            special: [
              'At the end of the game, the mask copies the scientific symbol of a green card present in one of the two neighboring cities',
            ],
          },
        },
        {
          cost: {
            [PRESS]: 1,
            [LUMBER]: 2,
          },
          reward: {
            special: ['Earn a diplomacy token.', 'Every other Player loses 2 coins.'],
          },
        },
        {
          cost: {
            [STONE]: 2,
          },
          reward: {
            special: [
              "The Player benefits, once each turn, from a resource of the player's choice from among those not produced by their city.",
            ],
          },
        },
      ],
    },
  },
};

export const ABU_SIMBEL = {
  label: {
    long: 'Abu Simbel',
    short: 'Abu Simbel',
  },
  variants: {
    a: {
      produces: PRESS,
      costs: [
        {
          cost: {
            [STONE]: 1,
            [CLAY]: 1,
          },
          reward: {
            vp: 3,
          },
        },
        {
          cost: {
            [LUMBER]: 1,
            [ORE]: 1,
          },
          reward: {
            vp: 5,
          },
        },
        {
          cost: {
            [GLASSWORKS]: 1,
            [LOOM]: 1,
            [STONE]: 2,
          },
          reward: {
            special: [
              "At the moment when this Wonder Stage is built, the player must choose one of their previously recruited Leaders and place it face-down on the space reserved for that on their board. The player can no longer benefit from the chpsen Leader's effect. At the end of the game, the player scores a number of points equivalent to double the Leader's cost.",
            ],
          },
        },
      ],
    },
    b: {
      produces: PRESS,
      costs: [
        {
          cost: {
            [LOOM]: 1,
            [CLAY]: 2,
          },
          reward: {
            special: [
              "At the moment when this Wonder Stage is built, the player must choose one of their previously recruited Leaders and place it face-down on the space reserved for that on their board. The player can no longer benefit from the chpsen Leader's effect. At the end of the game, the player scores a number of points equivalent to double the Leader's cost.",
            ],
          },
        },
        {
          cost: {
            [GLASSWORKS]: 1,
            [LUMBER]: 2,
          },
          reward: {
            special: [
              "At the moment when this Wonder Stage is built, the player must choose one of their previously recruited Leaders and place it face-down on the space reserved for that on their board. The player can no longer benefit from the chpsen Leader's effect. At the end of the game, the player scores a number of points equivalent to double the Leader's cost.",
            ],
          },
        },
      ],
    },
  },
};

export const STONEHENGE = {
  label: {
    long: 'Stonehenge',
    short: 'Stonehenge',
  },
  variants: {
    a: {
      produces: LUMBER,
      costs: [
        {
          cost: {
            [ORE]: 1,
            [CLAY]: 1,
          },
          reward: {
            vp: 3,
          },
        },
        {
          cost: {
            [PRESS]: 1,
            [CLAY]: 2,
          },
          reward: {
            vp: 5,
          },
        },
        {
          cost: {
            [LOOM]: 1,
            [LUMBER]: 3,
          },
          reward: {
            special: [
              'At the end of the game, the Player scores 2 victory points for each Stone resource present on their brown cards.',
            ],
          },
        },
      ],
    },
    b: {
      produces: LUMBER,
      costs: [
        {
          cost: {
            [ORE]: 3,
          },
          reward: {
            special: [
              "This Stage grants 1 coin for each Stone resource symbol presen on the player's borwn cards when it's built. At the end of the game, this Stage scores 1 victory point for each Stone resource symbol present on the player's brown cards.",
            ],
          },
        },
        {
          cost: {
            [PRESS]: 1,
            [CLAY]: 3,
          },
          reward: {
            special: [
              'At the end of the game, the player flips face-up the card used to build this Stage. Then, the player scores 1 victory point for each card of the color present in both meighboring cities',
            ],
          },
        },
      ],
    },
  },
};

export const MANNEKEN_PIS = {
  label: {
    long: 'Manneken Pis',
    short: 'Manneken Pos',
  },
  variants: {
    a: {
      static: 'Begin the game with 4 extra coins.',
      costs: [
        {
          cost: {},
          reward: {
            special: [
              'The Player applies the effect of the first Stage of the Wonder board to their left. This includes the construction costs.',
            ],
          },
        },
        {
          cost: {},
          reward: {
            special: [
              'The Player applies the effect of the first Stage of the Wonder board to their right. This includes the construction costs.',
            ],
          },
        },
        {
          cost: {},
          reward: {
            special: [
              'The Player applies the effect of the first Stage of the Wonder board to their left. This includes the construction costs.',
            ],
          },
        },
      ],
    },
    b: {
      static: 'Begin the game with 4 extra coins.',
      costs: [
        {
          cost: {
            [GLASSWORKS]: 1,
            [PRESS]: 1,
            [LOOM]: 1,
            [STONE]: 1,
            [LUMBER]: 1,
            [CLAY]: 1,
            [ORE]: 1,
          },
          reward: {
            vp: 7,
            coins: 7,
            military: 1,
          },
        },
      ],
    },
  },
};
