import tools from './Tools'
export default class Canvas {
  constructor() {
    this.canvas = document.querySelector('.canvas-box__canvas');
  }


  imposeEvent() {
    let isDown;

    this.canvas.addEventListener('mousedown', e => {
      isDown = true;
      const x = Math.floor(e.offsetX/15);
      const y = Math.floor(e.offsetY/15);
      tools.pen(x,y);
    });
    this.canvas.addEventListener('mousemove', e =>{
      if (!isDown) return;
      const x = Math.floor(e.offsetX/15);
      const y = Math.floor(e.offsetY/15);
      tools.paintBucket();
    });
    this.canvas.addEventListener('mouseup', e =>{
      isDown = false;
    });
  }

}
