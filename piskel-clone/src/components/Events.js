const Events = {
	imposeTools() {
		this.pen();
		this.paintBucket();
	},
	pen() {
		const penBtn = document.querySelector('.pen');
		penBtn.addEventListener('click', () => {
      state.selectTool = 'pen';
      console.log(penBtn.classList[1])
		})
	},
	paintBucket() {
		const paintBucketBtn = document.querySelector('.paint-bucket');
		paintBucketBtn.addEventListener('click', () => {
			state.selectTool = 'paintBucket';
		})
	},
};

export default Events;
