import Events from './Events';
import Canvas from './Canvas';
import ToolsPanel from './ToolsPanel';
export default class App {

	constructor(state) {
		this.state = state;
	}

	run() {
    window.state = this.state;
    window.canvas = new Canvas;
    window.toolsPanel = new ToolsPanel;
    canvas.imposeEvent();
    toolsPanel.imposeEvents();
	}
}
