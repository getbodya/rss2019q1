import State from "../../State";
import Tool from "./Tool";

export default class PaintBucket extends Tool{
  constructor(){
    super()
  }
  static paint(x,y,mouseClick){
    const ctx = document.querySelector('.canvas-box__canvas').getContext('2d');
    const startPixel = ctx.getImageData(x, y, 1, 1).data;
    const state = State.getState();
    const {canvasSize} = state;
    function pixelCompare(x, y) {
      if (-1 < x && x < canvasSize && -1 < y && y < canvasSize) {
        PaintBucket.paintPixel(x, y,1,mouseClick);
        const nearbyPixels = {
          topPixel: {
            pixelX: x,
            pixelY: y - 1,
            data: ctx.getImageData(x, y - 1, 1, 1).data,
          },
          rightPixel: {
            pixelX: x + 1,
            pixelY: y,
            data: ctx.getImageData(x + 1, y, 1, 1).data,
          },
          bottomPixel: {
            pixelX: x,
            pixelY: y + 1,
            data: ctx.getImageData(x, y + 1, 1, 1).data,
          },
          leftPixel: {
            pixelX: x - 1,
            pixelY: y,
            data: ctx.getImageData(x - 1, y, 1, 1).data,
          },
        }
        for (let key in nearbyPixels) {
          const { pixelX, pixelY, data } = nearbyPixels[key];
          if (_.isEqual(startPixel, data)) {
            pixelCompare(pixelX, pixelY)
          }
        }
      }
      return;
    }
    pixelCompare(x, y);
  }
  static run(){
    const className = '.paint-bucket';
    PaintBucket.imposeEventToBtn(className)
  }
}
