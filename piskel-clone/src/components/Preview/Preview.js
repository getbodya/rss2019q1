
export default class Preview {
  constructor() {

  }
  static renderGif() {
    let counter = 0
    let currentFrame = 0
    const step = () => {
      const allFrames = document.querySelectorAll('.frame-box__frame')
      const frameCount = allFrames.length
      const framePerSec = document.querySelector('.preview__input').value
      const delay = 1000 / framePerSec;
      counter++;
      console.log(counter)
      currentFrame = counter % frameCount;
      const frameData = allFrames[currentFrame].getContext('2d').getImageData(0, 0, 32, 32);
      const previewCtx = document.querySelector('.preview__canvas').getContext('2d');
      previewCtx.putImageData(frameData, 0, 0)
      setTimeout(()=>{
        requestAnimationFrame(step)
      }, delay);
    }
    step()
  }
  static frameCollector() {
    const allFrames = document.querySelectorAll('.frame-box__frame')
    const allFramesData = [];
    allFrames.forEach(frame => {
      const frameData = frame.getContext('2d').getImageData(0, 0, 32, 32);
      allFramesData.push(frameData)
    })
    return allFramesData;
  }
  static run() {
    Preview.renderGif()
  }
}
