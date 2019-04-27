import state from './state'
import {unselectTools} from './tools'


const chooseColor = document.getElementById('choose-color');
chooseColor.addEventListener('click', ()=>{
  if(chooseColor.classList.contains('selected-tool')){
    chooseColor.classList.remove('selected-tool');
    state['selectTool'] = '';
    console.log(state);
  }else{
    unselectTools();
    chooseColor.classList.add('selected-tool');
    state['selectTool'] = 'choose-color';
    console.log(state);
  }
})
export default transform;