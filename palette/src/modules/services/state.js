const defaultState = {
  currentColor: 'red',
  prevColor: 'green',
  firstColor: 'red',
  secondColor: 'blue',
  selectTool: '',
  figures: [
    {
      id: 0,
      color: '#ccc',
      circle: false,
      top: '0',
      left: '0',
    },
    {
      id: 1,
      color: '#ccc',
      circle: false,
      top: '0',
      left: '153',
    },
    {
      id: 2,
      color: '#ccc',
      circle: false,
      top: '0',
      left: '306',
    },
    {
      id: 3,
      color: '#ccc',
      circle: false,
      top: '153',
      left: '0',
    },
    {
      id: 4,
      color: '#ccc',
      circle: false,
      top: '153',
      left: '153',
    },
    {
      id: 5,
      color: '#ccc',
      circle: false,
      top: '153',
      left: '306',
    },
    {
      id: 6,
      color: '#ccc',
      circle: false,
      top: '306',
      left: '0',
    },
    {
      id: 7,
      color: '#ccc',
      circle: false,
      top: '306',
      left: '153',
    },
    {
      id: 8,
      color: '#ccc',
      circle: false,
      top: '306',
      left: '306',
    },
  ],
};

function setState(state) {
  localStorage.setItem('state', JSON.stringify(state));
}

function getState() {
  return JSON.parse(localStorage.getItem('state'));
}

if (localStorage.getItem('state') == null) {
  setState(defaultState);
}

export {
  setState,
  getState,
};
