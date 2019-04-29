import { getState, setState } from './state';

function unselectTools() {
  const state = getState();
  state.selectTool = '';
  const tools = document.querySelector('.toolbar__tools');
  for (let i = 0; i < tools.children.length; i += 1) {
    if (tools.children[i].classList.contains('selected-tool')) {
      tools.children[i].classList.remove('selected-tool');
    }
    setState(state);
  }
}
function loadCanvas() {
  const state = getState();
  const figures = document.querySelectorAll('.canvas__figure');
  for (let i = 0; i < figures.length; i += 1) {
    figures[i].style.backgroundColor = state.figures[i].color;
    figures[i].style.top = `${state.figures[i].top}px`;
    figures[i].style.left = `${state.figures[i].left}px`;
    if (state.figures[i].circle) {
      figures[i].classList.add('circle');
    } else {
      figures[i].classList.remove('circle');
    }
  }
  const tool = document.getElementById(state.selectTool);
  if (state.selectTool !== '') {
    tool.classList.add('selected-tool');
  }
}

function loadColors() {
  const state = getState();
  document.querySelector('.colors__demo-current-color').style.backgroundColor = state.currentColor;
  document.querySelector('.colors__demo-prev-color').style.backgroundColor = state.prevColor;
  document.querySelector('.colors__demo-red-color').style.backgroundColor = state.firstColor;
  document.querySelector('.colors__demo-blue-color').style.backgroundColor = state.secondColor;
}

export { unselectTools, loadCanvas, loadColors };
