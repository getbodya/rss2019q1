import { setState, getState } from '../services/state';
import { loadColors } from '../services/tools';


const colors = document.querySelectorAll('.colors__demo');
for (let i = 0; i < colors.length; i += 1) {
  colors[i].addEventListener('click', () => {
    const state = getState();
    if (state.selectTool === 'choose-color') {
      state.currentColor = colors[i].style.backgroundColor;
      setState(state);
      loadColors();
    }
  });
}
export default colors;
