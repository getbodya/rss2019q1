import FramePanel from "../FramePanel";
import ToolsPanel from "../ToolsPanel";
import CanvasPanel from "../CanvasPanel";
import LayerPanel from "../LayerPanel";
import Options from "../Options";
import preview from "../Preview";
import ViewInstance from "../instances/ViewInstance";
import State from "../State/State";
import Hotkeys from "../Options/HotKeys";
import GIF from 'gif.js.optimized';

export default class Project{
  constructor(){
    this.data = {
        123123: {
          1232222: []
        }
      };
    this.startWindowStructure = {
      tag:'div',
      attr:{
        class:'start-window'
      },
      children:[
        {
          tag:'button',
          attr:{
            class:'start-window__new-project-btn'
          },
          content: 'Create new project'
        },
        {
          tag:'button',
          attr:{
            class:'start-window__load-last-project-btn'
          },
          content: 'Load last project'
        }
      ]
    }
  }
  addFrame(frame){
    let frames = this.data
    const idNewFrame = frame.childNodes[0].id;
    if(!frames[idNewFrame]){
      frames[idNewFrame] = {};
    }
    State.setFrames(frames)
  }
  deleteFrame(frame){
    const frames = this.data
    const idFrame = frame.childNodes[0].id;
    delete frames[idFrame];
    State.setFrames(frames)
  }
  addCopyFrame(frame){
    const frames = this.data;
    const idCurrentFrame = frame.childNodes[0].id;
    const idNewFrame= Math.random()*10e16;
    frames[idNewFrame] = {}
    for(let layer in frames[idCurrentFrame]){
      const idCopyLayer = Math.random()*10e16;
      frames[idNewFrame][idCopyLayer] = {};
      Object.assign(frames[idNewFrame][idCopyLayer],frames[idCurrentFrame][layer])
    }
    State.setFrames(frames)
    return idNewFrame
  }
  deleteLayer(layer){
    const frames = this.data
    const idSelectedFrame = document.querySelector('.frame-panel__frame-list > .selected').children[0].id
    const idLayer = layer.childNodes[0].id;
    delete frames[idSelectedFrame][idLayer];
    State.setFrames(frames)
  }
  saveLayer(layer,data){
    const frames = this.data
    const frameId = layer.dataset.frame;
    const layerId = layer.id;
    frames[frameId][layerId]=data;
    State.setFrames(frames)
  }
  static imposeStartWindowEvent(startWindow){
    startWindow.addEventListener('click', e =>{
      const {target:{classList}} = e;
      if(classList.contains('start-window__new-project-btn')){
        Project.closeStartWindow(startWindow);
        State.setFrames(project.data);
        State.setFramesOrder();
        Project.prototype.run();
      }
      if(classList.contains('start-window__load-last-project-btn')){
        Project.closeStartWindow(startWindow);
        const frames = State.getFrames();
        project.data = frames
        State.setFrames(project.data)
        Project.prototype.run();
      }
    })
  }
  openStartWindow(){
    const startWindow = ViewInstance.render(this.startWindowStructure);
    Project.imposeStartWindowEvent(startWindow)
    const canvasPanel = document.querySelector('.main__canvas-panel');
    canvasPanel.appendChild(startWindow);
    if(!State.getFrames()){
      const loadLastBtn = document.querySelector('.start-window__load-last-project-btn')
      loadLastBtn.classList.add('hidden')
    }
  }
  static closeStartWindow(startWindow){
    const canvasPanel = document.querySelector('.main__canvas-panel');
    canvasPanel.removeChild(startWindow)
  }
  
  start(){
    this.openStartWindow()
  }
  run(){
    FramePanel.run();
    LayerPanel.run();
    ToolsPanel.run();
    CanvasPanel.run();
    preview.run()
    Options.run();
    Hotkeys.run();
  }
}
