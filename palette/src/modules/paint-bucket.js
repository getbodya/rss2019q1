import state from './state'
const paintBucket = document.getElementById('bucket');
paintBucket.addEventListener('click', (e)=>{
  if(paintBucket.classList.contains('selected-tool')){
    paintBucket.classList.remove('selected-tool');
    state['selectTool'] = '';
  }else{
    paintBucket.classList.add('selected-tool');
    state['selectTool'] = 'bucket';
  }
})
export default paintBucket;