// import { state, setState } from './modules/state';

// // import figure from './modules/figure';
// import './modules/figure';
// import colors from './modules/colors';

// import paintBucket from './modules/paint-bucket';
// import transform from './modules/transform';
// import chooseColor from './modules/choose-color';
// import move from './modules/move';

// import { loadColors, loadCanvas } from './modules/tools';

// import body from './modules/hot-keys';

import './modules/state';

// import figure from './modules/figure';
import './modules/figure';
import './modules/colors';

import './modules/paint-bucket';
import './modules/transform';
import './modules/choose-color';
import './modules/move';

import { loadColors, loadCanvas } from './modules/tools';

import './modules/hot-keys';

const loadAll = () => {
  loadCanvas();
  loadColors();
};
window.onload = loadAll;
