
export default class State {
  constructor() {
    this.state = {
      canvasSize: 32,
      selectTool: 'pen',
      ctrlTool: false,
      primaryColor: '#00ff00',
      secondaryColor: '#00ffff',
      toolSize: 1,
      hotKeys: [
        {
          name: 'Pen',
          key: 'p',
          keyCode: 80,
          classNameSelector: '.pen'
        },
        {
          name: 'Mirror pen',
          key: 'v',
          keyCode: 86,
          classNameSelector: '.tool__mirror-pen'
        },
        {
          name: 'Paint bucket',
          key: 'u',
          keyCode: 85,
          classNameSelector: '.paintBucket'
        },
        {
          name: 'Eraser',
          key: 'e',
          keyCode: 69,
          classNameSelector: '.eraser'
        },
        {
          name: 'Stroke',
          key: 's',
          keyCode: 83,
          classNameSelector: '.stroke'
        },
        {
          name: 'Reactangle',
          key: 'r',
          keyCode: 82,
          classNameSelector: '.reactangle'
        },
        {
          name: 'Circle',
          key: 'c',
          keyCode: 67,
          classNameSelector: '.circle'
        },
        {
          name: 'Lighten',
          key: 'l',
          keyCode: 76,
          classNameSelector: '.lighten'
        },
        {
          name: 'Dithering',
          key: 'o',
          keyCode: 79,
          classNameSelector: '.dithering'
        },
        {
          name: 'Move',
          key: 'n',
          keyCode: 79,
          classNameSelector: '.move'
        },
        {
          name: 'Color picker',
          key: 'h',
          keyCode: 72,
          classNameSelector: '.colorPicker'
        },
      ],
    };
  }
  static setState(state) {
    localStorage.setItem('state', JSON.stringify(state));
  }
  static collectData() {
  }
  static getState() {
    return JSON.parse(localStorage.getItem('state'));
  }
  static setFrames(frames) {
    localStorage.setItem('frames', JSON.stringify(frames));
  }

  static getFramesOrder() {
    return JSON.parse(localStorage.getItem('frames_order'));
  }
  static setFramesOrder(framesOrder){
    if(!framesOrder){
      const allFrames = document.querySelectorAll('.frame-box__canvas');
      const idAllFrames = [];
      allFrames.forEach(frame=>{
        idAllFrames.push(frame.id)
      })
      if (allFrames.length==0){
        idAllFrames.push(123123)
      }
      localStorage.setItem('frames_order', JSON.stringify(idAllFrames));
    }else{
      localStorage.setItem('frames_order', JSON.stringify(framesOrder));
    }
  }
  static getFrames() {
    return JSON.parse(localStorage.getItem('frames'));
  }
  run() {
    if (localStorage.getItem('state') == null) {
      State.setState(this.state)
    }
    window.state = State.getState()
  }
}
