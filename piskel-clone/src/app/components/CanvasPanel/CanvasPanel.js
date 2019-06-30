import ViewInstance from "../instances/ViewInstance";
import ToolsPanel from "../ToolsPanel";
import LayerPanel from "../LayerPanel/LayerPanel";

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
  static runCanvas() {
    const box = document.querySelector('.canvas-panel__box');
    const staticCanvas = document.querySelector('.canvas-panel__static-canvas');
    const animationCanvas = document.querySelector('.canvas-panel__animation-canvas');
    let isDown = false;
    let startX = 0;
    let startY = 0;
    let imgData;
    const createThisContext = e =>{
      const leftClickCode = 1;
      const rightClickCode = 3;
      const { selectTool, toolSize, primaryColor, secondaryColor } = state;
      const { x, y } = CanvasPanel.getCoordinate(e);
      const points = {
        startX:x,
        startY:y,
      }
      const thisContext = {
        points,
        selectTool,
        toolSize,
      }
      if(e.which === leftClickCode){
        thisContext.color = primaryColor;
      }else if(e.which === rightClickCode){
        thisContext.color = secondaryColor;
      }
      return thisContext
    }
    box.addEventListener('mousedown', e => {
      isDown = true;
      const workingTools = [
        'pen',
        'eraser',
        'lighten',
        'dithering',
        'paintBucket',
        'horisontalMirrorPen',
        'verticalMirrorPen',
        'bothMirrorPen'
      ]

      const { x, y } = CanvasPanel.getCoordinate(e);
      startX = x;
      startY = y;
      const thisContext = createThisContext(e);
      const mouseClick = e.button;
      const ctx = staticCanvas.getContext('2d');
      thisContext.mouseClick = mouseClick;
      const { selectTool } = state;
      if(workingTools.includes(selectTool)){
        ToolsPanel[selectTool].call(thisContext);
      }
      imgData = ctx.getImageData(0, 0, staticCanvas.width, staticCanvas.width)
    })
    box.addEventListener('mousemove', e => {
      if (!isDown) return;
      const { x, y } = CanvasPanel.getCoordinate(e);
      CanvasPanel.runWidget(x, y)
      const {
        selectTool,
      } = state;
      const ctx = animationCanvas.getContext('2d');
      ctx.clearRect(0, 0, animationCanvas.width, animationCanvas.width);
      const mouseClick = e.which - 1;
      const points = {
        startX,
        startY,
        endX: x,
        endY: y,
      }
      const thisContext = createThisContext(e);
      thisContext.canvas = animationCanvas;
      thisContext.mouseClick = mouseClick;
      thisContext.imgData = imgData;
      thisContext.points = points;
      if(selectTool === 'move' || 'eraser'){
        // CanvasPanel.hideGluedCanvas();
      }
      ToolsPanel[selectTool].call(thisContext);
    })
    box.addEventListener('mouseup', e => {
      isDown = false
      const workingTools = ['circle','reactangle','stroke']
      const mouseClick = e.button;
      const { x, y } = CanvasPanel.getCoordinate(e);
      const { selectTool } = state;
      const points = {
        startX,
        startY,
        endX:x,
        endY:y
      }      
      const thisContext = createThisContext(e);
      thisContext.points = points;
      thisContext.mouseClick = mouseClick;
      thisContext.canvas = staticCanvas;
      if(workingTools.includes(selectTool)){
        ToolsPanel[selectTool].call(thisContext);
      }
      CanvasPanel.uncoverGluedCanvas()
      CanvasPanel.transferDataToLayer()
      LayerPanel.transferDataToGluedCanvasAndFrame()
    })
    box.addEventListener('mouseout', e => {
      CanvasPanel.uncoverGluedCanvas()
    })
    box.addEventListener('contextmenu', e => {
      e.preventDefault()
    })
  }
  static transferDataToLayer() {
    const staticCanvas = document.querySelector('.canvas-panel__static-canvas');
    const canvasCtx = staticCanvas.getContext('2d');
    const { width } = staticCanvas;
    const canvasData = canvasCtx.getImageData(0, 0, width, width);
    const selectLayer = document.querySelector('.layers-panel__layer-list > .selected').childNodes[0]

    const selectLayerCtx = selectLayer.getContext('2d');
    project.saveLayer(selectLayer, canvasData)
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
  static hideGluedCanvas(){
    const gluedCanvas = document.querySelector('.canvas-panel__glued-canvas')
    const { classList } = gluedCanvas
    if(!classList.contains('hidden')){
      classList.add('hidden');
    }
  }
  static uncoverGluedCanvas(){
    const gluedCanvas = document.querySelector('.canvas-panel__glued-canvas')
    const { classList } = gluedCanvas
    if(classList.contains('hidden')){
      classList.remove('hidden')
    }
  }
  static run() {
    CanvasPanel.runCursor()
    CanvasPanel.runCanvas()
  }
}
