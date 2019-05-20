import Events from './Events';
export default class App {

    constructor(state){
        this.state = state;
    }

    run() {
        Events.imposeTools()
    }

}