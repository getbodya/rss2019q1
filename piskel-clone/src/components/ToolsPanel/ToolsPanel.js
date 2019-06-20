import ViewInstance from "../instances/ViewInstance";

export default class ToolsPanel extends ViewInstance {
  constructor(structure) {
    super();
    this.structure = structure;
  }
  static paintPixel(x, y, size, primColor) {
    const ctx = document.querySelector('.canvas-panel__static-canvas').getContext('2d');
    const { primaryColor, secondaryColor } = state;
    if (!primColor) {
      ctx.fillStyle = primaryColor;
    } else {
      ctx.fillStyle = secondaryColor;
    }
    const { rightX, rightY } = ToolsPanel.getRightPixels(x, y, size)

    ctx.fillRect(rightX, rightY, size, size);
  }
  static pen(x, y, size, mouseClick) {
    ToolsPanel.paintPixel(x, y, size, mouseClick)
  }
  static horisontalMirrorPen(x, y, size, mouseClick) {
    const { canvasSize } = state;
    const mirrorY = canvasSize - 1 - y;
    ToolsPanel.paintPixel(x, mirrorY, size, mouseClick)
    ToolsPanel.paintPixel(x, y, size, mouseClick)
  }
  static bothMirrorPen(x, y, size, mouseClick) {
    const { canvasSize } = state;
    const mirrorY = canvasSize - 1 - y;
    const mirrorX = canvasSize - 1 - x;
    ToolsPanel.paintPixel(x, y, size, mouseClick);
    ToolsPanel.paintPixel(x, mirrorY, size, mouseClick);
    ToolsPanel.paintPixel(mirrorX, y, size, mouseClick);
    ToolsPanel.paintPixel(mirrorX, mirrorY, size, mouseClick);
  }
  static verticalMirrorPen(x, y, size, mouseClick) {
    const { canvasSize } = state;
    const mirrorX = canvasSize - 1 - x;
    ToolsPanel.paintPixel(mirrorX, y, size, mouseClick)
    ToolsPanel.paintPixel(x, y, size, mouseClick)
  }
  static eraser(x, y, size) {
    const ctx = document.querySelector('.canvas-panel__static-canvas').getContext('2d');
    const { rightX, rightY } = ToolsPanel.getRightPixels(x, y,size)
    ctx.clearRect(rightX, rightY, size, size);
  }
  static paintBucket(x, y, mouseClick) {
    const ctx = document.querySelector('.canvas-panel__static-canvas').getContext('2d');
    const startPixel = ctx.getImageData(x, y, 1, 1).data;
    const pixelArr = []
    const { canvasSize } = state;
    function pixelCompare(x, y) {
      if (-1 < x && x < canvasSize && -1 < y && y < canvasSize) {
        ToolsPanel.paintPixel(x, y, 1, mouseClick);
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
            pixelArr.push([pixelX, pixelY])
          }
        }
      }
    }
    pixelCompare(x, y);
  }
  static lighten(x, y, mouseClick) {
    const { toolSize } = state;
    const canvas = document.querySelector('.canvas-panel__static-canvas');
    const ctx = canvas.getContext("2d");
    const { rightX, rightY } = ToolsPanel.getRightPixels(x, y, toolSize)
    const pixel = ctx.getImageData(rightX,rightY, toolSize, toolSize);
    const pixelData = [...pixel.data];
    pixelData.forEach((chanel, id) => {
      if ((id+1)%4) {
        if (mouseClick) {
          pixel.data[id] = chanel - 25;
        } else {
          pixel.data[id] = chanel + 25;
        }
      }
      ctx.putImageData(pixel,rightX,rightY)
    })
  }
  static dithering(x, y) {
    const { toolSize } = state;
    const matrix = [];
    const zerosX = x - Math.floor(toolSize / 2)
    const zerosY = y - Math.floor(toolSize / 2)
    for (let col = zerosX; col < zerosX + (+toolSize); col++) {
      for (let row = zerosY; row < zerosY + (+toolSize); row++) {
        matrix.push({ col, row })
      }
    }
    matrix.forEach(pixels => {
      const { col: x, row: y } = pixels;
      if (!(x & 1) && !(y & 1)) {
        ToolsPanel.paintPixel(x, y, 1, true)
      } else if (!(x & 1) && (y & 1)) {
        ToolsPanel.paintPixel(x, y, 1, false)
      } else if ((x & 1) && !(y & 1)) {
        ToolsPanel.paintPixel(x, y, 1, false)
      } else if ((x & 1) && (y & 1)) {
        ToolsPanel.paintPixel(x, y, 1, true)
      }
    })

  }
  static stroke(points, primColor, canvas) {
    let { startX, startY, endX, endY } = points;
    const { primaryColor, secondaryColor, toolSize } = state;
    const ctx = canvas.getContext("2d");
    if (!primColor) {
      ctx.strokeStyle = primaryColor;
    } else {
      ctx.strokeStyle = secondaryColor;
    }
    ctx.globalAlpha = 1;
    if (toolSize & 1) {
      startX += 0.5
      startY += 0.5
      endX += 0.5
      endY += 0.5
    }
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.lineWidth = toolSize;
    ctx.closePath();
    ctx.stroke();
  }
  static circle(points, primColor, canvas) {
    let { startX, startY, endX, endY } = points;
    const { primaryColor, secondaryColor, toolSize, ctrlTool } = state;
    const ctx = canvas.getContext("2d");
    if (!primColor) {
      ctx.strokeStyle = primaryColor;
      ctx.fillStyle = primaryColor;
    } else {
      ctx.strokeStyle = secondaryColor;
      ctx.fillStyle = secondaryColor;
    }
    const diffX = Math.abs(endX - startX);
    const diffY = Math.abs(endY - startY);
    let radius = 1;
    if (diffX >= diffY) {
      radius = diffX
    } else {
      radius = diffY
    }
    if (toolSize & 1) {
      startX += 0.5
      startY += 0.5
    }
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.arc(startX, startY, radius, 0, 2 * Math.PI, false);
    ctx.lineWidth = toolSize;
    ctx.closePath();
    if(ctrlTool){
      ctx.fill();
    }else{
      ctx.stroke();
    }
  }
  static reactangle(points, primColor, canvas) {
    let { startX, startY, endX, endY } = points;
    const { primaryColor, secondaryColor, toolSize, ctrlTool } = state;
    const ctx = canvas.getContext("2d");
    if (!primColor) {
      ctx.strokeStyle = primaryColor;
      ctx.fillStyle = primaryColor;
    } else {
      ctx.strokeStyle = secondaryColor;
      ctx.fillStyle = secondaryColor;
    }
    const rectW = endX - startX;
    const rectH = endY - startY;
    if (toolSize & 1) {
      startX += 0.5
      startY += 0.5
    }
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.rect(startX, startY, rectW, rectH);
    ctx.lineWidth = toolSize;
    ctx.closePath();
    if(ctrlTool){
      ctx.fill();
    }else{
      ctx.stroke();
    }
  }
  static move(points, imgData) {
    const { startX, startY, endX, endY } = points;
    const canvas = document.querySelector('.canvas-panel__static-canvas');
    const ctx = canvas.getContext('2d');
    const shiftX = endX - startX;
    const shiftY = endY - startY;
    ctx.clearRect(0, 0, canvas.width, canvas.width)
    ctx.putImageData(imgData, shiftX, shiftY)
  }
  static colorPicker(x,y,mouseClick){
    const canvas = document.querySelector('.canvas-panel__static-canvas');
    const ctx = canvas.getContext("2d");
    const {data:pixelData} = ctx.getImageData(x,y, 1, 1);
    let color = '#';
    pixelData.forEach((colorChanel,id) => {
      if(id<3){
        let hexColor = '0'
        hexColor += colorChanel.toString(16);
        color+=hexColor.slice(-2);
      }
    })
    if(!mouseClick){
      var colorInput = document.querySelector('.color-inputs__primary-color');
      state.primaryColor = color;
    }else{
      var colorInput = document.querySelector('.color-inputs__secondary-color');
      state.secondaryColor = color;
    }
    colorInput.value = color;
  }

  static toolsClickEvent(e) {
    const { target: { classList }, target } = e;
    if (classList.contains('tools-panel__tool')) {
      ToolsPanel.select(target)
      if (classList.contains('tool__mirror-pen')) {
        if (e.ctrlKey) {
          state.selectTool = 'horisontal-pen'
        } else if (e.shiftKey) {
          state.selectTool = 'both-pen'
        } else {
          state.selectTool = 'tool__mirror-pen'
        }
      } else {
        state.selectTool = target.classList[1]
      }
      console.log(e.ctrlKey)
      if(e.ctrlKey){
        state.ctrlTool = true;
        console.log(state)
      }else{
        state.ctrlTool = false;
        console.log(state)
      }
    }
  }
  static changeColorEvent() {
    const allColorInput = document.querySelectorAll('input[type=color]')
    allColorInput.forEach(input => {
      input.addEventListener('change', () => {
        const colorInputName = input.classList[1]
        state[colorInputName] = input.value
      })
    })

  }
  static imposeSizePanelEvent() {
    const sizePanel = document.querySelector('.tools-panel__size-panel')
    sizePanel.addEventListener('click', e => {
      const { target: sizeInput, target: { classList } } = e;
      if (classList.contains('size-panel__size-input')) {
        ToolsPanel.selectSize(sizeInput)
      }
    })
  }
  static selectSize(input) {
    const {
      parentNode: { childNodes: allSizeInputs },
      dataset: { size },
    } = input;
    allSizeInputs.forEach(inputSize => {
      if (inputSize.classList.contains('selected-size')) {
        inputSize.classList.remove('selected-size')
      }
    })
    state.toolSize = size;
    input.classList.add('selected-size')
  }
  static selectOneUnitSize(){
    const oneUnitSize = document.querySelector('.one-unit');
    ToolsPanel.selectSize(oneUnitSize)
  }
  static getRightPixels(x, y, size) {
    const rightPixels = {
      rightX: x - Math.floor(size / 2),
      rightY: y - Math.floor(size / 2),
    }
    return rightPixels
  }
  static hotkeysPrompt(){
    const {hotKeys} = state;
    hotKeys.forEach(hotkey => {
      const {classNameSelector,key} = hotkey;
      const toolPromptHotkey = document.querySelector(`${classNameSelector} > .tool__prompt > .prompt__hotkey`);
      toolPromptHotkey.innerHTML = `hotkey: ${key}`;
    })
  }
  static run() {
    const { selectTool, primaryColor, secondaryColor } = state;
    const tools = document.querySelector('.main__tools-panel');
    ToolsPanel.imposeClickEvent(tools, ToolsPanel.toolsClickEvent);
    ToolsPanel.changeColorEvent()
    ToolsPanel.imposeSizePanelEvent()
    ToolsPanel.selectOneUnitSize()
    if (selectTool) {
      const tool = document.querySelector(`.${selectTool}`)
      ToolsPanel.select(tool)
    }
    const primaryColorInput = document.querySelector(`.color-inputs__primary-color`);
    primaryColorInput.value = primaryColor;
    const secondaryColorInput = document.querySelector(`.color-inputs__secondary-color`);
    secondaryColorInput.value = secondaryColor;
    ToolsPanel.hotkeysPrompt()
  }
}
