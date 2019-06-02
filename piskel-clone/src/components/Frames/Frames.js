import State from "../../State";
import Layers from "../Layers";

export default class Frames {
  constructor() {

  }
  static unselectFrame() {
    const allFrames = document.querySelectorAll('.frame-box__frame');
    allFrames.forEach(item => {
      if (item.classList.contains('selected-frame')) {
        item.classList.remove('selected-frame')
      }
    })
  }
  static selectFrame(frame) {
    Frames.unselectFrame();
    frame.classList.add('selected-frame')
    Frames.transDataFrameToCanvas(frame)
    Layers.renderLayers(frame)

  }
  static transDataFrameToCanvas(frame) {
    const { canvasSize } = State.getState();
    const frameCtx = frame.getContext('2d');
    const frameData = frameCtx.getImageData(0, 0, canvasSize, canvasSize);
    const canvasCtx = document.querySelector('.canvas-box__canvas').getContext('2d');
    canvasCtx.putImageData(frameData, 0, 0);
  }
  static imposeEventToFrame(frame) {
    frame.addEventListener('click', () => {
      Frames.selectFrame(frame)
    })
  }
  static makeDeleteFrameBtn() {
    const deleteFrameBtn = document.createElement('span');
    deleteFrameBtn.setAttribute('class', 'item__del-btn');
    deleteFrameBtn.innerHTML = '<i class="far fa-trash-alt icon"></i>';
    deleteFrameBtn.addEventListener('click', (e) => {
      const frameList = document.querySelector('.frame-box__list')
      if (frameList.children.length > 1) {
        frameList.removeChild(e.path[2])
      }
      console.log(frameList.children.length)
    })
    return deleteFrameBtn;
  }
  static makeDuplicateFrameBtn(frameBox) {
    const copyFrameBtn = document.createElement('span');
    copyFrameBtn.setAttribute('class', 'item__add-btn');
    copyFrameBtn.innerHTML = '<i class="far fa-plus-square icon"></i>';
    copyFrameBtn.addEventListener('click', () => {
      const canvas = frameBox.childNodes[2];
      const ctx = canvas.getContext('2d');
      const data = ctx.getImageData(0, 0, 32, 32)
      Frames.addDuplicateFrame(data, frameBox)
    })
    return copyFrameBtn;
  }
  static imposeEventToNewFrameBtn() {
    const addFrameBtn = document.querySelector('.frame-box__new-item-btn');
    addFrameBtn.addEventListener('click', () => {
      // Frames.unselectFrame()
      Frames.addNewFrame()
    })
  }
  static resizeFrames(newSize) {
    const frames = document.querySelectorAll('.frame-box__frame');
    frames.forEach(frame => {
      console.log(frame)
      const currentSize = frame.width;
      const ctx = frame.getContext('2d');
      const img = ctx.getImageData(0, 0, currentSize, currentSize);
      // img.src = canvas.toDataURL()
      console.log(img);
      frame.width = newSize;
      frame.height = newSize;
      ctx.putImageData(img, 0, 0)
    })
  }
  static makeFrame(id) {
    const { canvasSize } = State.getState()
    const frameBox = document.createElement('div');
    frameBox.setAttribute('class', 'frame-box__item')
    const frame = document.createElement('canvas');
    Frames.imposeEventToFrame(frame)
    frame.setAttribute('class', 'frame-box__frame')
    if (!id) {
      id = Math.random() * 10e16;
      Frames.saveFrameToState(id)
    }
    frame.id = id;
    frame.width = canvasSize;
    frame.height = canvasSize;
    const deleteFrameBtn = Frames.makeDeleteFrameBtn()
    const copyFrameBtn = Frames.makeDuplicateFrameBtn(frameBox);
    frameBox.appendChild(copyFrameBtn)
    frameBox.appendChild(deleteFrameBtn)
    frameBox.appendChild(frame);

    return frameBox
  }
  static addDuplicateFrame(data, currentFrameBox) {
    const newFrameBox = Frames.makeFrame(data);
    const frameList = document.querySelector('.frame-box__list');
    frameList.insertBefore(newFrameBox, currentFrameBox.nextSibling);
  }
  static addNewFrame(id) {
    const frameBox = Frames.makeFrame(id)
    document.querySelector('.frame-box__list').appendChild(frameBox)
  }
  static saveFrameToState(id) {
    const state = State.getState()
    const { frames } = state;
    const frameData = {
      id,
      layers: [],
    }
    frames.push(frameData);
    State.setState(state)
  }
  static renderFrames() {
    const { frames } = State.getState()
    if (frames.length === 0) {
      Frames.addNewFrame()
    }
    frames.forEach((frame) => {
      Frames.addNewFrame(frame.id)
    })
  }
  static run() {
    Frames.renderFrames();
    Frames.imposeEventToNewFrameBtn();
    const firstFrame = document.querySelectorAll('.frame-box__frame')
    firstFrame[0].classList.add('selected-frame')
    Layers.renderLayers(firstFrame[0])
    $(".frame-box__list").sortable();

  }
}
