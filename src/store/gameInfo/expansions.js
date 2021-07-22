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
};

export const LEADERS = {
  id: 'LEADERS',
  label: 'Leaders',
  wonders: [ROME],
};

export const CITIES = {
  id: 'CITIES',
  label: 'Cities',
  wonders: [PETRA, BYZANTIUM],
};

export const WONDER_PACK = {
  id: 'WONDER_PACK',
  label: 'Wonder Pack',
  wonders: [GREAT_WALL, ABU_SIMBEL, STONEHENGE, MANNEKEN_PIS],
};

export const BABEL_TOWER = {
  id: 'BABEL_TOWER',
  label: 'Babel - Tower',
};

export const BABEL_PROJECT = {
  id: 'BABEL_PROJECT',
  label: 'Babel - Great Projects',
};

export const ARMADA = {
  id: 'ARMADA',
  label: 'Armada',
};
