import Events from './Events';
import Canvas from './Canvas';
import ToolsPanel from './ToolsPanel';
export default class App {

	constructor(state) {
		this.state = state;
	}

	run() {
    window.state = this.state;
    const canvas = new Canvas;
    canvas.imposeEvent();
    const toolsPanel = new ToolsPanel;
    toolsPanel.imposeEvents();
	}
}
