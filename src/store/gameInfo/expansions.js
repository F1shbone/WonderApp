import {
  CITY,
  CIVIC,
  COINS,
  COMMERCIAL,
  GUILDS,
  ISLAND,
  LEADER,
  MILITARY,
  NAVY,
  SCIENTIFIC,
  TOWER,
  WONDER,
} from './score';
import {
  ABU_SIMBEL,
  ALEXANDRIA,
  BABYLON,
  BYZANTIUM,
  EPHESUS,
  GIZA,
  GREAT_WALL,
  HALICARNASSUS,
  MANNEKEN_PIS,
  OLYMPIA,
  PETRA,
  RHODES,
  ROME,
  STONEHENGE,
} from './wonders';

export const BASE = {
  id: 'BASE',
  label: 'Base Game',
  wonders: [RHODES, ALEXANDRIA, EPHESUS, BABYLON, OLYMPIA, HALICARNASSUS, GIZA],
  score: [WONDER, COINS, MILITARY, CIVIC, COMMERCIAL, SCIENTIFIC, GUILDS],
};

export const LEADERS = {
  id: 'LEADERS',
  label: 'Leaders',
  wonders: [ROME],
  score: [LEADER],
};

export const CITIES = {
  id: 'CITIES',
  label: 'Cities',
  wonders: [PETRA, BYZANTIUM],
  score: [CITY],
};

export const WONDER_PACK = {
  id: 'WONDER_PACK',
  label: 'Wonder Pack',
  wonders: [GREAT_WALL, ABU_SIMBEL, STONEHENGE, MANNEKEN_PIS],
  score: [],
};

export const BABEL_TOWER = {
  id: 'BABEL_TOWER',
  label: 'Babel - Tower',
  wonders: [],
  score: [TOWER],
};

export const BABEL_PROJECT = {
  id: 'BABEL_PROJECT',
  label: 'Babel - Great Projects',
  wonders: [],
  score: [],
};

export const ARMADA = {
  id: 'ARMADA',
  label: 'Armada',
  wonders: [],
  score: [NAVY, ISLAND],
};
