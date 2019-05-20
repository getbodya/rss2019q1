const Events = {
    imposeTools() {
        this.pen();
        this.paintBucket();
    },
    pen() {
        const penBtn = document.getElementsByClassName('tools-panel__pen')[0];
        penBtn.addEventListener('click',()=>{
            console.log('pen')
        })
    },
    paintBucket(){
        const paintBucketBtn = document.getElementsByClassName('tools-panel__paint-bucket')[0];
        paintBucketBtn.addEventListener('click',()=>{
            console.log('paintBucket')
        })
    },
};

export default Events;