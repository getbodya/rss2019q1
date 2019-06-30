import ViewInstance from "../../instances/ViewInstance";
import GIF from 'gif.js.optimized';
import State from "../../State/State";
import UPNG from 'upng-js';
var $ = require("jquery");
import giphy from 'giphy-api';

export default class SaveAndExport extends ViewInstance {
	constructor() {
		super();
		this.structure = {
			tag: 'div',
			className: 'options__export-window',
			children: [
				{
					tag: 'ul',
					className: 'export-window__sprite-info',
					children: [
						{
							tag: 'li',
							className: 'sprite-info__sprite-title',
							children: [
								{
									tag: 'span',
									className: 'sprite-info__sprite-title-label',
									content: 'Title:'
								},
								{
									tag: 'input',
									className: 'sprite-info__sprite-title-input',
									attr: {
										value: 'New piskel clone'
									}
								},
							]
						},
					]
				},
				{
					tag: 'div',
					className: 'export-window__exports',
					children: [

						{
							tag: 'h3',
							className: 'export-window__item-label',
							content: 'Save as'
						},
						{
							tag: 'ul',
							className: 'export-window__list',
							children: [
								{
									tag: 'li',
									className: 'export-window__item',
									children: [
										{
											tag: 'a',
											className: 'export-window__item-link gif-link',
											content: '.gif'
										},
										{
											tag: 'div',
											className: 'export-window__item-status gif-status',

										},
									]
								},
								{
									tag: 'li',
									className: 'export-window__item',
									children: [
										{
											tag: 'a',
											className: 'export-window__item-link piskel-link',
											content: '.piskel'
										},
										{
											tag: 'div',
											className: 'export-window__item-status piskel-status',

										},
									]
								},
								{
									tag: 'li',
									className: 'export-window__item',
									children: [
										{
											tag: 'a',
											className: 'export-window__item-link own-format-link',
											content: '.bdn'

										},
										{
											tag: 'div',
											className: 'export-window__item-status accept',

										},
									]
								},
							]
						}
					]
				}
			]
		};
	}
	static imposeEvents(element) {
		const { children } = element;
		const input = children[0].children[0].children[1];
		const links = [...children[1].children[1].children]
		input.addEventListener('input', () => {
			links.forEach(link => {
				const fileExtension = link.children[0].innerHTML;
				link.children[0].download = input.value + fileExtension;
			});
		});
	};
	static savePiskel() {
		const allFrames = document.querySelectorAll('.frame-box__canvas');
		const framesNumber = allFrames.length;
		const tempCanvas = document.createElement('canvas');
		const tempCtx = tempCanvas.getContext('2d');
		const name = document.querySelector('.sprite-info__sprite-title-input').value;
		const fps = document.querySelector('.preview-box__fps-input').value
		const { height: size } = allFrames[0]
		tempCanvas.height = size;
		tempCanvas.width = framesNumber * size;
		let piskelFramesLayout = []
		allFrames.forEach((frame, index) => {
			piskelFramesLayout.push(`[${index}]`);
			tempCtx.drawImage(frame, index * size, 0);
		})
		const frames64 = tempCanvas.toDataURL();
		const piskelData = `{"modelVersion":2,"piskel":{"name":"Piskel clone","description":"","fps":${fps},"height":${size},"width":${size},"layers":["{\\"name\\":\\"Layer 1\\",\\"opacity\\":1,\\"frameCount\\":${framesNumber},\\"chunks\\":[{\\"layout\\":[${piskelFramesLayout}],\\"base64PNG\\":\\"${frames64}\\"}]}"],"hiddenFrames":[]}}`;
		const saveBtn = document.querySelector('.piskel-link');
		saveBtn.download = `${name}.piskel`;
		saveBtn.href = `data:,${piskelData}`;
		const gifStatus = document.querySelector('.piskel-status');
		gifStatus.classList.add('accept');
	}
	static saveOwnFormat() {
		const frames = State.getFrames();
		const framesOrder = State.getFramesOrder();
		const { canvasSize } = state;
		const toFile = {
			frames,
			framesOrder,
			canvasSize
		};
		const data = JSON.stringify(toFile)
		const link = document.querySelector('.own-format-link');
		link.href = `data:text;charset=utf-8,${encodeURIComponent(data)}`;
		link.download = 'project.bdn'
	}
	static saveGif() {
		const gif = new GIF({
			repeat: 0,
			workers: 2,
			quality: 1,
			background: '#fff',
			quality: 0,
			transparent: '#fff'
		});
		const fps = document.querySelector('.preview-box__fps-input').value
		const frames = document.querySelectorAll('.frame-box__canvas')
		frames.forEach(frame => {
			gif.addFrame(frame, {
				delay: 1000 / fps,
				copy: true
			});
		})
		gif.on('finished', function (blob) {
			const saveBtn = document.querySelector('.export-window__item-link');
			saveBtn.download = Math.round(performance.now());
			saveBtn.href = URL.createObjectURL(blob);
			const gifStatus = document.querySelector('.gif-status');
			gifStatus.classList.add('accept');
		});
		gif.render();
	}
	renderWindow() {
		const saveAndExportWindow = SaveAndExport.render(this.structure);
		SaveAndExport.imposeEvents(saveAndExportWindow);
		document.body.appendChild(saveAndExportWindow);
		SaveAndExport.saveGif();
		SaveAndExport.saveOwnFormat();
		SaveAndExport.savePiskel();
	}
	static closeWindow() {
		const saveAndExportWindow = document.querySelector('.options__export-window');
		document.body.removeChild(saveAndExportWindow)
	}
};
