import { setState, getState } from '../services/state';
import { unselectTools } from '../services/tools';


const transform = document.getElementById('transform');
transform.addEventListener('click', () => {
  const state = getState();
  if (transform.classList.contains('selected-tool')) {
    transform.classList.remove('selected-tool');
    state.selectTool = '';
  } else {
    unselectTools();
    transform.classList.add('selected-tool');
    state.selectTool = 'transform';
  }
  setState(state);
});
export default transform;
