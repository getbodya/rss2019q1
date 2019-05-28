import State from "../../../State";
import Pen from "../../Tools";
import VerticalMirrorPen from "../../Tools/VerticalMirrorPen";
import HorisontalMirrorPen from "../../Tools/HorisontalMirrorPen";
import BothMirrorPen from "../../Tools/BothMirrorPen";
import Eraser from "../../Tools/Eraser";
import PaintBucket from "../../Tools/PaintBucket";

const imposeEventToCanvas = (canvas) => {
  let isDown = false;

  canvas.addEventListener('mousedown', e => {
    e.preventDefault();
    const mouseClick = e.button;
    isDown = true;
    const state = State.getState();
    const { selectTool, toolSize, canvasSize } = state;
    const canvasBoxWidth = document.querySelector('.canvas-box__canvas').offsetWidth;
    const pixelWidth = canvasBoxWidth / canvasSize;
    let x = Math.floor(e.offsetX / pixelWidth);
    let y = Math.floor(e.offsetY / pixelWidth);
    switch (selectTool) {
      case "pen":
        Pen.paint(x, y, toolSize, mouseClick );
        break;
      case "verticalMirrorPen":
        VerticalMirrorPen.paint(x, y, toolSize, mouseClick );
        break;
      case "horisontalMirrorPen":
        HorisontalMirrorPen.paint(x, y, toolSize, mouseClick );
        break;
      case "bothMirrorPen":
        BothMirrorPen.paint(x, y, toolSize, mouseClick );
        break;
      case "eraser":
        Eraser.erasePixel(x, y, toolSize, mouseClick );
        break;
      case "paintBucket":
        PaintBucket.paint(x, y, mouseClick );
        break;

      default:
        break;
    }

  });
  canvas.addEventListener('mousemove', e => {
    if (!isDown) return;
    const mouseClick = e.which - 1;
    const state = State.getState();
    const { selectTool, toolSize, canvasSize } = state;
    const canvasBoxWidth = document.querySelector('.canvas-box__canvas').offsetWidth;
    const pixelWidth = canvasBoxWidth / canvasSize;
    let x = Math.floor(e.offsetX / pixelWidth);
    let y = Math.floor(e.offsetY / pixelWidth);
    switch (selectTool) {
      case "pen":
        Pen.paint(x, y, toolSize, mouseClick);
        break;
      case "verticalMirrorPen":
        VerticalMirrorPen.paint(x, y, toolSize, mouseClick);
        break;
      case "horisontalMirrorPen":
        HorisontalMirrorPen.paint(x, y, toolSize, mouseClick);
        break;

      case "bothMirrorPen":
        BothMirrorPen.paint(x, y, toolSize, mouseClick);
        break;
      case "eraser":
        Eraser.erasePixel(x, y, toolSize, mouseClick);
        break;
      default:
        break;
    }
  });
  canvas.addEventListener('mouseup', e => {
    e.preventDefault();


    const ctx = canvas.getContext('2d');
    const data = ctx.getImageData(0, 0, 32, 32);
    isDown = false;
  });
  canvas.addEventListener('mouseout', e => {
    isDown = false;
  });
  canvas.addEventListener('contextmenu ', e => {
    e.preventDefault()
  });
}
export default imposeEventToCanvas;
