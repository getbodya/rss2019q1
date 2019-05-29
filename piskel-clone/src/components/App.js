import Canvas from './Canvas/'
import State from '../State/State';
import './Tools/';
import fullScreenMode from './FullScreenMode';
import Settings from './Options/Settings'
import Frames from './Frames/'
import runTools from './Tools/';
import Preview from './Preview/';
export default class App {
	constructor() {
	}

	run() {
    State.run();
    runTools();
    Canvas.renderCanvas();
    Settings.run();
    Frames.run();
    fullScreenMode();
    Preview.run()
  }
}
