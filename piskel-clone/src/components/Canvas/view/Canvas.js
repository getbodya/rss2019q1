import imposeEventToCanvas from '../controller/event';
import State from '../../../State';
export default class Canvas{
  constructor(){
  }
  static changeSize(newSize){
    const canvas = document.querySelector('.canvas-box__canvas');
    canvas.setAttribute('width', `${newSize}px`);
    canvas.setAttribute('height',`${newSize}px`);
  }
  static makeCanvas(size){
    const canvas = document.createElement('canvas');
    canvas.setAttribute('class','canvas-box__canvas');
    canvas.setAttribute('width', `${size}px`);
    canvas.setAttribute('height',`${size}px`);
    return canvas;
  }
  static renderCanvas(){
    const container = document.querySelector('.app__canvas-box');
    const state = State.getState();
    const {canvasSize} = state
    const canvas = Canvas.makeCanvas(canvasSize);
    imposeEventToCanvas(canvas);
    canvas.oncontextmenu = () => {return false};

    container.appendChild(canvas);
  }
}
