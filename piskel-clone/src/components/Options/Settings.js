import State from "../../State";
import Canvas from "../Canvas";

export default class Settings {
  constructor(){

  }
  static imposeBtnEvent(){
    const settingsBtn = document.querySelector('.settings__btn');
    const settingsWindow = document.querySelector('.settings__window');
    settingsWindow.style.display='none'
    settingsBtn.addEventListener('click',()=>{
      const settingsWindow = document.querySelector('.settings__window');
      if(settingsWindow.style.display==='none'){

        settingsWindow.style.display = 'flex';
      }else{
        settingsWindow.style.display = 'none';
      }
      console.log(settingsWindow)
    })}
  static imposeEventToSaveBtn(){
    const saveBtn = document.querySelector('.settings__save-btn');
    saveBtn.addEventListener('click',()=>{
      Settings.saveSettings();

    })
  }
  static saveSettings(){
    const canvasSizeInputs = document.querySelectorAll('.settings__canvas-size-input');
    canvasSizeInputs.forEach(item =>{
      if(item.checked){
        const newSize = item.value;
        const state = State.getState();
        state.canvasSize = newSize;
        console.log(state)
        State.setState(state)
        Canvas.changeSize(newSize)
        document.querySelector('.settings__window').style.display = 'none';
      }
    })
  }
  static run() {
    const state = State.getState();
    const {canvasSize} = state;
    document.querySelectorAll('.settings__canvas-size-input').forEach(input=>{
      console.log(input.value,canvasSize)
      if(input.value === canvasSize){
        input.checked = true;
      }
    });
    Settings.imposeBtnEvent();
    Settings.imposeEventToSaveBtn();
  }
}
