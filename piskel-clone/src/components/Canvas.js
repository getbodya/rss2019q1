import tools from './Tools'
export default class Canvas {
  constructor() {
    this.canvas = document.querySelector('.canvas-box__canvas');
  }


  imposeEvent() {
    let isDown;

    this.canvas.addEventListener('mousedown', e => {
      isDown = true;
      let x = Math.floor(e.offsetX/15);
      let y = Math.floor(e.offsetY/15);
      switch (state.selectTool) {
        case 'pen':
          toolsPanel.pen(x,y);
          break;
        case 'verticalMirrorPen':
          toolsPanel.verticalMirrorPen(x,y);
          break;
        case 'horisontalMirrorPen':
          toolsPanel.horisontalMirrorPen(x,y);
          break;
        case 'bothMirrorPen':
            toolsPanel.bothMirrorPen(x,y);
            break;

        case 'paintBucket':
            toolsPanel.paintBucket(x,y)
            break;

        case 'paintAll':
            toolsPanel.paintAll()
            break;

        default:
          break;
      }
    });
    this.canvas.addEventListener('mousemove', e =>{
      if (!isDown) return;

      let x = Math.floor(e.offsetX/15);
      let y = Math.floor(e.offsetY/15);
      if (state.selectTool === 'pen') {
        toolsPanel.pen(x,y);
      }else if (state.selectTool === 'verticalMirrorPen'){
        toolsPanel.verticalMirrorPen(x,y);
      }else if (state.selectTool === 'horisontalMirrorPen'){
        toolsPanel.horisontalMirrorPen(x,y);
      }else if (state.selectTool === 'bothMirrorPen'){
        toolsPanel.bothMirrorPen(x,y);
      }
    });
    this.canvas.addEventListener('mouseup', e =>{
      isDown = false;
    });
    this.canvas.addEventListener('mouseout', e =>{
      isDown = false;
    });
  }

}
