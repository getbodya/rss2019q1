import Tool from "./Tool";

export default class Move extends Tool{
  constructor(){
    super();
  }
  static move(points,imgData){
    const {startX,startY,endX,endY} = points;
    const canvas = document.querySelector('.canvas-box__canvas');
    const ctx = canvas.getContext('2d');
    const shiftX = endX-startX;
    const shiftY = endY-startY;
    ctx.clearRect(0,0,canvas.width,canvas.width)
    ctx.putImageData(imgData,shiftX,shiftY)
  }
  static run() {
    const className = '.move';
    Move.imposeEventToBtn(className)
  }
}
