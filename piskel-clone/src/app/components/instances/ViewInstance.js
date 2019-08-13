export default class ViewInstance{
  static render(structure,canvasId,canvasData,frameId) {
    const { parent, tag, className, children, content, attr } = structure;
    const element = document.createElement(tag)
    element.setAttribute('class',className)
    if(tag === 'canvas'){
      ViewInstance.setCanvasProps(element,canvasId,canvasData,frameId);
    }
    if (content) {
      element.innerHTML = content;
    }
    if(attr){
      for(let key in attr){
        element.setAttribute(key,attr[key])
      }
    }
    if (children) {
      children.forEach(child => {
        element.appendChild(ViewInstance.render(child,canvasId,canvasData,frameId))
      })
    }
    if (parent) {
      document.querySelector(parent).appendChild(element)
    } else {
      return element;
    }
  }
  static setCanvasProps(canvas,canvasId,canvasData,frameId){
    const {canvasSize} = state;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    if(!canvasId){
      canvas.id = Math.random()*10e16;
    }else{
      canvas.id = canvasId;
    }
    if(frameId){
      canvas.dataset.frame = frameId
    }
    if(canvasData){
      const ctx = canvas.getContext('2d');
      ctx.putImageData(canvasData,0,0)
    }

  }
  static addNew(structure,id,data){
    const {into,className} = structure;
    const newElement = ViewInstance.render(structure,id,data);
    const elementList = document.querySelector(into);
    if(className == 'frame-box box'){
      project.addFrame(newElement)
    }
    if(className == 'layer-box box'){
      const selectedFrameId = document.querySelector('.frame-panel__frame-list > .selected').children[0].id
      const canvasNewElement = newElement.children[0]
      canvasNewElement.dataset.frame = selectedFrameId;
    }
    elementList.appendChild(newElement)
  }
  static select(element){
    const {parentNode:{childNodes}}=element;
    childNodes.forEach(child => {
      if(child.classList.contains('selected')){
        child.classList.remove('selected')
      }
    })
    element.classList.add('selected')
  }
}
