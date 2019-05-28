import Tool from './Tool';
export default class Pen extends Tool {
  constructor() {
    super();
  }
  static paint(x, y, size,mouseClick) {
    Pen.paintPixel(x, y, size,mouseClick)
  }
  static run() {
    const className = '.pen';
    Pen.imposeEventToBtn(className)
  }
}
