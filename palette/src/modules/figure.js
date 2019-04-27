import state from './state'
import { loadColors } from './tools'
import { loadCanvas } from './tools'



const figures = document.getElementsByClassName('canvas__figure');

for(let i = 0; i<figures.length; i++){
  figures[i].addEventListener('click',()=>{
    switch (state['selectTool']) {
      case 'bucket':
        state['figures'][i]['color'] = state['currentColor'];
        figures[i].style.backgroundColor = state['currentColor'];
        loadCanvas();
        break;
      case 'transform':
        if(figures[i].classList.contains('circle')){
          figures[i].classList.remove('circle');
        }else{
          figures[i].classList.add('circle');
        }
        break;
      case 'choose-color':
        state['currentColor'] = figures[i].style.backgroundColor;
        loadColors();
        break;

      default:
        break;
    }
  })
}
export default figures;