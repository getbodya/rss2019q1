import State from "../../../State";
import Pen from "../../Tools/Pen";
import VerticalMirrorPen from "../../Tools/VerticalMirrorPen";
import HorisontalMirrorPen from "../../Tools/HorisontalMirrorPen";
import BothMirrorPen from "../../Tools/BothMirrorPen";
import Eraser from "../../Tools/Eraser";
import PaintBucket from "../../Tools/PaintBucket";
import Canvas from "../view/Canvas";
import Stroke from "../../Tools/Stroke";
import Bright from "../../Tools/Bright";
import Move from "../../Tools/Move";
import Layers from "../../Layers";

const imposeEventToCanvas = (canvas) => {
  let isDown = false;
  let startX = 0;
  let startY = 0;
  let endX = 0;
  let endY = 0;
  let imgData;
  canvas.addEventListener('mousedown', e => {

    e.preventDefault();
    isDown = true;
    const ctx = canvas.getContext('2d');
    imgData = ctx.getImageData(0,0,canvas.width,canvas.width)
    const mouseClick = e.button;
    const state = State.getState();
    const { selectTool, toolSize, canvasSize } = state;
    const canvasBoxWidth = document.querySelector('.canvas-box__canvas').offsetWidth;
    const pixelWidth = canvasBoxWidth / canvasSize;
    startX = Math.floor(e.offsetX / pixelWidth);
    startY = Math.floor(e.offsetY / pixelWidth);
    switch (selectTool) {
      case "pen":
        Pen.paint(startX, startY, toolSize, mouseClick);
        break;
      case "verticalMirrorPen":
        VerticalMirrorPen.paint(startX, startY, toolSize, mouseClick);
        break;
      case "horisontalMirrorPen":
        HorisontalMirrorPen.paint(startX, startY, toolSize, mouseClick);
        break;
      case "bothMirrorPen":
        BothMirrorPen.paint(startX, startY, toolSize, mouseClick);
        break;
      case "eraser":
        Eraser.erasePixel(startX, startY, toolSize, mouseClick);
        break;
      case "paintBucket":
        PaintBucket.paint(startX, startY, mouseClick);
        break;
      case "bright":
        Bright.changeBright(startX, startY, mouseClick);
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
    endX = x;
    endY = y;

    const points = {
      startX,
      startY,
      endX,
      endY
    }
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
      case "bright":
        Bright.changeBright(x, y, mouseClick);
        break;
      case "move":
        Move.move(points, imgData);
        break;
      default:
        break;
    }
  });
  canvas.addEventListener('mouseup', e => {
    e.preventDefault();
    isDown = false;
    const mouseClick = e.button;
    const state = State.getState();
    const { selectTool, toolSize, canvasSize } = state;
    const canvasBoxWidth = document.querySelector('.canvas-box__canvas').offsetWidth;
    const pixelWidth = canvasBoxWidth / canvasSize;
    endX = Math.floor(e.offsetX / pixelWidth);
    endY = Math.floor(e.offsetY / pixelWidth);
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

    const ctx = canvas.getContext('2d');
    const data = ctx.getImageData(0, 0, 32, 32);
    Canvas.transferDataToFrame();
    Canvas.transferDataToLayer();
    Layers.gluingLayrs();
  });
  canvas.addEventListener('mouseout', e => {
    isDown = false;
  });
  canvas.addEventListener('contextmenu ', e => {
    e.preventDefault()
  });
}
export default imposeEventToCanvas;
