import { setState, getState } from './state';
import { unselectTools } from './tools';


const paintBucket = document.getElementById('bucket');
const chooseColor = document.getElementById('choose-color');
const move = document.getElementById('move');
const transform = document.getElementById('transform');
const { body } = document;
const hotKeys = {
  paintBucket: 113,
  chooseColor: 119,
  move: 101,
  transform: 114,
};


body.addEventListener('keypress', e => {
  const state = getState();

  if (e.keyCode === hotKeys.paintBucket) {
    if (paintBucket.classList.contains('selected-tool')) {
      paintBucket.classList.remove('selected-tool');
      state.selectTool = '';
    } else {
      unselectTools();
      paintBucket.classList.add('selected-tool');
      state.selectTool = 'bucket';
    }
  } else if (e.keyCode === hotKeys.chooseColor) {
    if (chooseColor.classList.contains('selected-tool')) {
      chooseColor.classList.remove('selected-tool');
      state.selectTool = '';
    } else {
      unselectTools();
      chooseColor.classList.add('selected-tool');
      state.selectTool = 'choose-color';
    }
  } else if (e.keyCode === hotKeys.move) {
    if (move.classList.contains('selected-tool')) {
      move.classList.remove('selected-tool');
      state.selectTool = '';
    } else {
      unselectTools();
      move.classList.add('selected-tool');
      state.selectTool = 'move';
    }
  } else if (e.keyCode === hotKeys.transform) {
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
