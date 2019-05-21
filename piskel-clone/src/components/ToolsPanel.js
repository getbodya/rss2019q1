export default class ToolsPanel {
  constructor() {
    this.toolsPanel = document.querySelectorAll('.tools-panel__item')
  }
  pen(x, y) {
    const ctx = document.querySelector('.canvas-box__canvas').getContext('2d');
    const { currentColor, toolSize } = state;
    ctx.fillStyle = currentColor;
    ctx.fillRect(x, y, toolSize, toolSize);
  }

  verticalMirrorPen(x, y) {
    const ctx = document.querySelector('.canvas-box__canvas').getContext('2d');
    const { currentColor, toolSize } = state;
    const mirrorX = 31 - x;
    console.log(x, mirrorX)
    ctx.fillStyle = currentColor;
    ctx.fillRect(x, y, toolSize, toolSize);
    ctx.fillRect(mirrorX, y, toolSize, toolSize);
  }

  horisontalMirrorPen(x, y) {
    const ctx = document.querySelector('.canvas-box__canvas').getContext('2d');
    const { currentColor, toolSize } = state;
    const mirrorY = 31 - y;
    console.log(y, mirrorY)
    ctx.fillStyle = currentColor;
    ctx.fillRect(x, y, toolSize, toolSize);
    ctx.fillRect(x, mirrorY, toolSize, toolSize);
  }
  bothMirrorPen(x, y) {
    const ctx = document.querySelector('.canvas-box__canvas').getContext('2d');
    const { currentColor, toolSize } = state;
    const mirrorY = 31 - y;
    const mirrorX = 31 - x;
    console.log(y, mirrorY)
    ctx.fillStyle = currentColor;
    ctx.fillRect(x, y, toolSize, toolSize);
    ctx.fillRect(x, mirrorY, toolSize, toolSize);
    ctx.fillRect(mirrorX, y, toolSize, toolSize);
    ctx.fillRect(mirrorX, mirrorY, toolSize, toolSize);
  }
  paintBucket(x, y) {
    const ctx = document.querySelector('.canvas-box__canvas').getContext('2d');

    const startPixel = ctx.getImageData(x, y, 1, 1).data.join('')
    function comparePixel(x, y, prevPx) {
      if (-1 < x && x < 32 && -1 < y && y < 32) {
        const { currentColor } = state;
        ctx.fillStyle = currentColor;
        ctx.fillRect(x, y, 1, 1);
        let topPixel = ctx.getImageData(x, y - 1, 1, 1).data.join('')
        let rightPixel = ctx.getImageData(x + 1, y, 1, 1).data.join('')
        let bottomPixel = ctx.getImageData(x, y + 1, 1, 1).data.join('')
        let leftPixel = ctx.getImageData(x - 1, y, 1, 1).data.join('')
        switch (prevPx) {
          case 'bot':
            bottomPixel = null;
            break;
          case 'right':
            rightPixel = null;
            break;
          case 'top':
            topPixel = null;
            break;
          case 'left':
            leftPixel = null;
            break;
          default:
            break;
        }
        if (startPixel === topPixel) {
          const prevPixel = 'bot'
          comparePixel(x, y - 1, prevPixel)
        }
        if (startPixel === rightPixel) {
          const prevPixel = 'left'

          comparePixel(x + 1, y, prevPixel)

        }
        if (startPixel === bottomPixel) {
          const prevPixel = 'top'

          comparePixel(x, y + 1, prevPixel)

        }
        if (startPixel === leftPixel) {
          const prevPixel = 'right'

          comparePixel(x - 1, y, prevPixel)

        }
      } else {
        return;
      }
      return
    }
    comparePixel(x, y);
  }
  paintAll() {
    const ctx = document.querySelector('.canvas-box__canvas').getContext('2d');
    const { currentColor } = state;
    ctx.fillStyle = currentColor;
    ctx.fillRect(0, 0, 32, 32);
  }

  unselectTools() {
    state.selectTool = '';
    const tools = document.querySelectorAll('.tools-panel__item');
    tools.forEach(tool => {
      if (tool.classList.contains('select-tool')) {
        tool.classList.remove('select-tool');
      }
    })
  }
  imposeEvents() {
    this.toolsPanel.forEach(item => {
      item.addEventListener('click', () => {
        this.unselectTools();
        item.classList.add('select-tool');
        state.selectTool = item.dataset.tool;
      })
    })
  }
}
