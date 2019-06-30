import FramePanel from "../FramePanel";
// import AppView from "./AppView";
import LayerPanel from "../LayerPanel";
import ToolsPanel from "../ToolsPanel";
import structures from "../structures";
import CanvasPanel from "../CanvasPanel";
import ControlPanel from "../ControlPanel";
import State from "../State/State";
import Project from "../Project"
import preview from "../Preview";
import Options from "../Options";
import ViewInstance from "../instances/ViewInstance";


export default class App{
  constructor(){
    this.structure = {
      parent: 'body',
      tag: 'div',
      className: 'app',
      children: [
        {
          tag: 'header',
          className: 'app__header',
          children:[
            {
              tag:'h1',
              className: 'header__label',
              content: 'PISKELCLONE'
            }
          ],
        },
        {
          tag: 'main',
          className: 'app__main',

        },
      ],

    }
  }
  run(){
    const state = new State();
    state.run()
    const frames = State.getFrames()
    const {
      toolsPanelStructure,
      framePanelStructure,
      canvasStructure,
      controlPanelStructure,
      optionStructure,
      layerPanelStructure,
    } = structures;
    ViewInstance.render(this.structure)
    ToolsPanel.render(toolsPanelStructure)
    FramePanel.render(framePanelStructure)
    CanvasPanel.render(canvasStructure)
    ControlPanel.render(controlPanelStructure)
    ViewInstance.render(preview.previewStructure)
    Options.render(optionStructure)
    LayerPanel.render(layerPanelStructure)

    window.project = new Project(frames);
    project.start();
  }
}
