import Tool from './Tool'
import State from '../../State';
export default class VerticalMirrorPen extends Tool {
  constructor(){
    super();
  }

  static paint(x, y, size,mouseClick) {
    const state = State.getState();
    const {canvasSize} = state;
    const mirrorX = canvasSize - 1 - x;
    VerticalMirrorPen.paintPixel(mirrorX, y, size,mouseClick)
    VerticalMirrorPen.paintPixel(x, y, size,mouseClick)
  }
  static run() {
    const className = '.mirror-pen';
    VerticalMirrorPen.imposeEventToBtn(className)
  }
}
