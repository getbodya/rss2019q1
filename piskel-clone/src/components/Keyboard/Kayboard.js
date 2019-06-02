import State from "../../State";

export default class Keyboard {
  constructor() {}

  static makeHotKeysWindow(){
    const {hotKeys} = State.getState()
    const hotKeyWindow = document.createElement('div');
    hotKeyWindow.classList.add('hotkey-settings');
    const hotKeyList = document.createElement('ul');
    hotKeyList.classList.add('hotkey-settings__hotkey-list')
    for(let i in hotKeys){
      const { name, key, keyCode } = hotKeys[i];
      const listItem = document.createElement('li');
      listItem.classList.add('hotkey-settings__hotkey-item')
      const itemLabel = document.createElement('span');
      itemLabel.classList.add('hotkey-item__label');
      itemLabel.innerHTML = name;
      const itemInput = document.createElement('input');
      itemInput.classList.add('hotkey-item__input');
      itemInput.setAttribute('disabled',true)
      itemInput.value = key
      itemInput.dataset.keycode = keyCode;
      const changeLabel = document.createElement('span');
      changeLabel.classList.add('hotkey-settings__change-label');
      changeLabel.innerHTML = 'PRESS TO CHANGE'
      Keyboard.imposeEventToInput(itemInput);
      listItem.appendChild(itemLabel)
      listItem.appendChild(changeLabel)
      listItem.appendChild(itemInput)
      hotKeyList.appendChild(listItem)
    }
    const saveBtn = document.createElement('button');
    saveBtn.classList.add('hotkey-settings__sava-btn');
    saveBtn.innerHTML = 'Save';
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('hotkey-settings__close-btn');
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    hotKeyWindow.appendChild(closeBtn)
    hotKeyWindow.appendChild(hotKeyList)
    hotKeyWindow.appendChild(saveBtn)
    Keyboard.imposeEventsToWindow(hotKeyWindow)
    return hotKeyWindow
  }

  static eventToWindow(e) {
    const {hotKeys} = State.getState()
    for(let key in hotKeys){
      if(+hotKeys[key].keyCode === e.keyCode){
        document.querySelector(hotKeys[key].classNameSelector).click()
      }
    }
  }
  static imposeEventsToWindow(hotkeyWindow){
    hotkeyWindow.addEventListener('click', e => {
      const element = e.target;
      if(element.classList.contains('hotkey-settings__close-btn')
      || element.classList.contains('fa-times')){
        const keyboardWindow = document.querySelector('.hotkey-settings')
        document.body.removeChild(keyboardWindow)
        document.body.addEventListener('keydown',Keyboard.eventToWindow)
      }
      if(element.classList.contains('hotkey-settings__sava-btn')){
        const state = State.getState();
        const {hotKeys} = state;
        const allItems = document.querySelectorAll('.hotkey-settings__hotkey-item')
        allItems.forEach(item =>{
          for(let i in hotKeys){
            if(hotKeys[i].name===item.children[0].innerHTML){
              hotKeys[i].key = item.children[2].value;
              hotKeys[i].keyCode = item.children[2].dataset.keycode;
            }
          }
        })
        state.hotKeys = hotKeys;
        State.setState(state);
        element.style.backgroundColor = 'green';
      }
      if(element.classList.contains('hotkey-settings__change-label')){
        element.innerHTML = 'PRESS NEW HOTKEY';
        const listenerNewKey = (e) =>{
          element.innerHTML = 'SUBMIT';
          const allInputs = document.querySelectorAll('.hotkey-item__input');
          allInputs.forEach(input => {
            if(input.dataset.keycode == e.keyCode){
              input.dataset.keycode = '';
              input.value = '';
            }
          })
          element.nextSibling.value = e.key;
          element.nextSibling.dataset.keycode = e.keyCode;

          document.body.removeEventListener('keydown',listenerNewKey)
        }
        document.body.addEventListener('keydown',listenerNewKey)

      }
    })
  }
  static imposeEventToInput(input){
    input.addEventListener('input',e=>{
      console.log(e)
    })
  }
  static imposeEventToSettingsBtn(){
    const btn = document.querySelector('.options__hotkeys');
    btn.addEventListener('click', ()=>{
      if(!document.querySelector('.hotkey-settings')){
        const keyboardWindow = Keyboard.makeHotKeysWindow();
        document.body.appendChild(keyboardWindow)
        document.body.removeEventListener('keydown',Keyboard.eventToWindow)

      }else{
        const keyboardWindow = document.querySelector('.hotkey-settings')
        document.body.removeChild(keyboardWindow)
        document.body.addEventListener('keydown',Keyboard.eventToWindow)

      }
    })
  }
  run() {
    document.body.addEventListener('keydown',Keyboard.eventToWindow)
    // Keyboard.runEvents();
    Keyboard.imposeEventToSettingsBtn();
  }
}
