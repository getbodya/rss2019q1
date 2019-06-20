import ViewInstance from "../instances/ViewInstance";
import structures from "../structures";
import GIF from 'gif.js.optimized';
import APNG from 'apng-js';
import State from "../State/State";
import FramePanel from "../FramePanel";
import Hotkeys from "../HotKeys";


export default class Options extends ViewInstance {
  constructor(structure) {
    super();
    this.structure = structure;
  }
  static imposeClickEvent() {
    const optionsPanel = document.querySelector('.control-panel__options');
    const {
      hotKeyWindowStructure,
      settingWindowStructure,
      exportWindowStructure,
      hotKeyWindowElement,
    } = structures;
    window.isOpenHotKeyWindow = false;
    window.isOpenSettingWindow = false;
    window.isOpenExportWindow = false;

    optionsPanel.addEventListener('click', e => {
      const { target: { classList } } = e
      if (classList.contains('options-btns__hotkey-btn')) {
        if (!isOpenHotKeyWindow) {
          isOpenHotKeyWindow = true;
          Hotkeys.renderHotKeysWindow();
          document.body.removeEventListener('keydown', Hotkeys.hotKeysEvent)
        } else {
          const hotKeyWindow = document.querySelector('.options__hotkey-window')
          isOpenHotKeyWindow = false;
          document.body.removeChild(hotKeyWindow)
          document.body.addEventListener('keydown', Hotkeys.hotKeysEvent)
        }
      }
      if (classList.contains('options-btns__setting-btn')) {
        if (!isOpenSettingWindow) {
          isOpenSettingWindow = true;
          const settingWindow = Options.render(settingWindowStructure)
          document.body.appendChild(settingWindow)
          Options.imposeClickEventSettingWindow(settingWindow)
        } else {
          const settingWindow = document.querySelector('.options__setting-window')
          isOpenSettingWindow = false;
          document.body.removeChild(settingWindow)
        }
      }
      if (classList.contains('options-btns__export-btn')) {
        if (!isOpenExportWindow) {
          isOpenExportWindow = true;
          const exportWindow = Options.render(exportWindowStructure)
          document.body.appendChild(exportWindow)
          Options.saveGif();
          Options.saveOwnFormat()
          // Options.saveApng()
        } else {
          const exportWindow = document.querySelector('.options__export-window')
          isOpenExportWindow = false;
          document.body.removeChild(exportWindow)
        }
      }

    })
  }
  static closeAllWindow(){
  }
  static imposeDataToHotKeyWindow() {
    const { hotKeys } = state;
    for (let name in hotKeys) {
      const { key, keyCode } = hotKeys[name]
      const element = document.querySelector(`li[name=${name}`)
      const elementInput = element.children[2]
      elementInput.value = key;
      elementInput.dataset.keyCode = keyCode;
    }
  }
  static imposeClickEventHotKeyWindow(hotKeyWindow) {
    hotKeyWindow.addEventListener('click', e => {
      const element = e.target
      if (element.classList.contains('hotkey-window__close-btn')) {
        isOpenHotKeyWindow = false;
        const hotKeyWindow = document.querySelector('.options__hotkey-window')
        document.body.removeChild(hotKeyWindow)
      }
      if (element.classList.contains('hotkey-window__save-btn')) {
        const hotKeysli = document.querySelectorAll('.hotkey-list__hotkey-item');
        hotKeysli.forEach(li => {

        })
      }
    })
  }
  static imposeClickEventSettingWindow(settingWindow) {
    settingWindow.addEventListener('click', e => {
      const { target: { classList } } = e
      if (classList.contains('layer-btns__save-setting')) {
        const allSizeRadio = document.querySelectorAll('.setting-window__size-input');
        allSizeRadio.forEach(radio => {
          if (radio.checked) {
            state.canvasSize = radio.value;
            Options.resizeAllCanvas(radio.value);
          }
        })
        document.body.removeChild(settingWindow);
        isOpenSettingWindow = false;
      }
    })
    const customInput = document.querySelector('.setting-window__custom-size');
    customInput.addEventListener('input', e => {
      validate(e);
      let {
        target:{
          parentNode:{
            childNodes
          },
          value
        },

        data
      } = e;
      childNodes[0].value = value
      // console.log(input)
      function validate(e){
        const maxValue = 200;
        const minValue = 1;
        let {
          target,
          data: rune
        } = e;
        if (Number.isInteger(+rune)) {
          if (target.value > maxValue){
            target.value = maxValue
          }else if(target.value<1){
            target.value = minValue;
          }
        }else {
          e.preventDefault()
          target.value = target.value.slice(0, -1)
        }
      }
    })
  }
  static resizeAllCanvas(newSize) {
    const allCanvas = document.querySelectorAll('canvas');
    allCanvas.forEach(canvas => {
      const ctx = canvas.getContext('2d');
      const { width } = canvas;
      const tempImgData = ctx.getImageData(0, 0, width, width);
      canvas.width = newSize;
      canvas.height = newSize;
      ctx.putImageData(tempImgData, 0, 0)
    })
  }
  static saveGif() {
    const gif = new GIF({
      repeat: 0,
      workers: 2,
      quality: 1,
      background: '#fff',
      quality: 0,
      transparent: '#fff'
    });
    const fps = document.querySelector('.preview-box__fps-input').value
    const frames = document.querySelectorAll('.frame-box__canvas')
    frames.forEach(frame => {
      gif.addFrame(frame, { delay: 1000 / fps, copy: true });
    })
    gif.on('finished', function (blob) {
      const saveBtn = document.querySelector('.export-window__item-link');
      saveBtn.download = Math.round(performance.now());
      saveBtn.href = URL.createObjectURL(blob)
      const gifStatus = document.querySelector('.gif-status');
      gifStatus.classList.add('accept');
    });
    gif.render();
  }
  static saveApng() {
    const allFrames = document.querySelectorAll('.frame-box__canvas')
    const apng = new APNG({
      width: 32,
      height: 32,
      numPlays: 0,
      frames: allFrames
    })
  }
  static saveOwnFormat() {
    const frames = State.getFrames();
    const framesOrder = State.getFramesOrder();
    const {canvasSize} = state;
    const toFile = {
      frames,
      framesOrder,
      canvasSize
    };
    const data = JSON.stringify(toFile)
    const link = document.querySelector('.own-format-link');
    link.href = `data:text;charset=utf-8,${encodeURIComponent(data)}`;
    link.download = 'project.bdn'
  }
  static imposeEventToOpenFile() {
    const openBtn = document.querySelector('.options-btns__open-file-btn');
    openBtn.addEventListener('input', e => {
      const input = e.target;
      const reader = new FileReader();
      reader.onload = function () {
        const data = reader.result;
        const objData = JSON.parse(data);
        const { frames, framesOrder, canvasSize } = objData;
        state.canvasSize = canvasSize;
        Options.resizeAllCanvas(canvasSize)
        State.setFramesOrder(framesOrder);
        State.setFrames(frames);
        FramePanel.deleteAllframes();
        project.data = frames
        FramePanel.renderLoadFrame(frames);
        console.log(objData)
      };
      reader.readAsText(input.files[0], 'utf-8')

    })
  }
  static export() {
    const exportBtn = document.querySelector('.preview__export-btn');
    exportBtn.addEventListener('click', () => {
      const exportWindow = document.querySelector('.prewiew__export-window')
      if (exportWindow.classList.contains('hidden__export-window')) {
        exportWindow.classList.remove('hidden__export-window')
      } else {
        exportWindow.classList.add('hidden__export-window')
      }
    })
  }
  static run() {
    Options.imposeClickEvent()
    Options.imposeEventToOpenFile()
  }
}
