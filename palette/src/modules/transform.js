import state from './state'
import unselectTools from './tools'


const transform = document.getElementById('transform');
transform.addEventListener('click', ()=>{
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
})
export default transform;