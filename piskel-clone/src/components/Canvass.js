import tools from './Tools'
import ToolsPanel from './ToolsPanel';
import './App'
export default class Canvas {
  constructor() {
    this.canvas = document.querySelector('.canvas-box__canvas');
  }


  imposeEvent() {
    let isDown = false;
    this.canvas.addEventListener('mousedown', e => {
      window.mouseBtn = e.button;
      isDown = true;
      let x = Math.floor(e.offsetX / 15);
      let y = Math.floor(e.offsetY / 15);
      if (!!state.selectTool) {
        ToolsPanel[state.selectTool](x, y);
      }
    });
    this.canvas.addEventListener('mousemove', e => {
      if (!isDown) return;
      const movingTools = ['pen', 'verticalMirrorPen', 'horisontalMirrorPen', 'bothMirrorPen'];
      let x = Math.floor(e.offsetX / 15);
      let y = Math.floor(e.offsetY / 15);
      movingTools.forEach(toolName => {
        if (state.selectTool === toolName) {
          ToolsPanel[toolName](x, y);
        }
      })
    });
    this.canvas.addEventListener('mouseup', e => {
      const ctx = this.canvas.getContext('2d');
      const data = ctx.getImageData(0, 0, 32, 32);
      state.frames[0].imageData = data;
      frame.renderFrame(data)
      isDown = false;
    });
    this.canvas.addEventListener('mouseout', e => {
      isDown = false;
    });
  }

}
