import { setState, getState } from './state';
import { unselectTools } from './tools';

const paintBucket = document.getElementById('bucket');
paintBucket.addEventListener('click', () => {
  const state = getState();
  if (paintBucket.classList.contains('selected-tool')) {
    paintBucket.classList.remove('selected-tool');
    state.selectTool = '';
  } else {
    unselectTools();
    paintBucket.classList.add('selected-tool');
    state.selectTool = 'bucket';
  }
  setState(state);
});
export default paintBucket;
