export default class State{
  constructor(){
    this.state = {
      canvasSize : 32,
      selectTool : '',
      primaryColor: '#000000',
      secondaryColor: '#ffffff',
      toolSize: 1,
      frames:[],
      hotKeys: {
        pen: {
          name: 'Pen',
          key: 'p',
          keyCode: 80,
          classNameSelector: '.pen'
        },
        verticalMirrorPen: {
          name: 'Vertical mirror pen',
          key: 'v',
          keyCode: 86,
          classNameSelector: '.mirror-pen'
        },
        paintBucket: {
          name: 'Paint bucket',
          key: 'u',
          keyCode: 85,
          classNameSelector: '.paint-bucket'
        },
        eraser: {
          name: 'Eraser',
          key: 'e',
          keyCode: 69,
          classNameSelector: '.eraser'
        },
        stroke: {
          name: 'Stroke',
          key: 's',
          keyCode: 83,
          classNameSelector: '.stroke'
        },
        reactangle: {
          name: 'Reactangle',
          key: 'r',
          keyCode: 82,
          classNameSelector: '.reactangle'
        },
        circle: {
          name: 'Circle',
          key: 'c',
          keyCode: 67,
          classNameSelector: '.circle'
        },
        lighten: {
          name: 'Lighten',
          key: 'l',
          keyCode: 76,
          classNameSelector: '.bright'
        },
        settings: {
          name: 'Settings',
          key: 'o',
          keyCode: 79,
          classNameSelector: '.settings__btn'
        },
      },
      screenState: false,
    }
  }
  static setState(state) {
    localStorage.setItem('state', JSON.stringify(state));
  }
  static collectData(){
  }
  static getState() {
    return JSON.parse(localStorage.getItem('state'));
  }
  run(){
    if (localStorage.getItem('state') == null) {
      State.setState(this.state)
    }
  }
}
