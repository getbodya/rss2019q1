import Tool from "./Tool";
import State from "../../State";

export default class Reactangle extends Tool {
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
    const rectW = endX - startX;
    const rectH = endY - startY;
    ctx.beginPath();
    ctx.rect(startX+0.5, startY+0.5, rectW, rectH);
    ctx.closePath();
    ctx.stroke();
  }

  static run() {
    console.log('asdf')
    const className = '.reactangle';
    Reactangle.imposeEventToBtn(className);
  }
}
