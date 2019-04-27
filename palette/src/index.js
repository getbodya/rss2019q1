import state from './modules/state'
import paintBucket from './modules/paint-bucket'
import figure from './modules/figure'
import colors from './modules/colors'
import transform from './modules/transform'
import chooseColor from './modules/choose-color'
import { loadColors } from './modules/tools'
import { loadCanvas } from './modules/tools'

const loadAll = () =>{
  loadCanvas();
  loadColors();
}

window.onload = loadAll;