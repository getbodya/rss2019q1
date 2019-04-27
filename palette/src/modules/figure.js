import {getState, setState} from './state'
import { loadColors } from './tools'
import { loadCanvas } from './tools'



const figures = document.getElementsByClassName('canvas__figure');


for(let i = 0; i<figures.length; i++){
  figures[i].addEventListener('click',()=>{
    let state = getState();
    switch (state['selectTool']) {
      case 'bucket':
        state['figures'][i]['color'] = state['currentColor'];
        figures[i].style.backgroundColor = state['currentColor'];
        break;

      case 'transform':
        if(state['figures'][i]['circle']==true){
          state['figures'][i]['circle'] = false;
        }else if(state['figures'][i]['circle']==false){
          state['figures'][i]['circle'] = true;
        }
        break;

      case 'choose-color':
        state['prevColor'] = state['currentColor'];
        state['currentColor'] = figures[i].style.backgroundColor;
        setState(state);
        loadColors();
        break;

      default:
        break;
    }
    setState(state);
    loadCanvas();
  })

  figures[i].addEventListener('mousedown',(e) =>{
    let mousedownX = e.pageX;
    let mousedownY = e.pageY;
    let state = getState();

    if(state['selectTool']=='move'){
      figures[i].style.zIndex = 1000;  
      let topPx = +figures[i].style.top.slice(0,-2);
      let leftPx = +figures[i].style.left.slice(0,-2);
      document.querySelector('.canvas').onmousemove = function(e) {
        figures[i].style.top = topPx - ( mousedownY - e.pageY ) + 'px';
        figures[i].style.left = leftPx - ( mousedownX - e.pageX ) + 'px';
        }
      figures[i].onmouseup = function(e) {
        document.querySelector('.canvas').onmousemove = null;
        let canvasTop = document.getElementsByClassName('canvas')[0]['offsetTop']
        let canvasLeft = document.getElementsByClassName('canvas')[0]['offsetLeft']
        let top = e.clientY - canvasTop;
        let left = e.clientX - canvasLeft;
        if ( top < 450 &&
           top > -153 &&
           left > -153 &&
           left < 450){
            let temp = state['figures'][i];
            let targetFigureId = ((Math.floor(top/153)) * 3) + Math.floor(left/153);
            state['figures'][i] = state['figures'][targetFigureId];
            state['figures'][targetFigureId] = temp;
            setState(state);
            loadCanvas(state);
        }
      }
    }
  })
}
export default figures;