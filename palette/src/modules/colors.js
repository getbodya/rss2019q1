import {setState, getState} from './state'
import { loadColors } from './tools'


let colors = document.querySelectorAll('.colors__demo');
for(let i = 0; i < colors.length; i++){
  colors[i].addEventListener('click', () => {
    let state = getState();
    if(state['selectTool']=='choose-color'){
      state['currentColor'] = colors[i].style.backgroundColor;
      setState(state);
      loadColors();
    }
  })
}
export default colors;