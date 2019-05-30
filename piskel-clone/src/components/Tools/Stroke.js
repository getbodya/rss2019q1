import Tool from "./Tool";
import State from "../../State";

export default class Stroke extends Tool{
  constructor(){

  }
  static paint(start,end,primColor){
    const pixelList = [];
    const { startX, startY } = start;
    const { endX, endY } = end;
    const { primaryColor, secondaryColor } = State.getState();
    const canvas = document.querySelector(".canvas-box__second-canvas"),
    ctx = canvas.getContext("2d");
    if(!primColor){
      ctx.strokeStyle= primaryColor;
    }else{
      ctx.strokeStyle = secondaryColor;
    }

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.closePath();
    ctx.lineWidth = 0.5;
    ctx.lineJoin ='round';
    ctx.stroke();
  }
  static run(){
    const className = '.stroke';

    Stroke.imposeEventToBtn(className)
  }
}
