import state from './state';
import { loadColors } from './tools'


let colors = document.querySelectorAll('.colors__demo');
console.log(colors)
for(let i = 0; i < colors.length; i++){
  colors[i].addEventListener('click', () => {
    if(state['selectTool']=='choose-color'){
      state['currentColor'] = colors[i].style.backgroundColor;
      loadColors();
    }
  })
}
export default colors;