import Tool from "./Tool";
import State from "../../State";

export default class Stroke extends Tool{
  constructor(){
    super();
  }
  static paint(points,primColor,mainCanvas){
    const { startX, startY, endX, endY } = points;
    // let { endX, endY } = end;
    let canvas;
    const { primaryColor, secondaryColor } = State.getState();
    if(mainCanvas){
      canvas = document.querySelector(".canvas-box__canvas")
    }else{
      canvas = document.querySelector(".canvas-box__second-canvas")
    }
    const ctx = canvas.getContext("2d");
    if(!primColor){
      ctx.strokeStyle= primaryColor;
    }else{
      ctx.strokeStyle = secondaryColor;
    }

    ctx.beginPath();
    ctx.moveTo(startX+0.5, startY+0.5);
    ctx.lineTo(endX+0.5, endY+0.5);
    ctx.closePath();
    ctx.lineWidth = 0.6;
    ctx.stroke();
  }
  static run(){
    const className = '.stroke';
    Stroke.imposeEventToBtn(className)
  }
}
