function unselectTools(){
  const tools = document.querySelector('.toolbar__tools');
  for(let i = 0; i<tools.children.length; i++){
    if(tools.children[i].classList.contains('selected-tool')){
      tools.children[i].classList.remove('selected-tool')
    }
  }
}

export default unselectTools;