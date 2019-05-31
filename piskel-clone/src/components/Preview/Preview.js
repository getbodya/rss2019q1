import State from "../../State";
var Gif = require('gif.js.optimized');
import GIF from 'gif.js.optimized';
export default class Preview {
  constructor() {

  }
  static renderGif() {
    const{canvasSize} = State.getState();
    let start= 0;
    let counter = 0
    let currentFrame = 0
    const step = () => {
      const now = performance.now();
      const allFrames = document.querySelectorAll('.frame-box__frame')
      const frameCount = allFrames.length
      const framePerSec = document.querySelector('.preview__input').value
      const delay = 1000 / framePerSec;
      counter++;
      currentFrame = counter % frameCount;
      const frameData = allFrames[currentFrame].getContext('2d').getImageData(0, 0, canvasSize, canvasSize);
      const previewCtx = document.querySelector('.preview__canvas').getContext('2d');
      // if(now>=start+delay){
      //   requestAnimationFrame(step)
      //   start+=delay
      // }else{
      //   step()
      // }
      previewCtx.putImageData(frameData, 0, 0)
      setTimeout(()=>{
        requestAnimationFrame(step)
      }, delay);
    }
    step()
  }
  static resizePreview(newSize){
  const canvas = document.querySelector('.preview__canvas');
  canvas.width = newSize;
  canvas.height = newSize;
}
  static frameCollector() {
    const{canvasSize} = State.getState();
    const allFrames = document.querySelectorAll('.frame-box__frame')
    const allFramesData = [];
    allFrames.forEach(frame => {
      const frameData = frame.getContext('2d').getImageData(0, 0, canvasSize, canvasSize);
      allFramesData.push(frameData)
    })
    return allFramesData;
  }
  static fullScreenMode(){
    const btn = document.querySelector('.preview__fullscreen');
    btn.addEventListener('click',()=>{
      const preview = document.querySelector('.control-panel-box__preview')
      if(!document.fullscreen){

        preview.requestFullscreen();
        btn.innerHTML = '<i class="fas fa-compress-arrows-alt"></i>';
      }else{
        document.exitFullscreen();
        btn.innerHTML = '<i class="fas fa-expand-arrows-alt"></i>';
      }
    })
  }
  static saveGif(){
    const gif = new GIF({
      repeat: 0,
      workers: 2,
      quality: 10000000,
      background: 'fff',
      quality: 0,
      dither: 'Atkinson',
      transparent: 'fff'
    });
    const fps = document.querySelector('.preview__input').value
    // console.log('fps', 1000/fps)
    const frames = document.querySelectorAll('.frame-box__frame')
    frames.forEach(frame =>{
      gif.addFrame(frame, {delay: 1000/fps,copy:true});
    })
    gif.on('finished', function(blob) {
      // window.open(URL.createObjectURL(blob));
      const url = URL.createObjectURL(blob)//.slice(5)
      console.log(url)
      const saveBtn = document.querySelector('.export-window__save-btn');
      saveBtn.download = Math.round(performance.now());
      saveBtn.href = URL.createObjectURL(blob)
    });
    gif.render();
  }
  static export(){
    const exportBtn = document.querySelector('.preview__export-btn');
    exportBtn.addEventListener('click',()=>{
      const exportWindow = document.querySelector('.prewiew__export-window')
      if(exportWindow.classList.contains('hidden__export-window')){
        exportWindow.classList.remove('hidden__export-window')
      }else{
        exportWindow.classList.add('hidden__export-window')
      }
      Preview.saveGif()
    })
  }
  static run() {
    Preview.fullScreenMode();
    Preview.renderGif();
    // Preview.saveGif();
    Preview.export();
    const preview  = document.querySelector('.preview__canvas');
    const {canvasSize} = State.getState()
    preview.width = canvasSize
    preview.height = canvasSize
  }
}
