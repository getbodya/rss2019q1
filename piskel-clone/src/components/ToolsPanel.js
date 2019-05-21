export default class ToolsPanel {
  constructor(){
    this.toolsPanel = document.querySelectorAll('.tools-panel__item')
  }

  imposeEvents() {
    this.toolsPanel.forEach(item => {
      item.addEventListener('click',()=>{
        state.selectTool = item.dataset.tool;
      })
    })
	}
}
