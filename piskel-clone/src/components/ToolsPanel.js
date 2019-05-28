export default class ToolsPanel {
  constructor() {
    this.toolsPanelItems = document.querySelectorAll('.tools-panel__item');
    this.sizePanel = document.querySelectorAll('.size-panel__item');
    this.colorInputs = document.querySelectorAll('.color-panel__input');
  }
  static paintPixel(x, y) {
    const ctx = document.querySelector('.canvas-box__canvas').getContext('2d');
    const { currentColor } = state;
    ctx.fillStyle = currentColor;
    ctx.fillRect(x, y, 1, 1);
  }
  static pen(x, y) {
    ToolsPanel.paintPixel(x, y)
  }
  static verticalMirrorPen(x, y) {
    const mirrorX = 31 - x;
    ToolsPanel.paintPixel(x, y);
    ToolsPanel.paintPixel(mirrorX, y)
  }
  static horisontalMirrorPen(x, y) {
    const mirrorY = 31 - y;
    ToolsPanel.paintPixel(x, y);
    ToolsPanel.paintPixel(x, mirrorY)
  }
  static bothMirrorPen(x, y) {
    const mirrorY = 31 - y;
    const mirrorX = 31 - x;
    ToolsPanel.paintPixel(x, y);
    ToolsPanel.paintPixel(x, mirrorY);
    ToolsPanel.paintPixel(mirrorX, y);
    ToolsPanel.paintPixel(mirrorX, mirrorY);
  }
  static paintBucket(x, y) {
    const ctx = document.querySelector('.canvas-box__canvas').getContext('2d');
    const startPixel = ctx.getImageData(x, y, 1, 1).data;
    function pixelCompare(x, y) {
      if (-1 < x && x < 32 && -1 < y && y < 32) {
        ToolsPanel.paintPixel(x, y);
        const nearbyPixels = {
          topPixel: {
            pixelX: x,
            pixelY: y - 1,
            data: ctx.getImageData(x, y - 1, 1, 1).data,
          },
          rightPixel: {
            pixelX: x + 1,
            pixelY: y,
            data: ctx.getImageData(x + 1, y, 1, 1).data,
          },
          bottomPixel: {
            pixelX: x,
            pixelY: y + 1,
            data: ctx.getImageData(x, y + 1, 1, 1).data,
          },
          leftPixel: {
            pixelX: x - 1,
            pixelY: y,
            data: ctx.getImageData(x - 1, y, 1, 1).data,
          },
        }
        for (let key in nearbyPixels) {
          const { pixelX, pixelY, data } = nearbyPixels[key];
          if (_.isEqual(startPixel, data)) {
            pixelCompare(pixelX, pixelY)
          }
        }
      }
      return;
    }
    pixelCompare(x, y);
  }
  static paintAll() {
    const ctx = document.querySelector('.canvas-box__canvas').getContext('2d');
    const { currentColor } = state;
    ctx.fillStyle = currentColor;
    ctx.fillRect(0, 0, 32, 32);
  }
  unselectTools() {
    state.selectTool = '';
    const tools = document.querySelectorAll('.tools-panel__item');
    tools.forEach(tool => {
      if (tool.classList.contains('selected')) {
        tool.classList.remove('selected');
      }
    })
  }
  unselectSize() {
    this.sizePanel.forEach(tool => {
      if (tool.classList.contains('selected')) {
        tool.classList.remove('selected');
      }
    })
  }
  run() {
    this.toolsPanelItems.forEach(item => {
      item.addEventListener('click', () => {
        this.unselectTools();
        item.classList.add('selected');
        state.selectTool = item.dataset.tool;
      })
    });
    this.sizePanel.forEach(item => {
      if (item.dataset.size === '1') {
        item.classList.add('selected');
      }
      item.addEventListener('click', () => {
        this.unselectSize();
        item.classList.add('selected');
        state.toolSize = item.dataset.size
      })
    })
    this.colorInputs.forEach(item => {
      if (item.classList.contains('current-color')) {
        item.value = state.currentColor;
      } else if (item.classList.contains('prev-color')) {
        item.value = state.prevColor;
      }
      item.addEventListener('input', (e) => {
        state.prevColor = state.currentColor;
        state.currentColor = item.value;
        document.querySelector('.prev-color').value = state.prevColor;
      })
    })
  }
}
