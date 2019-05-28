export default class Frames {
  constructor() {

  }

  static makeDeleteFrameBtn(){
    const deleteFrameBtn = document.createElement('span');
    deleteFrameBtn.setAttribute('class','item__del-btn');
    deleteFrameBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteFrameBtn.addEventListener('click', (e)=>{
      const frameList = document.querySelector('.frame-box__list')
      if(frameList.children.length>1){
        frameList.removeChild(e.path[2])
      }
      console.log(frameList.children.length)
    })
    return deleteFrameBtn;
  }
  static makeCopyFrameBtn(frame){
    console.log(frame)
    const copyFrameBtn = document.createElement('span');
    copyFrameBtn.setAttribute('class','item__add-btn');
    copyFrameBtn.innerHTML = '<i class="fas fa-plus"></i>';
    copyFrameBtn.addEventListener('click',()=>{
      const ctx = frame.getContext('2d');
      const data = ctx.getImageData(0,0,32,32)
      Frames.addFrame(data)
    })
    return copyFrameBtn;
  }
  static imposeEventToNewFrameBtn() {
    const addFrameBtn = document.querySelector('.frame-box__new-item-btn');
    addFrameBtn.addEventListener('click',()=>{
      Frames.addFrame()
      // this.setState()
    })
  }
  static addFrame(data){
    const frame = document.createElement('canvas');
    frame.setAttribute('class','frame-box__frame')
    const frameBox = document.createElement('div');
    frameBox.setAttribute('class','frame-box__item')
    // frameBox.setAttribute('id',id)
    frame.setAttribute('width','32px')
    frame.setAttribute('height','32px');
    const deleteFrameBtn = Frames.makeDeleteFrameBtn()
    const copyFrameBtn = Frames.makeCopyFrameBtn(frame);
    if(data){
      const ctx = frame.getContext('2d');
      ctx.putImageData(data,0,0)
    }
    frameBox.appendChild(copyFrameBtn)
    frameBox.appendChild(deleteFrameBtn)
    frameBox.appendChild(frame);
    this.frame = frame;
    document.querySelector('.frame-box__list').appendChild(frameBox)
  }
  static run() {
    Frames.addFrame();
    Frames.imposeEventToNewFrameBtn();
  }
}
