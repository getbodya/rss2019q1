import { getState, setState } from '../services/state';

export default class Frames {
	static imposeEventsToCanvas(){
		const figureWidth = 144;
		const canvas = document.querySelector('.canvas-container__canvas');
		canvas.addEventListener('mouseup',()=>{
			const {figures} = getState();
			const selectFrame = document.querySelector('.selected-frame');
			const ctx = selectFrame.getContext('2d')
			figures.forEach(figure=>{
				const {color,circle,top,left} = figure;
				if(!circle){
					ctx.fillStyle = color;
					ctx.fillRect(left, top, figureWidth, figureWidth);
				}
				console.log(circle)
			})
		})
	}
	static imposeEventsToFrames(){
		const frameContainer = document.querySelector('.main__frame-container');
		frameContainer.addEventListener('click', e => {
			if(e.target.classList.contains('copy')){
				const currentFrame = e.target.parentElement.parentElement;
				Frames.copyFrame(currentFrame)
			}
			if(e.target.classList.contains('delete')){
				const currentFrame = e.target.parentElement.parentElement;
				Frames.deleteFrame(currentFrame)
			}
			if(e.target.classList.contains('add-frame')
			|| e.target.classList.contains('frame-container__add-frame-btn')){
				Frames.addFrame();
			}
			if(e.target.classList.contains('frame__canvas')){
				const currentFrame = e.target;
				Frames.selectFrame(currentFrame)
			}
		})
	}
	static unselectFrames(){
		const frameList = document.querySelectorAll('.frame__canvas');
		frameList.forEach(frame=>{
			if(frame.classList.contains('selected-frame')){
				frame.classList.remove('selected-frame')
			}
		})
		console.log(frameList)
	}
	static selectFrame(frame){
		if(!frame.classList.contains('selected-frame')){
			Frames.unselectFrames()
			frame.classList.add('selected-frame')
		}
	}
	static makeFrame(){
		const newFrame = document.createElement('div');
		newFrame.classList.add('frame');
		newFrame.classList.add('frames__frame');
		const canvas = document.createElement('canvas');
		canvas.classList.add('frame__canvas');
		canvas.width = '450px';
		canvas.height = '450px';
		const copyBtn = document.createElement('div');
		copyBtn.classList.add('frame__copy-btn');
		copyBtn.innerHTML = '<i class="fas fa-copy copy"></i>';
		const deleteBtn = document.createElement('div');
		deleteBtn.classList.add('frame__delete-btn');
		deleteBtn.innerHTML = '<i class="fas fa-trash delete">';
		newFrame.appendChild(canvas);
		newFrame.appendChild(copyBtn);
		newFrame.appendChild(deleteBtn);
		return newFrame
	}
	static addFrame(){
		const newFrame = Frames.makeFrame();
		const frameList = document.querySelector('.frame-container__frames');
		frameList.appendChild(newFrame)
	}
	static deleteFrame(frame){
		const frameList = document.querySelector('.frame-container__frames');	
		if(frameList.children.length>1){
			frameList.removeChild(frame)
		}	
	}
	static copyFrame(frame){
		// console.log(frame)
		const newFrame = frame.cloneNode(true);
		newFrame.classList.remove('selected-frame')
		const frameList = document.querySelector('.frame-container__frames');		
    frameList.insertBefore(newFrame, frame.nextSibling);
	}
	static run(){
		Frames.imposeEventsToFrames();
		Frames.imposeEventsToCanvas()
	}
}