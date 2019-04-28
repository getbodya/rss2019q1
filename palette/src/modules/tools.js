import { getState } from './state'

function unselectTools() {

  const tools = document.querySelector('.toolbar__tools');
  for (let i = 0; i < tools.children.length; i++) {
    if (tools.children[i].classList.contains('selected-tool')) {
      tools.children[i].classList.remove('selected-tool')
    }
  }
}
function loadCanvas() {
  let state = getState();
  let figures = document.querySelectorAll('.canvas__figure')
  for (let i = 0; i < figures.length; i++) {
    let fig = document.getElementById(i)
    // console.log(fig)

    fig.style.backgroundColor = state['figures'][i]['color'];
    fig.style.top = state['figures'][i]['top'] + 'px';
    fig.style.left = state['figures'][i]['left'] + 'px';
    if (state['figures'][i]['circle']) {
      fig.classList.add('circle')
    } else{
      fig.classList.remove('circle')
    }
  }
}

function loadColors() {
  let state = getState();
  document.querySelector('.colors__demo-current-color').style.backgroundColor = state['currentColor'];
  document.querySelector('.colors__demo-prev-color').style.backgroundColor = state['prevColor'];
  document.querySelector('.colors__demo-red-color').style.backgroundColor = state['firstColor'];
  document.querySelector('.colors__demo-blue-color').style.backgroundColor = state['secondColor'];
}

export { unselectTools, loadCanvas, loadColors };