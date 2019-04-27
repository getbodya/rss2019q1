import {setState, getState} from './state'
import {unselectTools} from './tools'


const transform = document.getElementById('transform');
transform.addEventListener('click', ()=>{
  let state = getState();
  
  if(transform.classList.contains('selected-tool')){
    transform.classList.remove('selected-tool');
    state['selectTool'] = '';
    console.log(state);
  }else{
    unselectTools();
    transform.classList.add('selected-tool');
    state['selectTool'] = 'transform';
    console.log(state);
  }
  setState(state);

})
export default transform;