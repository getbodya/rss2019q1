import { setState, getState } from '../services/state';
import { unselectTools } from '../services/tools';


const move = document.getElementById('move');
move.addEventListener('click', () => {
  const state = getState();
  if (move.classList.contains('selected-tool')) {
    move.classList.remove('selected-tool');
    state.selectTool = '';
  } else {
    unselectTools();
    move.classList.add('selected-tool');
    state.selectTool = 'move';
  }
  setState(state);
});
export default move;
