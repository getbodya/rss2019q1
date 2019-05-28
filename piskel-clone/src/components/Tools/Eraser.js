import Tool from "./Tool";

export default class Eraser extends Tool{
  constructor(){
    super();
  }
  static erasePixel(x,y,size){
    const ctx = document.querySelector('.canvas-box__canvas').getContext('2d');
    const clearPixelData = ctx.getImageData(-size,-size,size,size);
    ctx.putImageData(clearPixelData, x, y);
  }

  static run() {
    const className = '.eraser';
    Eraser.imposeEventToBtn(className)
  }
}
