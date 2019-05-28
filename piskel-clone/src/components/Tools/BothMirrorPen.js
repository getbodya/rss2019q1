import Tool from './Tool'
import State from '../../State';
export default class BothMirrorPen extends Tool {
  constructor(){
    super();
  }

  static paint(x, y, size,mouseClick) {
    const state = State.getState();
    const {canvasSize} = state;
    const mirrorY = canvasSize - 1 - y;
    const mirrorX = canvasSize - 1 - x;
    BothMirrorPen.paintPixel(x, y, size, mouseClick);
    BothMirrorPen.paintPixel(x, mirrorY, size, mouseClick);
    BothMirrorPen.paintPixel(mirrorX, y, size, mouseClick);
    BothMirrorPen.paintPixel(mirrorX, mirrorY, size, mouseClick);
  }
}
