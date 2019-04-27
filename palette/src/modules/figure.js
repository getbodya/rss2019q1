import state from './state'
const figures = document.getElementsByClassName('canvas__figure');
console.log(figures.length)
for(let i = 0; i<figures.length; i++){
  figures[i].addEventListener('click',()=>{
    console.log(figures[i])
    switch (state['selectTool']) {
      case 'bucket':
        figures[i].style.backgroundColor = state['currentColor'];
        break;
    
      default:
        break;
    }
  })
}
export default figures;