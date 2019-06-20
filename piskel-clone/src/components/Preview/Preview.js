const preview = {
  previewStructure: {
    parent: '.control-panel__preview',
    tag: 'div',
    className: 'preview__preview-box',
    children: [
      {
        tag: 'canvas',
        className: 'preview-box__canvas',
      },
      {
        tag: 'button',
        className: 'preview-box__fullscreen-btn',
      },
      {
        tag: 'label',
        className: 'preview-box__fps-input-label',
        content: '12fps',
        attr: {
          for: 'fps-input',
        }
      },
      {
        tag: 'input',
        className: 'preview-box__fps-input',
        attr: {
          id: 'fps-input',
          type: 'range',
          max: 24,
          value: 12,
          min: 1,
          step: 1,
        }
      },
    ],

  },
  runAnimation(){
    let counter = 0;
    const previewCtx = document.querySelector('.preview-box__canvas').getContext('2d')
    const step = () =>{
      counter++;
      const {canvasSize} = state
      const allFrame = document.querySelectorAll('.frame-box__canvas');
      const fps = document.querySelector('.preview-box__fps-input').value
      const currentFrameCtx = allFrame[counter % allFrame.length].getContext('2d')
      const currentImgData = currentFrameCtx.getImageData(0,0,canvasSize,canvasSize)
      previewCtx.putImageData(currentImgData,0,0)
      const delay = 1000 / fps
      setTimeout(() => {
        requestAnimationFrame(step);
      }, delay);
    }
    step()
  },
  fullScreenMode(){
    const btn = document.querySelector('.preview-box__fullscreen-btn');
    btn.addEventListener('click',()=>{
      const preview = document.querySelector('.preview__preview-box')
      if(!document.fullscreen){
        btn.classList.add('open')
        preview.requestFullscreen();
      }else{
        btn.classList.remove('open')
        document.exitFullscreen();
      }
    })
  },
  runFpsInput(){
    const fpsInput = document.querySelector('.preview-box__fps-input');
    const label = document.querySelector('.preview-box__fps-input-label')
    fpsInput.addEventListener('input',e=>{
      label.innerHTML = `${fpsInput.value}fps`
    },false)
  },
  run(){
    this.runAnimation();
    this.fullScreenMode();
    this.runFpsInput();
  }
}
export default preview
