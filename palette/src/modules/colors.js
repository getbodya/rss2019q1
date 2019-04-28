import { setState, getState } from './state';
import { loadColors } from './tools';


const colors = document.querySelectorAll('.colors__demo');
// eslint-disable-next-line no-plusplus
for (let i = 0; i < colors.length; i++) {
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
