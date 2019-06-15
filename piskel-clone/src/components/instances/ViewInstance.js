// import LayerPanel from "../LayerPanel";

// import render from "./render";

export default class ViewInstance{
  constructor(){
  }
  static render(structure,canvasId,canvasData,frameId) {
    const { parent, tag, className, children, content, attr } = structure;
    const element = document.createElement(tag)
    element.setAttribute('class',className)
    if(tag === 'canvas'){
      const {canvasSize} = state;
      element.setAttribute('width',canvasSize)
      element.setAttribute('height',canvasSize)
      if(!canvasId){
        element.id = Math.random()*10e16;
      }else{
        element.id = canvasId;
      }
      if(frameId){
        element.dataset.frame = frameId
      }
      if(canvasData){
        const ctx = element.getContext('2d');
        ctx.putImageData(canvasData,0,0)
      }
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
  static imposeClickEvent(element,func){
    element.addEventListener('click',func);
  }
  static addNew(structure,id,data){
    const {into,className} = structure;
    const newElement = ViewInstance.render(structure,id,data);
    const elementList = document.querySelector(into);
    if(className == 'frame-box box'){
      project.addFrame(newElement)
    }
    if(className == 'layer-box box'){
      project.addLayer(newElement);
      const selectedFrameId = document.querySelector('.frame-panel__frame-list > .selected').children[0].id
      const canvasNewElement = newElement.children[0]
      canvasNewElement.dataset.frame = selectedFrameId;
    }
    elementList.appendChild(newElement)
  }
  static selectFirst(listSelector){
    const list = document.querySelector(listSelector);
    const firstElement = list.children[0];
    ViewInstance.select(firstElement)
  }
  static select(element){
    const {parentNode:{childNodes},children}=element;
    childNodes.forEach(child => {
      if(child.classList.contains('selected')){
        child.classList.remove('selected')
      }
    })
    element.classList.add('selected')
  }
}
