/* eslint-disable no-plusplus */
import { getState, setState } from './state';
import { loadColors, loadCanvas } from './tools';


const figures = document.getElementsByClassName('canvas__figure');


for (let i = 0; i < figures.length; i++) {
  figures[i].addEventListener('click', () => {
    const state = getState();
    switch (state.selectTool) {
      case 'bucket':
        state.figures[i].color = state.currentColor;
        figures[i].style.backgroundColor = state.currentColor;
        break;

      case 'transform':
        if (state.figures[i].circle === true) {
          state.figures[i].circle = false;
        } else if (state.figures[i].circle === false) {
          state.figures[i].circle = true;
        }
        break;

      case 'choose-color':
        state.prevColor = state.currentColor;
        state.currentColor = figures[i].style.backgroundColor;
        setState(state);
        loadColors();
        break;

      default:
        // state.selectTool="";
        break;
    }
    setState(state);
    loadCanvas();
  });

  figures[i].addEventListener('mousedown', (e) => {
    const state = getState();
    if (state.selectTool === 'move') {
      const mousedownX = e.pageX;
      const mousedownY = e.pageY;

      figures[i].style.zIndex = 1000;
      const topPx = +figures[i].style.top.slice(0, -2);
      const leftPx = +figures[i].style.left.slice(0, -2);

      // document.querySelector('.canvas').addEventListener('mousemove',(event)=>{
      document.querySelector('.canvas').onmousemove = (event) => {
        figures[i].style.top = `${topPx - (mousedownY - event.pageY)}px`;
        figures[i].style.left = `${leftPx - (mousedownX - event.pageX)}px`;
      };
      figures[i].onmouseup = (event) => {
        document.querySelector('.canvas').onmousemove = null;
        figures[i].style.zIndex = 1;

        const canvasTop = document.getElementsByClassName('canvas')[0].offsetTop;
        const canvasLeft = document.getElementsByClassName('canvas')[0].offsetLeft;
        const top = event.clientY - canvasTop;
        const left = event.clientX - canvasLeft;

        if (top < 450
          && top > -153
          && left > -153
          && left < 450) {
          const targetFigureId = ((Math.floor(top / 153)) * 3) + Math.floor(left / 153);

          for (let x = 0; x < 9; x++) {
            if (state.figures[x].id === targetFigureId) {
              const tempColor = state.figures[i].color;
              const tempCircle = state.figures[i].circle;

              state.figures[i].color = state.figures[x].color;
              state.figures[i].circle = state.figures[x].circle;

              state.figures[x].color = tempColor;
              state.figures[x].circle = tempCircle;
              setState(state);
              break;
            }
          }
          loadCanvas(state);
        }
      };
    }
  });
}
export default figures;
