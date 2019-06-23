import ViewInstance from "../instances/ViewInstance";
import structures from "../structures";

export default class LayerPanel extends ViewInstance {
  constructor() {
    super()
  }

  static transferDataToStaticCanvas(canvas) {
    const {canvasSize} = state
    const layerCtx = canvas.getContext('2d');
    const staticCanvasCtx = document.querySelector('.canvas-panel__static-canvas').getContext('2d');
    const imgData = layerCtx.getImageData(0, 0, canvasSize, canvasSize)
    staticCanvasCtx.putImageData(imgData, 0, 0)
  }
  static transferDataToGluedCanvasAndFrame() {
    const allLayersCanvas = document.querySelectorAll('.layer-box__canvas');
    const gluedCanvas = document.querySelector('.canvas-panel__glued-canvas');
    const gluedCanvasCtx = gluedCanvas.getContext('2d');
    const selectedFrame = document.querySelector('.frame-panel__frame-list > .selected').children[0];
    const selectedFrameCtx = selectedFrame.getContext('2d');
    const { width } = selectedFrame;
    gluedCanvasCtx.clearRect(0, 0, width, width);
    selectedFrameCtx.clearRect(0, 0, width, width);
    allLayersCanvas.forEach(layerCanvas => {
      gluedCanvasCtx.drawImage(layerCanvas, 0, 0);
      selectedFrameCtx.drawImage(layerCanvas, 0, 0);
    })
  }
  static layersDataCollector(){
    const layerData = {}
    const allLayerCanvas = document.querySelectorAll('.layer-box__canvas');
    allLayerCanvas.forEach(canvas=>{
      const {width} = canvas;
      const ctx = canvas.getContext('2d');
      layerData[canvas.id] = ctx.getImageData(0,0,width,width).data
    })
    return layerData
  }
  static selectFirstLayer(){
    const layerList = document.querySelector('.layers-panel__layer-list');
    const firstLayer = layerList.children[0];
    LayerPanel.select(firstLayer)
    const firstCanvas = firstLayer.children[0]
    LayerPanel.transferDataToStaticCanvas(firstCanvas)
    LayerPanel.transferDataToGluedCanvasAndFrame()

  }
  static imposeEventsToLayerPanel(){
    const { layerStructure,layerStructure:{into} } = structures;
    const layerPanel = document.querySelector('.layers__layers-panel')
    $(into).sortable();
    layerPanel.addEventListener('click',e =>{
      e.preventDefault();
      const { target: { classList, parentNode }, target } = e;
      if (classList.contains('layer-btns__add-new-btn')) {
        LayerPanel.addNew(layerStructure)
      }
      if(classList.contains('layer-box__canvas')){
        LayerPanel.select(parentNode);
        LayerPanel.transferDataToStaticCanvas(target)

      }
      if(classList.contains('layer-box')){
        LayerPanel.select(target);
        LayerPanel.transferDataToStaticCanvas(target.children[0])

      }
      if(classList.contains('layer-box__delete-btn')){
        const list = parentNode.parentNode;
        const nextLayer = parentNode.nextSibling
        if(list.children.length > 1){
          if(parentNode.classList.contains('frame-box box')){
            project.deleteFrame(parentNode)
          }else{
            project.deleteLayer(parentNode)
          }
          list.removeChild(parentNode);
          if(parentNode.classList.contains('selected')){
            if(!!nextLayer){
              ViewInstance.select(nextLayer)
              LayerPanel.transferDataToStaticCanvas(nextLayer)

            }else{
              ViewInstance.select(list.lastElementChild)
              LayerPanel.transferDataToStaticCanvas(list.lastElementChild)

            }
          }
        }
      }
      if (classList.contains('layer-box__copy-btn')) {
        const currentCanvas = parentNode.children[0];
        const { width } = currentCanvas;
        const currentCanvasCtx = currentCanvas.getContext('2d');
        const imgData = currentCanvasCtx.getImageData(0, 0, width, width)
        const idNewCanvas = Math.random()*10e16;
        const frameId = currentCanvas.dataset.frame
        const newElement = LayerPanel.render(layerStructure,idNewCanvas,imgData,frameId);
        // project.addLayer(newElement);
        const list = parentNode.parentNode;
        list.insertBefore(newElement, parentNode.nextSibling);
      }
      if(classList.contains('layer-box__merge-btn')){
        const currentlayer = parentNode;
        const belowLayer = parentNode.nextSibling
        const list = parentNode.parentNode
        if(belowLayer){
          const ctx = currentlayer.children[0].getContext('2d');
          ctx.drawImage(belowLayer.children[0],0,0)
          list.removeChild(belowLayer)
          ViewInstance.select(parentNode)
          LayerPanel.transferDataToStaticCanvas(parentNode.children[0])

        }
      }
    })
    layerPanel.addEventListener('mouseup', e =>{
      console.log('upp')
      setTimeout(LayerPanel.transferDataToGluedCanvasAndFrame(),0)
    })
  }
  static run() {
    LayerPanel.imposeEventsToLayerPanel()
  }
}
