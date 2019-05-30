import Canvas from './Canvas/'
import State from '../State/State';
import './Tools/';
import fullScreenMode from './FullScreenMode';
import Settings from './Options/Settings'
import Frames from './Frames/'
import runTools from './Tools/';
import Preview from './Preview/';
import SecondCanvas from './Canvas/view/SecondCanvas';
import Cursor from './Cursor/Cursor';
export default class App {
	constructor() {
	}

	run() {
    SecondCanvas.renderCanvas()
    State.run();
    runTools();
    Canvas.renderCanvas();
    Settings.run();
    Frames.run();
    fullScreenMode();
    // Preview.run()
    // Cursor.run()
  }
}
