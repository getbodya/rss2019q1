export default class State{
  constructor(){
    this.state = {
      canvasSize : 32,
      selectTool : '',
      primaryColor: '#000000',
      secondaryColor: '#ffffff',
      toolSize: 1,
      frames:{
        selectFrame:0,
        framesList: [
          {
            id: 0,
            order: 0,
            imageData: [],
            selectLayer:0,
            layers:[
              {
                id:0,
                order:0,
                imageData: [],
              }
            ]
          }
        ],
      },
      screenState: false,
    }
  }
  static setState(state) {
    localStorage.setItem('state', JSON.stringify(state));
  }

  static getState() {
    return JSON.parse(localStorage.getItem('state'));
  }
  static run(){
    const defaultState = {
      canvasSize : 32,
      selectTool : '',
      primaryColor: '#000000',
      secondaryColor: '#ffffff',
      toolSize: 1,
      frames:{
        selectFrame:0,
        framesList: [
          {
            id: 0,
            order: 0,
            imageData: [],
            selectLayer:0,
            layers:[
              {
                id:0,
                order:0,
                imageData: [],
              }
            ]
          }
        ],
      },
      screenState: false,
    }
    console.log('asd')
    if (localStorage.getItem('state') == null) {
      State.setState(defaultState)
    }
  }
}
