import Tool from './Tool';
export default class Bright extends Tool {
  constructor() {
    super();
  }
  static changeBright(x, y, mouseClick) {
    const canvas = document.querySelector('.canvas-box__canvas')
    const ctx = canvas.getContext("2d");
    const pixel = ctx.getImageData(x,y,1,1);
    const pixelData = [...pixel.data];
    pixelData.forEach((chanel, id)=>{
      if(id < 3){
        if(mouseClick){
          pixel.data[id] = chanel - 25;
        }else{
          pixel.data[id] = chanel + 25;
        }
      }
    })
    ctx.putImageData(pixel,x,y)
  }
  static run() {
    const className = '.bright';
    Bright.imposeEventToBtn(className)
  }
}
