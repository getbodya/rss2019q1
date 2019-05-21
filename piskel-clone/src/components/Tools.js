const tools = {
  pen(x, y) {
    const ctx = document.querySelector('.canvas-box__canvas').getContext('2d');
    const { currentColor,toolSize } = state;
    ctx.fillStyle = currentColor;
    ctx.fillRect(x, y, toolSize, toolSize);
  },
  paintBucket(){
    const ctx = document.querySelector('.canvas-box__canvas').getContext('2d');
    const { currentColor } = state;
    ctx.fillStyle = currentColor;
    ctx.fillRect(0, 0, 32, 32);
  },
}
export default tools;
