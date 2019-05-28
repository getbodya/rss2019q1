function fullScreenMode(){
  const btn = document.querySelector('.header__fullscreen');
  btn.addEventListener('click',()=>{
    if(!document.fullscreen){
      document.body.requestFullscreen();
      btn.innerHTML = '<i class="fas fa-compress-arrows-alt"></i>';
    }else{
      document.exitFullscreen();
      btn.innerHTML = '<i class="fas fa-expand-arrows-alt"></i>';
    }
  })
}
export default fullScreenMode;
