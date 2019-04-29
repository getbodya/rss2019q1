import { setState, getState } from './state';
import { unselectTools } from './tools';


const paintBucket = document.getElementById('bucket');
const chooseColor = document.getElementById('choose-color');
const move = document.getElementById('move');
const transform = document.getElementById('transform');
const { body } = document;

body.addEventListener('keypress', (e) => {
  const state = getState();

  if (e.keyCode === 113) {
    if (paintBucket.classList.contains('selected-tool')) {
      paintBucket.classList.remove('selected-tool');
      state.selectTool = '';
    } else {
      unselectTools();
      paintBucket.classList.add('selected-tool');
      state.selectTool = 'bucket';
    }
  } else if (e.keyCode === 119) {
    if (chooseColor.classList.contains('selected-tool')) {
      chooseColor.classList.remove('selected-tool');
      state.selectTool = '';
    } else {
      unselectTools();
      chooseColor.classList.add('selected-tool');
      state.selectTool = 'choose-color';
    }
  } else if (e.keyCode === 101) {
    if (move.classList.contains('selected-tool')) {
      move.classList.remove('selected-tool');
      state.selectTool = '';
    } else {
      unselectTools();
      move.classList.add('selected-tool');
      state.selectTool = 'move';
    }
  } else if (e.keyCode === 114) {
    if (transform.classList.contains('selected-tool')) {
      transform.classList.remove('selected-tool');
      state.selectTool = '';
    } else {
      unselectTools();
      transform.classList.add('selected-tool');
      state.selectTool = 'transform';
    }
  }
  setState(state);
});
export default body;
