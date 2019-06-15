import ViewInstance from "../instances/ViewInstance";
import State from "../State/State";
import ToolsPanel from "../ToolsPanel";
import LayerPanel from "../LayerPanel/LayerPanel";
import FramePanel from "../FramePanel/FramePanel";

export default class CanvasPanel extends ViewInstance {
  constructor() {
    super();
  }
  static getCoordinate(e){
    const canvasWidth = 512;
    const {canvasSize} = state;
    const pixelWidth = canvasWidth / canvasSize;
    const x = Math.floor(e.offsetX / pixelWidth);
    const y = Math.floor(e.offsetY / pixelWidth);
    return { x, y }
  }
  static runCursor() {
    const animationCanvas = document.querySelector('.canvas-panel__animation-canvas')
    animationCanvas.addEventListener('mousemove', e => {
      const {toolSize} = state;
      const canvasSize = animationCanvas.width;
      const { x, y } = CanvasPanel.getCoordinate(e);
      const ctx = animationCanvas.getContext('2d');
      ctx.fillStyle = '#ccc';
      ctx.globalAlpha = 0.3;
      ctx.clearRect(0, 0, canvasSize, canvasSize);
      const { rightX, rightY } = ToolsPanel.getRightPixels(x, y, toolSize)
      ctx.fillRect(rightX, rightY, toolSize, toolSize);
      CanvasPanel.runWidget(x, y);
    })
  }
  static runWidget(x, y) {
    const { canvasSize } = state;
    const widgetText = document.querySelector('.canvas-widget__coordinates');
    if (y < 0) {
      y = 0
    }
    widgetText.innerHTML = `[${canvasSize}x${canvasSize}]  ${x}:${y}`
  }
  static runAnimationCanvas() {
    const box = document.querySelector('.canvas-panel__box');
    const staticCanvas = document.querySelector('.canvas-panel__static-canvas');
    const animationCanvas = document.querySelector('.canvas-panel__animation-canvas');
    let isDown = false;
    let startX = 0;
    let startY = 0;
    let imgData;
    box.addEventListener('mousedown', e => {
      isDown = true;
      const { x, y } = CanvasPanel.getCoordinate(e);
      startX = x;
      startY = y;
      const mouseClick = e.button;
      const ctx = staticCanvas.getContext('2d');
      imgData = ctx.getImageData(0, 0, staticCanvas.width, staticCanvas.width)
      const { selectTool, toolSize } = state;
      switch (selectTool) {
        case "tool__pen":
          ToolsPanel.pen(startX, startY, toolSize, mouseClick);
          break;
        case "horisontal-pen":
          ToolsPanel.horisontalMirrorPen(startX, startY, toolSize, mouseClick);
          break;
        case "tool__mirror-pen":
          ToolsPanel.verticalMirrorPen(startX, startY, toolSize, mouseClick);
          break;
        case "tool__eraser":
          ToolsPanel.eraser(startX, startY, toolSize);
          break;
        case "tool__paint-bucket":
          ToolsPanel.paintBucket(startX, startY,mouseClick);
          break;
        case "tool__ligthen":
          ToolsPanel.lighten(startX, startY, mouseClick);
          break;
        case "tool__dithering":
          ToolsPanel.dithering(startX, startY);
          break;
        default:
          break;
      }
    })
    box.addEventListener('mousemove', e => {
      if (!isDown) return;
      const { x, y } = CanvasPanel.getCoordinate(e);
      CanvasPanel.runWidget(x, y)
      const {canvasSize,selectTool} = state;
      const ctx = animationCanvas.getContext('2d');
      const mouseClick = e.which - 1;
      const points = {
        startX,
        startY,
        endX: x,
        endY: y,
      }
      switch (selectTool) {
        case "tool__move":
          ToolsPanel.move(points, imgData);
          break;
        case "tool__stroke":
          ctx.clearRect(0, 0, canvasSize, canvasSize)
          ToolsPanel.stroke(points, mouseClick, animationCanvas);
          break;
        case "tool__reactangle":
          ctx.clearRect(0, 0, canvasSize, canvasSize)
          ToolsPanel.reactangle(points, mouseClick, animationCanvas);
          break;
        case "tool__circle":
          ctx.clearRect(0, 0, canvasSize, canvasSize)
          ToolsPanel.circle(points, mouseClick, animationCanvas)
          break;
        default:
          break;
      }
    })
    box.addEventListener('mouseup', e => {
      isDown = false
      const mouseClick = e.button;
      const { x, y } = CanvasPanel.getCoordinate(e);
      const { selectTool } = state;
      const points = {
        startX,
        startY,
        endX:x,
        endY:y
      }
      switch (selectTool) {
        case "tool__stroke":
          ToolsPanel.stroke(points, mouseClick, staticCanvas);
          break;
        case "tool__reactangle":
          ToolsPanel.reactangle(points, mouseClick, staticCanvas);
          break;
        case "tool__circle":
          ToolsPanel.circle(points, mouseClick, staticCanvas)
          break;
        default:
          break;
      }
      CanvasPanel.transferDataToLayer()
      LayerPanel.transferDataToGluedCanvasAndFrame()
    })
    box.addEventListener('mouseout', e => {
    })
  }
  static onStaticCanvas() {
    const staticTools = [
      "tool__pen",
      "horisontal-pen",
      "both-pen",
      "tool__mirror-pen",
      "tool__eraser",
      "tool__ligthen",
      "tool__dithering",
      "tool__move",
    ]
    const box = document.querySelector('.canvas-panel__box');
    const staticCanvas = document.querySelector('.canvas-panel__static-canvas');
    const gluedCanvas = document.querySelector('.canvas-panel__glued-canvas');
    box.addEventListener('mousedown', () => {
      const { selectTool } = state;
      if (staticTools.includes(selectTool)) {
        staticCanvas.classList.add('on-canvas')
        // gluedCanvas.classList.add('hidden')
      }
    })
    box.addEventListener('mouseup', () => {
      staticCanvas.classList.remove('on-canvas')
      // gluedCanvas.classList.remove('hidden')
    })
    staticCanvas.addEventListener('mouseout', () => {
      staticCanvas.classList.remove('on-canvas')
      // gluedCanvas.classList.remove('hidden')
    })
    box.addEventListener('contextmenu', e => {
      e.preventDefault()
    })
  }
  static runStaticCanvas() {
    const staticCanvas = document.querySelector('.canvas-panel__static-canvas')
    staticCanvas.addEventListener('mousemove', e => {
      const { x, y } = CanvasPanel.getCoordinate(e);
      CanvasPanel.runWidget(x, y)
      const mouseClick = e.which - 1;
      const { selectTool, toolSize } = state;
      switch (selectTool) {
        case "tool__pen":
          ToolsPanel.pen(x, y, toolSize, mouseClick);
          break;
        case "horisontal-pen":
          ToolsPanel.horisontalMirrorPen(x, y, toolSize, mouseClick);
          break;
        case "both-pen":
          ToolsPanel.bothMirrorPen(x, y, toolSize, mouseClick);
          break;
        case "tool__mirror-pen":
          ToolsPanel.verticalMirrorPen(x, y, toolSize, mouseClick);
          break;
        case "tool__eraser":
          ToolsPanel.eraser(x, y, toolSize);
          break;
        case "tool__paint-bucket":
          ToolsPanel.paintBucket(mouseClick);
          break;
        case "tool__ligthen":
          ToolsPanel.lighten(x, y, mouseClick);
          break;
        case "tool__dithering":
          ToolsPanel.dithering(x, y);
          break;
        default:
          break;
      }
    })
    staticCanvas.addEventListener('mouseup', (e) => {
      CanvasPanel.transferDataToLayer()
      LayerPanel.transferDataToGluedCanvasAndFrame()
    })
  }
  static transferDataToLayer() {
    const staticCanvas = document.querySelector('.canvas-panel__static-canvas');
    const canvasCtx = staticCanvas.getContext('2d');
    const { width } = staticCanvas;
    const canvasData = canvasCtx.getImageData(0, 0, width, width);
    const selectLayer = document.querySelector('.layers-panel__layer-list > .selected').childNodes[0]

    const selectLayerCtx = selectLayer.getContext('2d');
    project.saveLayer(selectLayer,canvasData)
    selectLayerCtx.putImageData(canvasData, 0, 0);
  }
  static clearStaticCanvas() {
    const staticCanvas = document.querySelector('.canvas-panel__static-canvas')
    const { width } = staticCanvas
    const ctx = staticCanvas.getContext('2d');
    ctx.clearRect(0, 0, width, width)
  }
  static clearGluedCanvas() {
    const gluedCanvas = document.querySelector('.canvas-panel__glued-canvas')
    const { width } = gluedCanvas
    const ctx = gluedCanvas.getContext('2d');
    ctx.clearRect(0, 0, width, width)
  }
  static run() {
    CanvasPanel.runCursor()
    CanvasPanel.onStaticCanvas()
    CanvasPanel.runAnimationCanvas()
    CanvasPanel.runStaticCanvas()
  }
}
