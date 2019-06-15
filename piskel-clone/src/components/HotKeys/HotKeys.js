import State from "../State/State";
import ToolsPanel from "../ToolsPanel";
import structures from "../structures";
import ViewInstance from "../instances/ViewInstance";

export default class Hotkeys{
  static hotKeysEvent(e){
    console.log(e)
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
  static changeHotkeyEvent(){
    document.body.addEventListener('keydown', e )
    const changeLabel = document.querySelector('.hotkey-item__change-label')
    changeLabel.innerHTML = 'submit new key';

    document.body.removeEventListener('keydown',Hotkeys.changeHotkeyEvent)
    document.body.addEventListener('keydown',Hotkeys.hotKeysEvent)
  }
  static hotkeysWindowEvent(hotKeyWindow){
    hotKeyWindow.addEventListener('click', e =>{
      const {target:{classList}} = e;
      if(classList.contains('hotkey-item__change-label')){
        const {target:changeLabel} = e;
        changeLabel.innerHTML = 'click on the new key';
        document.body.removeEventListener('keydown',Hotkeys.hotKeysEvent)
        document.body.addEventListener('keydown',Hotkeys.changeHotkeyEvent)
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
      const {name,key,keyCode,classNameSelector} = hotKey;

      const hotKeyElement = ViewInstance.render(hotKeyWindowElement);
      hotKeyElement.setAttribute('name',name);
      hotKeyElement.children[0].innerHTML = name;
      hotKeyElement.children[2].value = key;
      hotKeyUl.appendChild(hotKeyElement)
      console.log(hotKeyElement)
    })
    Hotkeys.hotkeysWindowEvent(hotKeyWindow)
  }
  static run(){
    const {body} = document;
    body.addEventListener('keydown', Hotkeys.hotKeysEvent);
  }
}
