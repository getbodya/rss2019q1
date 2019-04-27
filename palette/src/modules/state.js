let defaultState = {
  currentColor: 'red',
  prevColor: 'green',
  firstColor: 'red',
  secondColor: 'blue',
  selectTool: '',
  figures: [
    {
      id:0,
      color: '#ccc',
      circle: true,
      top: '0',
      left: '0'
    },
    {
      id:1,
      color: '#ccc',
      circle: true,
      top: '0',
      left: '153'
    },
    {
      id: 2,
      color: '#ccc',
      circle: false,
      top: '0',
      left: '306'
    },
    {
      id: 3,
      color: '#ccc',
      circle: true,
      top: '153',
      left: '0'
    },
    {
      id:4,
      color: '#ccc',
      circle: true,
      top: '153',
      left: '153'
    },
    {
      id: 5,
      color: '#ccc',
      circle: true,
      top: '153',
      left: '306'
    },
    {
      id: 6,
      color: '#ccc',
      circle: false,
      top: '306',
      left: '0'
    },
    {
      id: 7,
      color: '#ccc',
      circle: true,
      top: '306',
      left: '153'
    },
    {
      id: 8,
      color: '#ccc',
      circle: false,
      top: '306',
      left: '306'
    },
  ]
}
let tempState = {}

function setState(state){
  if (localStorage.getItem('state')!=null){
    console.log('set--',state)
    localStorage.setItem('state', JSON.stringify(state))
  }else{
    localStorage.setItem('state', JSON.stringify(defaultState))
  }
}

function getState(){
  console.log('get--',JSON.parse(localStorage.getItem('state')))
  return JSON.parse(localStorage.getItem('state'))
}

// if (!!localStorage.getItem('state')){
  
//   setState(defaultState);
//   tempState = defaultState;
// }else{
//   console.log('12')
//   tempState = getState()
// }

export  { 
  tempState as state,
  setState,
  getState 
};