import { setState, getState } from './state';
import { unselectTools } from './tools';


const chooseColor = document.getElementById('choose-color');
chooseColor.addEventListener('click', () => {
  const state = getState();

  if (chooseColor.classList.contains('selected-tool')) {
    chooseColor.classList.remove('selected-tool');
    state.selectTool = '';
  } else {
    unselectTools();
    chooseColor.classList.add('selected-tool');
    state.selectTool = 'choose-color';
  }

  setState(state);
});
export default chooseColor;
