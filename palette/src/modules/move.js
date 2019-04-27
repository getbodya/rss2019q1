import {setState, getState} from './state'
import {unselectTools} from './tools'

const move = document.getElementById('move');
move.addEventListener('click', (e)=>{
  let state = getState();
  if(move.classList.contains('selected-tool')){
    move.classList.remove('selected-tool');
    state['selectTool'] = '';
  }else{
    unselectTools();
    move.classList.add('selected-tool');
    state['selectTool'] = 'move';
  }
  setState(state);
})
export default move;