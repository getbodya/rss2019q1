import state from './state'
const figures = document.getElementsByClassName('canvas__figure');
console.log(figures.length)
for(let i = 0; i<figures.length; i++){
  figures[i].addEventListener('click',()=>{
    switch (state['selectTool']) {
      case 'bucket':
        figures[i].style.backgroundColor = state['currentColor'];
        break;
      case 'transform':
        if(figures[i].classList.contains('circle')){
          figures[i].classList.remove('circle');
        }else{
          figures[i].classList.add('circle');
        }
      default:
        break;
    }
  })
}
export default figures;