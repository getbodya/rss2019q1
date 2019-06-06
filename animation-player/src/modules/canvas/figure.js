import { getState, setState } from '../services/state';
import { loadColors, loadCanvas } from '../services/tools';


const figures = document.getElementsByClassName('canvas__figure');
for (let i = 0; i < figures.length; i += 1) {
  figures[i].addEventListener('mousedown', e => {
    const mousedownX = e.pageX;
    const mousedownY = e.pageY;
    const topPx = +figures[i].style.top.slice(0, -2);
    const leftPx = +figures[i].style.left.slice(0, -2);
    const state = getState();
    switch (state.selectTool) {
      case 'bucket':
        figures[i].onmouseup = null;
        state.figures[i].color = state.currentColor;
        figures[i].style.backgroundColor = state.currentColor;
        break;

      case 'transform':
        figures[i].onmouseup = null;
        if (state.figures[i].circle === true) {
          state.figures[i].circle = false;
        } else if (state.figures[i].circle === false) {
          state.figures[i].circle = true;
        }
        break;

      case 'choose-color':
        figures[i].onmouseup = null;

        state.prevColor = state.currentColor;
        state.currentColor = figures[i].style.backgroundColor;
        setState(state);
        loadColors();
        break;

      case 'move':

        figures[i].style.zIndex = 1000;
        document.querySelector('.canvas').onmousemove = event => {
          figures[i].style.top = `${topPx - (mousedownY - event.pageY)}px`;
          figures[i].style.left = `${leftPx - (mousedownX - event.pageX)}px`;
        };
        figures[i].onmouseup = event => {
          document.querySelector('.canvas').onmousemove = null;
          figures[i].style.zIndex = 1;

          const canvasTop = document.getElementsByClassName('canvas')[0].offsetTop;
          const canvasLeft = document.getElementsByClassName('canvas')[0].offsetLeft;
          const top = event.clientY - canvasTop;
          const left = event.clientX - canvasLeft;
          const sizeCanvas = 450;
          const sizeRowCol = 153;
          if (top < sizeCanvas
            && top > -sizeRowCol
            && left > -sizeRowCol
            && left < sizeCanvas) {
            const targetFigureId = ((Math.floor(top / sizeRowCol)) * 3) + Math.floor(left / sizeRowCol);

            for (let x = 0; x < 9; x += 1) {
              if (state.figures[x].id === targetFigureId) {
                figures[x].onmousedown = null;
                const tempColor = state.figures[i].color;
                const tempCircle = state.figures[i].circle;

                state.figures[i].color = state.figures[x].color;
                state.figures[i].circle = state.figures[x].circle;

                state.figures[x].color = tempColor;
                state.figures[x].circle = tempCircle;
                break;
              }
            }
            setState(state);
            loadCanvas(state);
          }
        };
        break;

      default:
        break;
    }
    setState(state);
    loadCanvas();
  });
}
export default figures;
