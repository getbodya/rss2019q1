import State from "../../State";

export default class Cursor {
  constructor() {

  }
  static imposeCursorEvent() {
    const container = document.querySelector('.canvas-box__canvas');
    container.addEventListener('mousemove', e => {
      console.log(e.offsetX)
      const cursor = document.querySelector('.cursor')
      const state = State.getState();
      const { canvasSize } = state;

      const left = Math.floor(e.offsetX / canvasSize)*canvasSize;
      const top = Math.floor(e.offsetY / canvasSize)*canvasSize;
      cursor.style.left = `${left}px`;
      cursor.style.top = `${top}px`;
    })
  }
  static makeCursor() {
    const state = State.getState();
    const { canvasSize } = state;
    const container = document.querySelector('.canvas-box__container');
    const cursor = document.createElement('div');
    const cursorSize = container.offsetWidth / canvasSize;
    cursor.setAttribute('class', 'cursor');
    cursor.style.width = `${cursorSize}px`;
    cursor.style.height = `${cursorSize}px`;
    document.querySelector('.canvas-box__container').appendChild(cursor)
  }
  static run() {
    Cursor.makeCursor()
    Cursor.imposeCursorEvent()
  }
}
