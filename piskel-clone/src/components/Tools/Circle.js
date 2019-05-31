import Tool from "./Tool";
import State from "../../State";

export default class Circle extends Tool {
  constructor() {
    super();
  }
  static paint(points, primColor, mainCanvas) {
    const { startX, startY, endX, endY } = points;
    let canvas;
    const { primaryColor, secondaryColor } = State.getState();
    if (mainCanvas) {
      canvas = document.querySelector(".canvas-box__canvas")
    } else {
      canvas = document.querySelector(".canvas-box__second-canvas")
    }
    const ctx = canvas.getContext("2d");
    if (!primColor) {
      ctx.strokeStyle = primaryColor;
    } else {
      ctx.strokeStyle = secondaryColor;
    }
    const diffX = Math.abs(endX - startX);
    const diffY = Math.abs(endY - startY);
    let radius = 1;
    if(diffX>=diffY){
      radius = diffX
    }else{
      radius = diffY
    }
    ctx.beginPath();
    ctx.arc(startX+0.5, startY+0.5, radius,0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.closePath();
  }

  static run() {
    console.log('asdf')
    const className = '.circle';
    Circle.imposeEventToBtn(className);
  }
}
