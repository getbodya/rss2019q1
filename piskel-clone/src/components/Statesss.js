const State = {
    selectTool : '',
    currentColor: '#000000',
    prevColor: '#ffffff',
    toolSize: 1,
    frames:{
      selectFrame:0,
      framesList: [
        {
          id: 0,
          order: 0,
          imageData: [],
          selectLayer:0,
          layers:[
            {
              id:0,
              order:0,
              imageData: [],
            }
          ]
        }
      ],
    },
    screenState: false,
}
export default State;
