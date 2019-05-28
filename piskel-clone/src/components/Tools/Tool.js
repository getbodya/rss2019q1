import State from '../../State/';
export default class Tool {
  constructor(){
    this.size = 1;
  }
  static paintPixel(x, y, size, primColor) {
    const ctx = document.querySelector('.canvas-box__canvas').getContext('2d');
    const { primaryColor, secondaryColor } = State.getState();
    if(!primColor){
      ctx.fillStyle = primaryColor;
    }else{
      ctx.fillStyle = secondaryColor;
    }
    ctx.fillRect(x, y, size, size);
  }

  static imposeEventToBtn(className){
    const penBtn = document.querySelector(className)
    penBtn.addEventListener('click', (e) => {
      e.preventDefault();
      Tool.unselectTools();
      penBtn.classList.add('selected');
      const state = State.getState();
      if(className === '.mirror-pen'){
        if(e.ctrlKey){
          state.selectTool = 'horisontalMirrorPen';
        }else if(e.shiftKey){
          state.selectTool = 'bothMirrorPen';
        }else{
          state.selectTool = 'verticalMirrorPen';
        }
      }else{
        state.selectTool = penBtn.dataset.tool;
      }

      State.setState(state);

    })
  }
  static unselectTools() {
    const state = State.getState();
    state.selectTool = '';
    State.setState(state);
    const tools = document.querySelectorAll('.tools-panel__item');
    tools.forEach(tool => {
      if (tool.classList.contains('selected')) {
        tool.classList.remove('selected');
      }
    })
  }


}
