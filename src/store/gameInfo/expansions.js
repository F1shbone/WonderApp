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
  id: 'base',
  label: 'Base Game',
  wonders: [RHODES, ALEXANDRIA, EPHESUS, BABYLON, OLYMPIA, HALICARNASSUS, GIZA],
};

export const LEADERS = {
  id: 'leaders',
  label: 'Leaders',
  wonders: [ROME],
};

export const CITIES = {
  id: 'cities',
  label: 'Cities',
  wonders: [PETRA, BYZANTIUM],
};

export const WONDER_PACK = {
  id: 'wonderPack',
  label: 'Wonder Pack',
  wonders: [GREAT_WALL, ABU_SIMBEL, STONEHENGE, MANNEKEN_PIS],
};

export const BABEL_TOWER = {
  id: 'babelTower',
  label: 'Babel - Tower',
};

export const BABEL_PROJECT = {
  id: 'babelProject',
  label: 'Babel - Great Projects',
};

export const ARMADA = {
  id: 'armada',
  label: 'Armada',
};
