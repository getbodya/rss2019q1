import imposeEventToCanvas from '../controller/event';
import State from '../../../State';
import Stroke from '../../Tools/Stroke';
import Canvas from './Canvas';
import Reactangle from '../../Tools/Reactangle';
import Circle from '../../Tools/Circle';
export default class SecondCanvas {
  constructor() {
  }
  static changeSize(newSize){
    const canvas = document.querySelector('.canvas-box__second-canvas');
    canvas.setAttribute('width', `${newSize}px`);
    canvas.setAttribute('height',`${newSize}px`);
  }
  static draw() {
    const container = document.querySelector('.canvas-box__container');
    let isDown = false
    let startX = 0;
    let startY = 0;
    container.addEventListener('mousedown', e => {
      e.preventDefault();
      const state = State.getState();
      const { selectTool, toolSize, canvasSize } = state;
      const mouseClick = e.button;
      isDown = true;
      const canvasBoxWidth = document.querySelector('.canvas-box__canvas').offsetWidth;
      const pixelWidth = canvasBoxWidth / canvasSize;
      startX = Math.floor(e.offsetX / pixelWidth);
      startY = Math.floor(e.offsetY / pixelWidth);
      switch (selectTool) {
        case "stroke":
          Stroke.paint(startX, startY, mouseClick);
          break;


        default:
          break;
      }
    })
    container.addEventListener('mousemove', e => {
      if (!isDown) return;

      const mouseClick = e.which - 1;
      const state = State.getState();
      const { selectTool, toolSize, canvasSize } = state;
      const canvas = document.querySelector(".canvas-box__second-canvas"),
      ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvasSize, canvasSize)
      const canvasBoxWidth = document.querySelector('.canvas-box__canvas').offsetWidth;
      const pixelWidth = canvasBoxWidth / canvasSize;
      let endX = Math.floor(e.offsetX / pixelWidth);
      let endY = Math.floor(e.offsetY / pixelWidth);
      // endX = x;
      // endY = y;
      const points = {
        startX,
        startY,
        endX,
        endY
      }
      switch (selectTool) {
        case "stroke":
          Stroke.paint(points, mouseClick,false);
          break;
        case "reactangle":
          Reactangle.paint(points, mouseClick,false);
          // Stroke.paint(points, mouseClick,false);
          break;
          break;
        case "circle":
          Circle.paint(points, mouseClick,false)
          // Reactangle.paint(points, mouseClick,false);
          // Stroke.paint(points, mouseClick,false);
          break;
        default:
          break;
      }
    })
    container.addEventListener('mouseup', e => {
      isDown=false;
      const mouseClick = e.button;
      const state = State.getState();
      const { selectTool, toolSize, canvasSize } = state;
      const canvas = document.querySelector(".canvas-box__second-canvas");
      const canvasBoxWidth = document.querySelector('.canvas-box__second-canvas').offsetWidth;

      const pixelWidth = canvasBoxWidth / canvasSize;

      let endX = Math.floor(e.offsetX / pixelWidth);
      let endY = Math.floor(e.offsetY / pixelWidth);

      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvasSize, canvasSize)
      const points = {
        startX,
        startY,
        endX,
        endY
      }
      switch (selectTool) {
        case "stroke":
          Stroke.paint(points, mouseClick,true);
          Canvas.transferDataToFrame();
          break;
          case "reactangle":
          Reactangle.paint(points, mouseClick,true);
          Canvas.transferDataToFrame();
          break;
          case "circle":
              Circle.paint(points, mouseClick,true)
              Canvas.transferDataToFrame();
          break;
        default:
          break;
      }

    })
  }
  static drawToMainCanvas(points){

  }
  static makeCanvas(size) {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('class', 'canvas-box__second-canvas');
    canvas.setAttribute('width', `${size}px`);
    canvas.setAttribute('height', `${size}px`);
    return canvas;
  }
  static renderCanvas() {
    const container = document.querySelector('.canvas-box__container');
    const state = State.getState();
    const { canvasSize } = state
    const canvas = SecondCanvas.makeCanvas(canvasSize);
    imposeEventToCanvas(canvas);
    canvas.oncontextmenu = () => { return false };
    container.appendChild(canvas);
    SecondCanvas.draw()
    // Canvas.runPrecanvas();
  }
}
