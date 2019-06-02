import { getState, setState } from '../services/state';

export default class Frames {
  static imposeEventsToCanvas() {
    const figureWidth = 144;
    const radius = figureWidth / 2;
    const canvas = document.querySelector('.canvas-container__canvas');
    canvas.addEventListener('mouseup', () => {
      const { figures } = getState();
      const selectFrame = document.querySelector('.selected-frame');
      selectFrame.dataset.figures = JSON.stringify(figures);
      const ctx = selectFrame.getContext('2d');
      ctx.clearRect(0, 0, 450, 450);
      ctx.beginPath();
      figures.forEach(figure => {
        const { color, circle, top, left } = figure;
        const x = +left;
        const y = +top;
        ctx.fillStyle = color;
        if (!circle) {
          ctx.fillRect(x, y, figureWidth, figureWidth);
        } else {
          const centerX = x + 72;
          const centerY = y + 72;
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
          ctx.fill();
          ctx.closePath();
        }
      });
    });
  }

  static imposeEventsToFrames() {
    const frameContainer = document.querySelector('.main__frame-container');
    frameContainer.addEventListener('click', e => {
      if (e.target.classList.contains('copy')) {
        const currentFrame = e.target.parentElement.parentElement;
        Frames.copyFrame(currentFrame);
      }
      if (e.target.classList.contains('delete')) {
        const currentFrame = e.target.parentElement.parentElement;
        Frames.deleteFrame(currentFrame);
      }
      if (e.target.classList.contains('add-frame')
			|| e.target.classList.contains('frame-container__add-frame-btn')) {
        Frames.addFrame();
      }
      if (e.target.classList.contains('frame__canvas')) {
        const currentFrame = e.target;
        Frames.selectFrame(currentFrame);
      }
    });
  }

  static unselectFrames() {
    const frameList = document.querySelectorAll('.frame__canvas');
    frameList.forEach(frame => {
      if (frame.classList.contains('selected-frame')) {
        frame.classList.remove('selected-frame');
      }
    });
  }

  static renderCanvas(frame) {
    if (frame.dataset.figures) {
      const figuresData = JSON.parse(frame.dataset.figures);
      const allFigure = document.querySelectorAll('.canvas__figure');
      allFigure.forEach((figure, id) => {
        const { circle, color, left, top } = figuresData[id];
        figure.style.backgroundColor = color;
        figure.style.top = `${top}px`;
        figure.style.left = `${left}px`;
        if (circle) {
          figure.classList.add('circle');
        } else {
          figure.classList.remove('circle');
        }
      });
      const state = getState();
      state.figures = figuresData;
      setState(state);
    }
  }

  static selectFrame(frame) {
    Frames.renderCanvas(frame);
    if (!frame.classList.contains('selected-frame')) {
      Frames.unselectFrames();
      frame.classList.add('selected-frame');
    }
  }

  static makeFrame() {
    const newFrame = document.createElement('div');
    newFrame.classList.add('frame');
    newFrame.classList.add('frames__frame');
    const canvas = document.createElement('canvas');
    canvas.classList.add('frame__canvas');
    canvas.width = '450';
    canvas.height = '450';
    const copyBtn = document.createElement('div');
    copyBtn.classList.add('frame__copy-btn');
    copyBtn.innerHTML = '<i class="fas fa-copy copy"></i>';
    const deleteBtn = document.createElement('div');
    deleteBtn.classList.add('frame__delete-btn');
    deleteBtn.innerHTML = '<i class="fas fa-trash delete">';
    newFrame.appendChild(canvas);
    newFrame.appendChild(copyBtn);
    newFrame.appendChild(deleteBtn);
    return newFrame;
  }

  static addFrame() {
    const newFrame = Frames.makeFrame();
    const frameList = document.querySelector('.frame-container__frames');
    frameList.appendChild(newFrame);
  }

  static deleteFrame(frame) {
    const frameList = document.querySelector('.frame-container__frames');
    if (frameList.children.length > 1) {
      frameList.removeChild(frame);
    }
  }

  static copyFrame(frame) {
    const newFrame = frame.cloneNode(true);
    const currentCtx = frame.children[0].getContext('2d');
    const img = currentCtx.getImageData(0, 0, 450, 450);
    const newCtx = newFrame.children[0].getContext('2d');
    newCtx.putImageData(img, 0, 0);
    newFrame.children[0].classList.remove('selected-frame');
    const frameList = document.querySelector('.frame-container__frames');
    frameList.insertBefore(newFrame, frame.nextSibling);
  }

  static run() {
    Frames.imposeEventsToFrames();
    Frames.imposeEventsToCanvas();
  }
}
