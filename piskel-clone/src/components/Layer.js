export default class Layer{
  constructor(){
    this.layerList = document.querySelector('.layer-panel__layer-list');
  }
  addNewLayerBtnEvent() {
    const addNewLayerBtn = document.querySelector('.layer-panel__new-layer-btn');
    addNewLayerBtn.addEventListener('click',()=>{
    this.addNewLayer();
    })
  }
  static createLayer() {
    const layer = document.createElement('div');
    layer.setAttribute('class','layer-list__layer');
    const canvas = document.createElement('canvas');
    canvas.setAttribute('class','layer__canvas');
    canvas.setAttribute('width','32');
    canvas.setAttribute('height','32');
    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class','layer__delete-layer-btn')
    deleteBtn.innerHTML = 'X'
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type','checkbox');
    checkBox.setAttribute('class','layer__checkbox');
    checkBox.checked = true;
    const title = document.createElement('span');
    title.setAttribute('class','layer__title');
    title.innerHTML = 'title';
    layer.appendChild(checkBox)
    layer.appendChild(canvas)
    layer.appendChild(title)
    layer.appendChild(deleteBtn)
    return layer
  }
  addNewLayer(){
    const layer = Layer.createLayer();
    layer.addEventListener('click',e=>{
      if(e.target.classList=="layer__delete-layer-btn"){
        if(this.layerList.children.length > 1 ){
          this.layerList.removeChild(layer);
        }
      }
      if(e.target.classList=="layer__checkbox"){
        if(e.target.checked==false){
          console.log('unvisble')
        }
      }
    })
    this.layerList.appendChild(layer)
  }
  run() {
    this.addNewLayer();
    this.addNewLayerBtnEvent();
  }
}
