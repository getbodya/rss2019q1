import Tool from './Tool'
import State from '../../State';
export default class HorisontalMirrorPen extends Tool {
  constructor(){
    super();
  }

  static paint(x, y, size,mouseClick) {
    const state = State.getState();
    const {canvasSize} = state;
    const mirrorY = canvasSize - 1 - y;
    HorisontalMirrorPen.paintPixel(x, mirrorY, size,mouseClick)
    HorisontalMirrorPen.paintPixel(x, y, size,mouseClick)
  }
}
