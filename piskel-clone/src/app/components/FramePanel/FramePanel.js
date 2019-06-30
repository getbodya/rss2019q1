import ViewInstance from "../instances/ViewInstance";
import structures from "../structures";
import LayerPanel from "../LayerPanel/LayerPanel";
import CanvasPanel from "../CanvasPanel/CanvasPanel";
import State from "../State/State";
import Project from "../Project";

export default class FramePanel extends ViewInstance {

  static imposeEventsToFramePanel() {
    const { frameStructure, frameStructure: { into } } = structures;
    const framePanel = document.querySelector('.main__frame-panel')
    $(into).sortable();
    framePanel.addEventListener('click', e => {
      e.preventDefault();
      const { target: { classList, parentNode }, target } = e;
      if (classList.contains('frame-panel__add-new-frame-btn')) {
        FramePanel.addNew(frameStructure)
      }
      if (classList.contains('frame-box__canvas')) {
        FramePanel.select(parentNode);
        FramePanel.renderFrameLayers(parentNode)
        LayerPanel.selectFirstLayer()
      }
      if (classList.contains('frame-box__delete-btn')) {
        const list = parentNode.parentNode;
        const nextLayer = parentNode.nextSibling
        if (list.children.length > 1) {
          project.deleteFrame(parentNode)
          list.removeChild(parentNode);
          if (parentNode.classList.contains('selected')) {
            if (!!nextLayer) {
              FramePanel.select(nextLayer)
              FramePanel.renderFrameLayers(nextLayer)

            } else {
              FramePanel.select(list.lastElementChild)
              FramePanel.renderFrameLayers(list.lastElementChild)
            }
          }
        }
      }
      if (classList.contains('frame-box__copy-btn')) {
        const idNewFrame = project.addCopyFrame(parentNode)
        const currentCanvas = parentNode.children[0];
        const { width } = currentCanvas;
        const currentCanvasCtx = currentCanvas.getContext('2d');
        const imgData = currentCanvasCtx.getImageData(0, 0, width, width)
        // project.addFrame(newElement)
        // const frames = project.data;
        // const idCurrentCanvas = currentCanvas.id;
        // const currentCanvasData = frames[idCurrentCanvas]
        // const idNewCanvas = newCanvas.id
        // frames[idNewCanvas] = currentCanvasData
        // State.setFrames(frames)
        const newElement = ViewInstance.render(frameStructure,idNewFrame);
        const newCanvas = newElement.children[0];
        const newCanvasCtx = newCanvas.getContext('2d')
        newCanvasCtx.putImageData(imgData, 0, 0)
        const list = parentNode.parentNode;
        list.insertBefore(newElement, parentNode.nextSibling);
      }
    })
    framePanel.addEventListener('mouseup',()=>{
      State.setFramesOrder()
    })
  }
  static renderLoadFrame(){
    let frames = project.data
    const { frameStructure } = structures;
    const frameOrder = State.getFramesOrder();
    if (Object.keys(frames).length > 0) {
      frameOrder.forEach(frameId=>{
          FramePanel.addNew(frameStructure, frameId);
       });
    } else {
      FramePanel.addNew(frameStructure);
    };
    const allFramesBox = document.querySelectorAll('.frame-box');
    allFramesBox.forEach(frameBox =>{
      FramePanel.select(frameBox);
      FramePanel.renderFrameLayers(frameBox);
    });
    FramePanel.selectFirstFrame();
  };
  static renderFrameLayers(frame) {
    const { layerStructure } = structures;
    const { canvasSize } = state;
    const frameId = frame.children[0].id;
    let frames = project.data;
    const layerList = document.querySelector('.layers-panel__layer-list')
    layerList.innerHTML = '';
    if (Object.keys(frames[frameId]).length == 0){
      const layerId = Math.random()*10e16;
      const imgData = new ImageData(canvasSize, canvasSize);
      layerList.appendChild(LayerPanel.render(layerStructure, layerId, imgData, frameId))
    }else{
      for (let layerId in frames[frameId]) {
        const { data } = frames[frameId][layerId];
        const imgData = new ImageData(canvasSize, canvasSize);
        if(data){
          imgData.data.set(Object.values(data))
        }
        layerList.appendChild(LayerPanel.render(layerStructure, layerId, imgData, frameId))
      }
    }
    LayerPanel.selectFirstLayer();
  }
  static selectFirstFrame(){
    const list = document.querySelector('.frame-panel__frame-list');
    const firstElement = list.children[0];
    FramePanel.select(firstElement)
    FramePanel.renderFrameLayers(firstElement)
  }
  static deleteAllframes(){
    const frameList =document.querySelector('.frame-panel__frame-list');
    frameList.innerHTML =''
  }
  static run() {
    FramePanel.renderLoadFrame()
    FramePanel.imposeEventsToFramePanel()
  }
}
