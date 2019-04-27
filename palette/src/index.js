// import { state } from './modules/state'

import figure from './modules/figure'
import colors from './modules/colors'

import paintBucket from './modules/paint-bucket'
import transform from './modules/transform'
import chooseColor from './modules/choose-color'
import move from './modules/move'

import { loadColors } from './modules/tools'
import { loadCanvas } from './modules/tools'


const loadAll = () =>{
  loadCanvas();
  loadColors();
}
window.onload = loadAll;