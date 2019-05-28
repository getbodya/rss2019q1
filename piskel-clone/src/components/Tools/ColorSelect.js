import State from "../../State";

export default class ColorSelect {

  static imposeEventToPrimaryColor(){
    const primaryInput = document.querySelector('.primary-color');
    console.log(primaryInput)
    primaryInput.addEventListener("input",(e)=>{
      console.log(primaryInput.value)
      const state = State.getState();
      state.primaryColor = primaryInput.value;
      State.setState(state);
    })
  }
  static imposeEventToSecondaryColor(){
    const secondaryInput = document.querySelector('.secondary-color');
    console.log(secondaryInput)
    secondaryInput.addEventListener("input",(e)=>{
      console.log(secondaryInput.value)
      const state = State.getState();
      state.secondaryColor = secondaryInput.value;
      State.setState(state);
    })
  }
  static run(){

    const state = State.getState();
    const {secondaryColor, primaryColor} = state;
    const primaryInput = document.querySelector('.primary-color');
    primaryInput.value = primaryColor;
    const secondaryInput = document.querySelector('.secondary-color');
    secondaryInput.value = secondaryColor;
    ColorSelect.imposeEventToPrimaryColor()
    ColorSelect.imposeEventToSecondaryColor()
  }
}
