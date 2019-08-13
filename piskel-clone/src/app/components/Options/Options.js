import ViewInstance from "../instances/ViewInstance";
import State from "../State/State";
import FramePanel from "../FramePanel";
import Hotkeys from "./HotKeys";
import SaveAndExport from "./SaveAndExport/SaveAndExport";
import Setting from "./Setting/Setting";

export default class Options extends ViewInstance {
  static imposeClickEvent() {
    const optionsPanel = document.querySelector('.control-panel__options');
    window.isOpenHotKeyWindow = false;
    window.isOpenSettingWindow = false;
    window.isOpenExportWindow = false;
    optionsPanel.addEventListener('click', e => {
      const { target: { classList } } = e
      if (classList.contains('options-btns__hotkey-btn')) {
        if (!isOpenHotKeyWindow) {
          Options.closeAllWindow();
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
          Options.closeAllWindow();
          isOpenSettingWindow = true;
          const settingWindow = new Setting();
          settingWindow.renderWindow()
        } else {
          isOpenSettingWindow = false;
          Setting.closeWindow()
        }
      }
      if (classList.contains('options-btns__export-btn')) {
        if (!isOpenExportWindow) {
          Options.closeAllWindow();
          isOpenExportWindow = true;
          var SaveAndExportWindow = new SaveAndExport();
          SaveAndExportWindow.renderWindow();
        } else {
          isOpenExportWindow = false;
          SaveAndExport.closeWindow()
        }
      }
    })
  }
  static closeAllWindow(){
    if(isOpenHotKeyWindow){
      Hotkeys.closeWindow();
      isOpenHotKeyWindow = false
    }
    if(isOpenSettingWindow){
      Setting.closeWindow();
      isOpenSettingWindow = false;
    }
    if(isOpenExportWindow){
      SaveAndExport.closeWindow();
      isOpenExportWindow = false;
    }

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
        Setting.resizeAllCanvas(canvasSize)
        State.setFramesOrder(framesOrder);
        State.setFrames(frames);
        FramePanel.deleteAllframes();
        project.data = frames
        FramePanel.renderLoadFrame(frames);
      };
      reader.readAsText(input.files[0], 'utf-8')
    })
  }
  static run() {
    Options.imposeClickEvent()
    Options.imposeEventToOpenFile()
  }
}
