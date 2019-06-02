export default class Preview {
  static runInput() {
    const input = document.querySelector('.preview__input');
    const label = document.querySelector('.preview__input-label');
    input.addEventListener('input', () => {
      label.innerHTML = `${input.value} fps`;
    }, false);
  }

  static animation() {
    const canvasSize = 450;
    let counter = 0;
    let currentFrame = 0;
    const step = () => {
      const allFrames = document.querySelectorAll('.frame__canvas');
      const frameCount = allFrames.length;
      const framePerSec = document.querySelector('.preview__input').value;
      const delay = 1000 / framePerSec;
      counter += 1;
      currentFrame = counter % frameCount;
      const frameData = allFrames[currentFrame].getContext('2d').getImageData(0, 0, canvasSize, canvasSize);
      const previewCtx = document.querySelector('.preview__canvas').getContext('2d');
      previewCtx.putImageData(frameData, 0, 0);
      setTimeout(() => {
        requestAnimationFrame(step());
      }, delay);
    };
    step();
  }

  static fullScreenMode() {
    const btn = document.querySelector('.preview__fullscreen');
    btn.addEventListener('click', () => {
      const preview = document.querySelector('.main__preview');
      if (!document.fullscreen) {
        preview.requestFullscreen();
        btn.innerHTML = '<i class="fas fa-compress-arrows-alt"></i>';
      } else {
        document.exitFullscreen();
        btn.innerHTML = '<i class="fas fa-expand-arrows-alt"></i>';
      }
    });
  }

  static run() {
    Preview.fullScreenMode();
    Preview.animation();
    Preview.runInput();
  }
}
