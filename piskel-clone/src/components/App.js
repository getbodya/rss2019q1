import Canvas from './Canvas/'
import State from '../State/State';
import './Tools/';
import Settings from './Options/Settings'
import Frames from './Frames/'
import runTools from './Tools/';
import Preview from './Preview/';
import SecondCanvas from './Canvas/view/SecondCanvas';
import Keyboard from './Keyboard';
import Layers from './Layers';
export default class App {
	constructor() {
	}
	run() {
    const state = new State();
    state.run();
    SecondCanvas.renderCanvas()
    runTools();
    Canvas.renderCanvas();
    Settings.run();
    Frames.run();
    Preview.run();
    var keyboard = new Keyboard();
    keyboard.run();
    Layers.run();
  }
}
