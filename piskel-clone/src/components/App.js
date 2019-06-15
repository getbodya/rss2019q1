import FramePanel from "./FramePanel";
import AppView from "./AppView";
import LayerPanel from "./LayerPanel";
import ToolsPanel from "./ToolsPanel";
import structures from "./structures";
import CanvasPanel from "./CanvasPanel";
import ControlPanel from "./ControlPanel";
import State from "./State/State";
import Project from "./Project"
import Preview from "./Preview";
import Options from "./Options";

export default class App{
  constructor(){

  }
  run(){
    const state = new State();
    state.run()
    const frames = State.getFrames()
    const {
      appStructure,
      toolsPanelStructure,
      framePanelStructure,
      canvasStructure,
      controlPanelStructure,
      previewStructure,
      optionStructure,
      layerPanelStructure,
    } = structures;
    AppView.render(appStructure)
    ToolsPanel.render(toolsPanelStructure)
    FramePanel.render(framePanelStructure)
    CanvasPanel.render(canvasStructure)
    ControlPanel.render(controlPanelStructure)
    Preview.render(previewStructure)
    Options.render(optionStructure)
    LayerPanel.render(layerPanelStructure)

    window.project = new Project(frames);
    project.start()
    // FramePanel.run()
    // ToolsPanel.run()
    // CanvasPanel.run()
    // LayerPanel.run()
    // Options.run()
    // Preview.run()

    // project.load()
  }
}
