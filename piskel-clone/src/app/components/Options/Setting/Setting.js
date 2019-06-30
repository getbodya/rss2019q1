import ViewInstance from "../../instances/ViewInstance";

export default class Setting extends ViewInstance {
	constructor() {
		super();
		this.structure = {
			tag: 'div',
			className: 'options__setting-window',
			children: [

				{
					tag: 'div',
					className: 'setting-window__size-panel',
					children: [
						{
							tag: 'h3',
							className: 'setting-window__size-label',
							content: 'resize:'
						},
						{
							tag: 'ul',
							className: 'setting-window__size-list',
							children: [

								{
									tag: 'li',
									className: 'setting-window__size-item',
									children: [
										{
											tag: 'input',
											className: 'setting-window__size-input',
											attr: {
												type: 'radio',
												name: 'size',
												value: 32
											},
										},
										{
											tag: 'span',
											className: 'setting-window__size-name',
											content: '32x32'
										},

									]
								},
								{
									tag: 'li',
									className: 'setting-window__size-item',
									children: [
										{
											tag: 'input',
											className: 'setting-window__size-input',
											attr: {
												type: 'radio',
												name: 'size',
												value: 64
											},
										},
										{
											tag: 'span',
											className: 'setting-window__size-name',
											content: '64x64'
										},

									]
								},
								{
									tag: 'li',
									className: 'setting-window__size-item',
									children: [
										{
											tag: 'input',
											className: 'setting-window__size-input',
											attr: {
												type: 'radio',
												name: 'size',
												value: 128
											},
										},
										{
											tag: 'span',
											className: 'setting-window__size-name',
											content: '128x128'
										},
									]
								},
							]
						},
					]
				},
				{
					tag: 'button',
					className: 'layer-btns__save-setting',
					content: 'save',
				},
			]
		}
	}
	static imposeEventSettingWindow(settingWindow) {
    settingWindow.addEventListener('click', e => {
      const { target: { classList } } = e
      if (classList.contains('layer-btns__save-setting')) {
        const allSizeRadio = document.querySelectorAll('.setting-window__size-input');
        allSizeRadio.forEach(radio => {
          if (radio.checked) {
            state.canvasSize = radio.value;
            Setting.resizeAllCanvas(radio.value);
          }
				})
				Setting.closeWindow();
      }
    })
	}
  static resizeAllCanvas(newSize) {
    const allCanvas = document.querySelectorAll('canvas');
    allCanvas.forEach(canvas => {
      const ctx = canvas.getContext('2d');
      const { width } = canvas;
      const tempImgData = ctx.getImageData(0, 0, width, width);
      canvas.width = newSize;
      canvas.height = newSize;
      ctx.putImageData(tempImgData, 0, 0)
    })
  }
	renderWindow(){
		const settingWindow = Setting.render(this.structure);
		Setting.imposeEventSettingWindow(settingWindow);
		document.body.appendChild(settingWindow)
	}
	static closeWindow() {
		const settingWindow = document.querySelector('.options__setting-window');
		document.body.removeChild(settingWindow)
	}
}