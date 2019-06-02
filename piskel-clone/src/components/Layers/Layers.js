import State from "../../State";

export default class Layers {
  constructor() {

  }
  static makeLayer(data,id) {
    const { canvasSize } = State.getState();
    const layer = document.createElement('div')
    layer.classList.add('layer-panel__layer')
    const canvas = document.createElement('canvas');
    canvas.classList.add('layer__canvas')
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    if (data) {
      const ctx = canvas.getContext('2d');
      ctx.putImageData(data,0,0)
    }
    if(!id){
      id = Math.random() * 10e16;
      canvas.id = id;
      Layers.saveLayerToState(canvas)
    }else{

      canvas.id = id;
    }
    const dublicateBtn = document.createElement('button')
    dublicateBtn.classList.add('layer__dublicate-btn')
    dublicateBtn.innerHTML = '<i class="fas fa-copy"></i>';
    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('layer__delete-btn')
    deleteBtn.innerHTML = '<i class="far fa-trash-alt icon"></i>';
    layer.appendChild(canvas)
    layer.appendChild(dublicateBtn)
    layer.appendChild(deleteBtn)
    Layers.imposeEventsToLayer(layer)
    return layer;
  }
  static imposeEventsToLayer(layer) {
    layer.addEventListener('click', e => {
      const element = e.target;
      if (element.classList.contains('fa-copy')
        || element.classList.contains('layer__dublicate-btn')) {
        const canvas = layer.childNodes[0];
        const ctx = canvas.getContext('2d');
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const duplicateLayer = Layers.makeLayer(data);
        layer.parentNode.insertBefore(duplicateLayer, layer.nextSibling);
      }
      if (element.classList.contains('fa-trash-alt')
        || element.classList.contains('layer__delete-btn')) {
        if (layer.parentNode.children.length > 1) {
          if (layer.classList.contains('selected-layer')) {
            Layers.selectLayer(layer.nextSibling)
          }
          Layers.deleteLayerOfState(layer)
          layer.parentNode.removeChild(layer)
        }
      }
      if (element.classList.contains('layer-panel__layer')
        || element.classList.contains('layer__canvas')) {
        Layers.unselectLayer()
        Layers.selectLayer(layer)
      }
    })
  }
  static imposeEventsToNewLayerBtn() {
    const btn = document.querySelector('.layer-panel__new-layer-btn');
    btn.addEventListener('click', () => {
      Layers.addNewLayer()
    })
  }
  static unselectLayer() {
    const allLayers = document.querySelectorAll('.layer-panel__layer');
    allLayers.forEach(item => {
      if (item.classList.contains('selected-layer')) {
        item.classList.remove('selected-layer')
      }
    })
  }
  static selectLayer(layer) {
    layer.classList.add('selected-layer');
    Layers.transDataLayerToCanvas(layer)
  }
  static addNewLayer(data,id) {
    const list = document.querySelector('.layer-panel__layer-list')
    list.appendChild(Layers.makeLayer(data,id))
  }
  static saveLayerToState(layer) {
    const layerId = layer.id;
    console.log(layerId)
    const ctx = layer.getContext('2d');
    const layerImg = ctx.getImageData(0,0,layer.width,layer.height).data
    const state = State.getState()
    const { frames } = state;
    const selectFrameId = document.querySelector('.selected-frame').id
    frames.forEach(frame =>{
      const { id, layers } = frame
      if(+selectFrameId === id){
        const layerData = {
          id:layerId,
          data:layerImg
        }
        layers.push(layerData)
      }
    })
    State.setState(state);

  }
  static deleteLayerOfState(layer){

    const canvasId = layer.children[0].id;
    const selectFrameId = document.querySelector('.selected-frame').id
    const state = State.getState()
    const { frames } = state;
    frames.forEach(frame =>{
      const { id, layers } = frame
      if(+selectFrameId === id){
        console.log(layers)
        layers.forEach((layer,index)=>{

          if(+layer.id === +canvasId){
            layers.splice(index,1);
          }
        })
      }
    })
    console.log(canvasId)

    // const layerId = layer.id;
    // const ctx = layer.getContext('2d');
    // const layerImg = ctx.getImageData(0,0,layer.width,layer.height)

    State.setState(state);

  }
  static makeGluedCanvas() {
    const container = document.querySelector('.canvas-box__container');
    const state = State.getState();
    const { canvasSize } = state
    const canvas = document.createElement('canvas');
    canvas.setAttribute('class', 'canvas-box__glued-canvas');
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    container.appendChild(canvas)
  }
  static gluingLayrs() {
    const layersData = [];
    const allLayers = document.querySelectorAll('.layer__canvas');
    const gluedLayer = document.querySelector('.canvas-box__glued-canvas');
    const gluedLayerCtx = gluedLayer.getContext('2d');
    gluedLayerCtx.clearRect(0, 0, gluedLayer.width, gluedLayer.width)
    allLayers.forEach(layer => {
      const ctxLayer = layer.getContext('2d');
      const layerData = ctxLayer.getImageData(0, 0, layer.width, layer.width)
      gluedLayerCtx.drawImage(layer, 0, 0);
      console.log(layer)
    })

  }
  static transDataLayerToCanvas(layer) {
    console.log(layer)
    const layerCanvas = layer.children[0]
    const { canvasSize } = State.getState();
    const layerCtx = layerCanvas.getContext('2d');
    const layerData = layerCtx.getImageData(0, 0, canvasSize, canvasSize);
    const canvasCtx = document.querySelector('.canvas-box__canvas').getContext('2d');
    canvasCtx.putImageData(layerData, 0, 0);
  }
  static renderLayers(selectFrame){
    const selectFrameId = +selectFrame.id
    const {frames,canvasSize} = State.getState();

    const layerList = document.querySelector('.layer-panel__layer-list');
    layerList.innerHTML = ''
    frames.forEach(frame =>{
      const {id,layers}=frame;
      if(id==selectFrameId){
        console.log(frame)
        if(layers.length > 0){
          layers.forEach(layer=>{
            const {data,id}=layer;
              const newData = new ImageData(canvasSize,canvasSize)
              for(let i in data.data){
                newData.data[i] = data.data[i]
              }
            Layers.addNewLayer(newData,id)
          })
        }else{
          Layers.addNewLayer()

        }
      }
    })
  }
  static run() {
    Layers.makeGluedCanvas()
    // Layers.addNewLayer()
    Layers.imposeEventsToNewLayerBtn()
    const layerList = document.querySelectorAll('.layer-panel__layer')
    layerList[0].classList.add('selected-layer')
    $(".layer-panel__layer-list").sortable();
  }
}
