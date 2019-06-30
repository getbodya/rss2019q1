import State from "../../State/State";
import ToolsPanel from "../../ToolsPanel";
import structures from "../../structures";
import ViewInstance from "../../instances/ViewInstance";

export default class Hotkeys{
  static hotKeysEvent(e){
    const { hotKeys } = State.getState();
    hotKeys.forEach(hotKey => {
      const {keyCode,classNameSelector} = hotKey;
      if(e.keyCode == keyCode){
        const toolElement = document.querySelector(classNameSelector);
        ToolsPanel.select(toolElement)
        state.selectTool = toolElement.classList[1]
      }
    });
  }
  static changeHotkeyEvent(e){
    const {key,keyCode} = e;
    const hotkeyElement = document.querySelector('.hotkey-item--change-status');
    const hotkeyInput = hotkeyElement.children[1];
    const allInputs = document.querySelectorAll('.hotkey-item__input');
    allInputs.forEach(input=>{
      if(input.dataset.code == keyCode){
        input.dataset.code = '';
        input.value = '';
      }
    })
    hotkeyInput.value = key;
    hotkeyInput.dataset.code = keyCode;
    hotkeyElement.classList.remove('hotkey-item--change-status');
    document.body.removeEventListener('keydown',Hotkeys.changeHotkeyEvent)
    document.body.addEventListener('keydown',Hotkeys.hotKeysEvent)
  }
  static hotkeysWindowEvent(hotKeyWindow){
    hotKeyWindow.addEventListener('click', e =>{
      const {
        target:{
          classList,
          parentNode:{
            childNodes:hotkeyList
          }
        }
      } = e;
      if(classList.contains('hotkey-list__hotkey-item')){
        hotkeyList.forEach(item => {
          if(item.classList.contains('hotkey-item--change-status')){
            item.classList.remove('hotkey-item--change-status')
          }
        })
        classList.add('hotkey-item--change-status')
        document.body.removeEventListener('keydown',Hotkeys.hotKeysEvent)
        document.body.addEventListener('keydown',Hotkeys.changeHotkeyEvent)
      }
      if(classList.contains('hotkey-window__save-btn')){
        const allItems = document.querySelectorAll('.hotkey-list__hotkey-item');
        const state = State.getState();
        allItems.forEach(item =>{
          const name = item.dataset.name;
          const key = item.children[1].value;
          const keyCode = item.children[1].dataset.code;
          state.hotKeys.forEach(hotkeyData =>{
            if(hotkeyData.name == name){
              hotkeyData.key = key;
              hotkeyData.keyCode = keyCode;
            }
          })
        })
        State.setState(state)
        isOpenHotKeyWindow = false;
        Hotkeys.closeWindow()
      }
      if(classList.contains('hotkey-window__close-btn')){
        isOpenHotKeyWindow = false;
        Hotkeys.closeWindow()
      }
    })
  }
  static renderHotKeysWindow(){
    const {hotKeyWindowElement,hotKeyWindowStructure} = structures;
    const {hotKeys} = State.getState();
    const hotKeyWindow = ViewInstance.render(hotKeyWindowStructure);
    document.body.appendChild(hotKeyWindow);
    const hotKeyUl = document.querySelector('.hotkey-window__hotkey-list')
    hotKeys.forEach(hotKey => {
      const {name,key,keyCode} = hotKey;
      const hotKeyElement = ViewInstance.render(hotKeyWindowElement);
      hotKeyElement.dataset.name = name;
      hotKeyElement.children[0].innerHTML = name;
      hotKeyElement.children[1].value = key;
      hotKeyElement.children[1].dataset.code = keyCode;
      hotKeyUl.appendChild(hotKeyElement)
    })
    Hotkeys.hotkeysWindowEvent(hotKeyWindow)
  }
  static closeWindow(){
    const hotkeysWindow = document.querySelector('.options__hotkey-window');
		document.body.removeChild(hotkeysWindow)
  }
  static run(){
    const {body} = document;
    body.addEventListener('keydown', Hotkeys.hotKeysEvent);
  }
}
