import ViewInstance from "../instances/ViewInstance";
export default class ToolsPanel extends ViewInstance {
  constructor() {
    super();
  }
  static paintPixel(x, y, size, color) {
    const ctx = document.querySelector('.canvas-panel__static-canvas').getContext('2d');
    ctx.fillStyle = color
    const { rightX, rightY } = ToolsPanel.getRightPixels(x, y, size)
    ctx.fillRect(rightX, rightY, size, size);
  }
  static pen() {
    let {
      points: {
        startX,
        startY,
        endX,
        endY
      },
      toolSize,
      color
    } = this;
    if (!endX) {
      endX = startX;
      endY = startY;
    }
    ToolsPanel.paintPixel(endX, endY, toolSize, color)
  }
  static horisontalMirrorPen() {
    let {
      points: {
        startX,
        startY,
        endX,
        endY
      },
      toolSize,
      color
    } = this;
    if (!endX) {
      endX = startX;
      endY = startY;
    }
    const { canvasSize } = state;
    const mirrorY = canvasSize - 1 - endY;
    ToolsPanel.paintPixel(endX, mirrorY, toolSize, color)
    ToolsPanel.paintPixel(endX, endY, toolSize, color)
  }
  static bothMirrorPen() {
    let {
      points: {
        startX,
        startY,
        endX,
        endY
      },
      toolSize,
      color
    } = this;
    if (!endX) {
      endX = startX;
      endY = startY;
    }
    const { canvasSize } = state;
    const mirrorY = canvasSize - 1 - endY;
    const mirrorX = canvasSize - 1 - endX;
    ToolsPanel.paintPixel(endX, endY, toolSize, color);
    ToolsPanel.paintPixel(endX, mirrorY, toolSize, color);
    ToolsPanel.paintPixel(mirrorX, endY, toolSize, color);
    ToolsPanel.paintPixel(mirrorX, mirrorY, toolSize, color);
  }
  static verticalMirrorPen() {
    let {
      points: {
        startX,
        startY,
        endX,
        endY
      },
      toolSize,
      color
    } = this;
    if (!endX) {
      endX = startX;
      endY = startY;
    }
    const { canvasSize } = state;
    const mirrorX = canvasSize - 1 - endX;
    ToolsPanel.paintPixel(mirrorX, endY, toolSize, color)
    ToolsPanel.paintPixel(endX, endY, toolSize, color)
  }
  static eraser() {
    let { points: { startX, startY, endX, endY }, toolSize } = this;
    if (!endX) {
      endX = startX;
      endY = startY;
    }
    const ctx = document.querySelector('.canvas-panel__static-canvas').getContext('2d');
    const { rightX, rightY } = ToolsPanel.getRightPixels(endX, endY, toolSize)
    ctx.clearRect(rightX, rightY, toolSize, toolSize);
  }
  static paintBucket() {
    // http://www.williammalone.com/articles/html5-canvas-javascript-paint-bucket-tool/
    let { points: { startX, startY }, color } = this;
    var hexChanels = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    var fillColorR = parseInt(hexChanels[1], 16);
    var fillColorG = parseInt(hexChanels[2], 16);
    var fillColorB = parseInt(hexChanels[3], 16);
    var fillColorA = 255;
    var canvas = document.querySelector(".canvas-panel__static-canvas");
    var ctx = canvas.getContext("2d");
    var {
      width: canvasWidth,
      height: canvasHeight
    } = canvas;
    var dstImg = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    var dstData = dstImg.data;
    function getPixelPos(x, y) {
      return (y * canvas.width + x) * 4;
    };
    function matchStartColor(pos, startColor) {
      return (dstData[pos] == startColor.r &&
        dstData[pos + 1] == startColor.g &&
        dstData[pos + 2] == startColor.b &&
        dstData[pos + 3] == startColor.a);
    };
    function colorPixel(pixelPos) {
      dstData[pixelPos] = fillColorR;
      dstData[pixelPos + 1] = fillColorG;
      dstData[pixelPos + 2] = fillColorB;
      dstData[pixelPos + 3] = 255;
    }
    function floodFill(startX, startY) {

      var startPos = getPixelPos(startX, startY);
      var startColor = {
        r: dstData[startPos],
        g: dstData[startPos + 1],
        b: dstData[startPos + 2],
        a: dstData[startPos + 3]
      };

      if (!(startColor.r === fillColorR &&
        startColor.g === fillColorG &&
        startColor.b === fillColorB &&
        startColor.a === fillColorA)) {
        var pixelStack = [[startX, startY]];
        while (pixelStack.length) {
          var newPos = pixelStack.pop();
          var x = newPos[0];
          var y = newPos[1];

          var pixelPos = (y * canvasWidth + x) * 4;
          while (y-- >= 0 && matchStartColor(pixelPos, startColor)) {
            pixelPos -= canvasWidth * 4;
          }
          pixelPos += canvasWidth * 4;
          ++y;
          var reachLeft = false;
          var reachRight = false;
          while (y++ < canvasHeight - 1 && matchStartColor(pixelPos, startColor)) {
            colorPixel(pixelPos);
            if (x > 0) {
              if (matchStartColor(pixelPos - 4, startColor)) {
                if (!reachLeft) {
                  pixelStack.push([x - 1, y]);
                  reachLeft = true;
                }
              }
              else if (reachLeft) {
                reachLeft = false;
              }
            }

            if (x < canvasWidth - 1) {
              if (matchStartColor(pixelPos + 4, startColor)) {
                if (!reachRight) {
                  pixelStack.push([x + 1, y]);
                  reachRight = true;
                }
              }
              else if (reachRight) {
                reachRight = false;
              }
            }

            pixelPos += canvasWidth * 4;
          }
        }
        ctx.putImageData(dstImg, 0, 0);
      }
    };
    floodFill(startX, startY)
  }
  static lighten() {
    let {
      points: {
        startX,
        startY,
        endX,
        endY
      },
      toolSize,
      mouseClick
    } = this;
    if (!endX) {
      endX = startX;
      endY = startY;
    }
    const canvas = document.querySelector('.canvas-panel__static-canvas');
    const ctx = canvas.getContext("2d");
    const { rightX, rightY } = ToolsPanel.getRightPixels(endX, endY, toolSize)
    const pixel = ctx.getImageData(rightX, rightY, toolSize, toolSize);
    const pixelData = [...pixel.data];
    pixelData.forEach((chanel, id) => {
      if ((id + 1) % 4) {
        if (mouseClick) {
          pixel.data[id] = chanel - 25;
        } else {
          pixel.data[id] = chanel + 25;
        }
      }
      ctx.putImageData(pixel, rightX, rightY)
    })
  }
  static dithering() {
    const {
      points: {
        startX,
        startY,
        endX,
        endY,
      },
      toolSize,
    } = this;
    if (!endX) {
      endX = startX;
      endY = startY;
    }
    const { primaryColor, secondaryColor } = state;
    const matrix = [];
    const zerosX = endX - Math.floor(toolSize / 2)
    const zerosY = endY - Math.floor(toolSize / 2)
    for (let col = zerosX; col < zerosX + (+toolSize); col++) {
      for (let row = zerosY; row < zerosY + (+toolSize); row++) {
        matrix.push({ col, row })
      }
    }
    matrix.forEach(pixels => {
      const { col: x, row: y } = pixels;
      if (!(x & 1) && !(y & 1)) {
        ToolsPanel.paintPixel(x, y, 1, primaryColor)
      } else if (!(x & 1) && (y & 1)) {
        ToolsPanel.paintPixel(x, y, 1, secondaryColor)
      } else if ((x & 1) && !(y & 1)) {
        ToolsPanel.paintPixel(x, y, 1, secondaryColor)
      } else if ((x & 1) && (y & 1)) {
        ToolsPanel.paintPixel(x, y, 1, primaryColor)
      }
    })

  }
  static stroke() {
    let {
      points: {
        startX,
        startY,
        endX,
        endY
      },
      color,
      toolSize,
      canvas
    } = this;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = color;
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
  static circle() {
    let {
      points: {
        startX,
        startY,
        endX,
        endY
      },
      color,
      toolSize,
      canvas,
    } = this;
    const { ctrlTool } = state;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
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
    if (ctrlTool) {
      ctx.fill();
    } else {
      ctx.stroke();
    }
  }
  static reactangle() {
    let {
      points: {
        startX,
        startY,
        endX,
        endY
      },
      color,
      toolSize,
      canvas,
    } = this;
    const { ctrlTool } = state;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    const rectW = endX - startX;
    const rectH = endY - startY;
    if (toolSize & 1) {
      startX += 0.5
      startY += 0.5
    }
    ctx.beginPath();
    ctx.rect(startX, startY, rectW, rectH);
    ctx.lineWidth = toolSize;
    ctx.closePath();
    if (ctrlTool) {
      ctx.fill();
    } else {
      ctx.stroke();
    }
  }
  static move() {
    const {
      points: {
        startX,
        startY,
        endX,
        endY
      },
      imgData,
    } = this;
    const canvas = document.querySelector('.canvas-panel__static-canvas');
    const ctx = canvas.getContext('2d');
    const shiftX = endX - startX;
    const shiftY = endY - startY;
    ctx.clearRect(0, 0, canvas.width, canvas.width)
    ctx.putImageData(imgData, shiftX, shiftY)
  }
  static colorPicker() {
    const {
      points: {
        startX,
        startY,
      },
      mouseClick,
    } = this;
    const canvas = document.querySelector('.canvas-panel__static-canvas');
    const ctx = canvas.getContext("2d");
    const { data: pixelData } = ctx.getImageData(startX, startY, 1, 1);
    let color = '#';
    pixelData.forEach((colorChanel, id) => {
      if (id < 3) {
        let hexColor = '0'
        hexColor += colorChanel.toString(16);
        color += hexColor.slice(-2);
      }
    })
    if (!mouseClick) {
      var colorInput = document.querySelector('.color-inputs__primary-color');
      state.primaryColor = color;
    } else {
      var colorInput = document.querySelector('.color-inputs__secondary-color');
      state.secondaryColor = color;
    }
    colorInput.value = color;
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
  static imposeEventsToToolsPanel() {
    const toolsPanel = document.querySelector('.main__tools-panel');
    toolsPanel.addEventListener('click', e => {
      const { target: { classList }, target } = e;
      if (classList.contains('tools-panel__tool')) {
        ToolsPanel.select(target)
        if (classList.contains('tool__mirror-pen')) {
          if (e.ctrlKey) {
            state.selectTool = 'horisontalMirrorPen'
          } else if (e.shiftKey) {
            state.selectTool = 'bothMirrorPen'
          } else {
            state.selectTool = 'verticalMirrorPen'
          }
        } else {
          state.selectTool = target.classList[1]
        }
        if (e.ctrlKey) {
          state.ctrlTool = true;
        } else {
          state.ctrlTool = false;
        }
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
  static selectOneUnitSize() {
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
  static hotkeysPrompt() {
    const { hotKeys } = state;
    hotKeys.forEach(hotkey => {
      const { classNameSelector, key } = hotkey;
      const prompt = document.createElement('span');
      prompt.classList.add('prompt__hotkey');
      prompt.innerHTML = `hotkey: ${key}`;
      const promptContainer = document.querySelector(`${classNameSelector} > .tool__prompt`)
      promptContainer.appendChild(prompt);
    })
  }
  static run() {
    const { selectTool, primaryColor, secondaryColor } = state;
    ToolsPanel.imposeEventsToToolsPanel();
    ToolsPanel.changeColorEvent()
    ToolsPanel.imposeSizePanelEvent()
    ToolsPanel.selectOneUnitSize()
    if (selectTool) {
      const tool = document.querySelector(`.${selectTool}`);
      ToolsPanel.select(tool);
    }
    const primaryColorInput = document.querySelector(`.color-inputs__primary-color`);
    primaryColorInput.value = primaryColor;
    const secondaryColorInput = document.querySelector(`.color-inputs__secondary-color`);
    secondaryColorInput.value = secondaryColor;
    ToolsPanel.hotkeysPrompt()
  }
}
