import App from "./components/App";
var Worker = require("worker-loader!./gif.worker");
require ('webpack-jquery-ui/sortable') ;
var _ = require('lodash');

const app = new App();
app.run()
