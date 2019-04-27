import state from './state';
import {unselectTools} from './tools'

const paintBucket = document.getElementById('bucket');
paintBucket.addEventListener('click', (e)=>{
  if(paintBucket.classList.contains('selected-tool')){
    paintBucket.classList.remove('selected-tool');
    state['selectTool'] = '';
    console.log(state);

  }else{
    unselectTools();
    paintBucket.classList.add('selected-tool');
    state['selectTool'] = 'bucket';
    console.log(state);

  }
})
export default paintBucket;