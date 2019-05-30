import imposeEventToCanvas from '../controller/event';
import State from '../../../State';
import Stroke from '../../Tools/Stroke';
export default class SecondCanvas {
  constructor() {
  }
  static draw() {
    const container = document.querySelector('.canvas-box__container');

    let isDown = false
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    container.addEventListener('mousedown', e => {

      console.log('second')
      e.preventDefault();
      const state = State.getState();
      const { selectTool, toolSize, canvasSize } = state;
      if (selectTool === 'stroke') {

      }
      const mouseClick = e.button;
      isDown = true;
      const canvasBoxWidth = document.querySelector('.canvas-box__canvas').offsetWidth;
      const pixelWidth = canvasBoxWidth / canvasSize;
      startX = Math.floor(e.offsetX / pixelWidth);
      startY = Math.floor(e.offsetY / pixelWidth);
      switch (selectTool) {
        case "stroke":
          document.querySelector('.canvas-box__second-canvas').style.zIndex = '1000';

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
      let x = Math.floor(e.offsetX / pixelWidth);
      let y = Math.floor(e.offsetY / pixelWidth);
      endX = x;
      endY = y;
      const start = {
        startX,
        startY,
      }
      const end = {
        endX,
        endY,
      }
      switch (selectTool) {
        case "stroke":
          Stroke.paint(start, end, mouseClick);
          break;
        default:
          break;
      }
    })
    container.addEventListener('mouseup', e => {
      isDown=false
    })
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
