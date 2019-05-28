// import Canvas from './Canvas';
import ToolsPanel from './ToolsPanel';
// import Frame from './Frame';
import Layer from './Layer';
import Preview from './Preview';
import fullScreenMode from './FullScreenMode';


import Canvas from './Canvas/'
import State from '../State';
import './Tools/';
import Settings from './Options/Settings'
import Frames from './Frames/'
// var canvas = new Canvas();
var layer = new Layer();
var toolsPanel = new ToolsPanel();
// window.frame = new Frame();

export default class App {
	constructor() {
	}

	run() {

    var state = new State();
    state.run();

    Canvas.renderCanvas();
    Settings.run();
    Frames.run();
    fullScreenMode();
    window.state = this.state;
    // frame.run();
    layer.run();
    Preview.run()

	}
}
