/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_figure__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/figure */ \"./src/modules/figure.js\");\n/* harmony import */ var _modules_colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/colors */ \"./src/modules/colors.js\");\n/* harmony import */ var _modules_paint_bucket__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/paint-bucket */ \"./src/modules/paint-bucket.js\");\n/* harmony import */ var _modules_transform__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/transform */ \"./src/modules/transform.js\");\n/* harmony import */ var _modules_choose_color__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/choose-color */ \"./src/modules/choose-color.js\");\n/* harmony import */ var _modules_move__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/move */ \"./src/modules/move.js\");\n/* harmony import */ var _modules_tools__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/tools */ \"./src/modules/tools.js\");\n// import { state } from './modules/state'\n\n\n\n\n\n\n\n\n\nvar loadAll = function loadAll() {\n  Object(_modules_tools__WEBPACK_IMPORTED_MODULE_6__[\"loadCanvas\"])();\n  Object(_modules_tools__WEBPACK_IMPORTED_MODULE_6__[\"loadColors\"])();\n};\n\nwindow.onload = loadAll;\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/modules/choose-color.js":
/*!*************************************!*\
  !*** ./src/modules/choose-color.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ \"./src/modules/state.js\");\n/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tools */ \"./src/modules/tools.js\");\n\n\nvar chooseColor = document.getElementById('choose-color');\nchooseColor.addEventListener('click', function () {\n  var state = Object(_state__WEBPACK_IMPORTED_MODULE_0__[\"getState\"])();\n\n  if (chooseColor.classList.contains('selected-tool')) {\n    chooseColor.classList.remove('selected-tool');\n    state['selectTool'] = '';\n  } else {\n    Object(_tools__WEBPACK_IMPORTED_MODULE_1__[\"unselectTools\"])();\n    chooseColor.classList.add('selected-tool');\n    state['selectTool'] = 'choose-color';\n  }\n\n  Object(_state__WEBPACK_IMPORTED_MODULE_0__[\"setState\"])(state);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (transform);\n\n//# sourceURL=webpack:///./src/modules/choose-color.js?");

/***/ }),

/***/ "./src/modules/colors.js":
/*!*******************************!*\
  !*** ./src/modules/colors.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ \"./src/modules/state.js\");\n/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tools */ \"./src/modules/tools.js\");\n\n\nvar colors = document.querySelectorAll('.colors__demo');\n\nvar _loop = function _loop(i) {\n  colors[i].addEventListener('click', function () {\n    var state = Object(_state__WEBPACK_IMPORTED_MODULE_0__[\"getState\"])();\n\n    if (state['selectTool'] == 'choose-color') {\n      state['currentColor'] = colors[i].style.backgroundColor;\n      Object(_state__WEBPACK_IMPORTED_MODULE_0__[\"setState\"])(state);\n      Object(_tools__WEBPACK_IMPORTED_MODULE_1__[\"loadColors\"])();\n    }\n  });\n};\n\nfor (var i = 0; i < colors.length; i++) {\n  _loop(i);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (colors);\n\n//# sourceURL=webpack:///./src/modules/colors.js?");

/***/ }),

/***/ "./src/modules/figure.js":
/*!*******************************!*\
  !*** ./src/modules/figure.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ \"./src/modules/state.js\");\n/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tools */ \"./src/modules/tools.js\");\n\n\n\nvar figures = document.getElementsByClassName('canvas__figure');\n\nvar _loop = function _loop(i) {\n  figures[i].addEventListener('click', function () {\n    var state = Object(_state__WEBPACK_IMPORTED_MODULE_0__[\"getState\"])();\n\n    switch (state['selectTool']) {\n      case 'bucket':\n        state['figures'][i]['color'] = state['currentColor'];\n        figures[i].style.backgroundColor = state['currentColor'];\n        break;\n\n      case 'transform':\n        if (state['figures'][i]['circle'] == true) {\n          state['figures'][i]['circle'] = false;\n        } else if (state['figures'][i]['circle'] == false) {\n          state['figures'][i]['circle'] = true;\n        }\n\n        break;\n\n      case 'choose-color':\n        state['prevColor'] = state['currentColor'];\n        state['currentColor'] = figures[i].style.backgroundColor;\n        Object(_state__WEBPACK_IMPORTED_MODULE_0__[\"setState\"])(state);\n        Object(_tools__WEBPACK_IMPORTED_MODULE_1__[\"loadColors\"])();\n        break;\n\n      default:\n        break;\n    }\n\n    Object(_state__WEBPACK_IMPORTED_MODULE_0__[\"setState\"])(state);\n    Object(_tools__WEBPACK_IMPORTED_MODULE_1__[\"loadCanvas\"])();\n  });\n  figures[i].addEventListener('mousedown', function (e) {\n    var mousedownX = e.pageX;\n    var mousedownY = e.pageY;\n    var state = Object(_state__WEBPACK_IMPORTED_MODULE_0__[\"getState\"])();\n\n    if (state['selectTool'] == 'move') {\n      figures[i].style.zIndex = 1000;\n      var topPx = +figures[i].style.top.slice(0, -2);\n      var leftPx = +figures[i].style.left.slice(0, -2);\n\n      document.querySelector('.canvas').onmousemove = function (e) {\n        figures[i].style.top = topPx - (mousedownY - e.pageY) + 'px';\n        figures[i].style.left = leftPx - (mousedownX - e.pageX) + 'px';\n      };\n\n      figures[i].onmouseup = function (e) {\n        document.querySelector('.canvas').onmousemove = null;\n        var canvasTop = document.getElementsByClassName('canvas')[0]['offsetTop'];\n        var canvasLeft = document.getElementsByClassName('canvas')[0]['offsetLeft'];\n        var top = e.clientY - canvasTop;\n        var left = e.clientX - canvasLeft;\n\n        if (top < 450 && top > -153 && left > -153 && left < 450) {\n          var temp = state['figures'][i];\n          var targetFigureId = Math.floor(top / 153) * 3 + Math.floor(left / 153);\n          state['figures'][i] = state['figures'][targetFigureId];\n          state['figures'][targetFigureId] = temp;\n          Object(_state__WEBPACK_IMPORTED_MODULE_0__[\"setState\"])(state);\n          Object(_tools__WEBPACK_IMPORTED_MODULE_1__[\"loadCanvas\"])(state);\n        }\n      };\n    }\n  });\n};\n\nfor (var i = 0; i < figures.length; i++) {\n  _loop(i);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (figures);\n\n//# sourceURL=webpack:///./src/modules/figure.js?");

/***/ }),

/***/ "./src/modules/move.js":
/*!*****************************!*\
  !*** ./src/modules/move.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ \"./src/modules/state.js\");\n/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tools */ \"./src/modules/tools.js\");\n\n\nvar move = document.getElementById('move');\nmove.addEventListener('click', function (e) {\n  var state = Object(_state__WEBPACK_IMPORTED_MODULE_0__[\"getState\"])();\n\n  if (move.classList.contains('selected-tool')) {\n    move.classList.remove('selected-tool');\n    state['selectTool'] = '';\n  } else {\n    Object(_tools__WEBPACK_IMPORTED_MODULE_1__[\"unselectTools\"])();\n    move.classList.add('selected-tool');\n    state['selectTool'] = 'move';\n  }\n\n  Object(_state__WEBPACK_IMPORTED_MODULE_0__[\"setState\"])(state);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (move);\n\n//# sourceURL=webpack:///./src/modules/move.js?");

/***/ }),

/***/ "./src/modules/paint-bucket.js":
/*!*************************************!*\
  !*** ./src/modules/paint-bucket.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ \"./src/modules/state.js\");\n/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tools */ \"./src/modules/tools.js\");\n\n\nvar paintBucket = document.getElementById('bucket');\npaintBucket.addEventListener('click', function (e) {\n  var state = Object(_state__WEBPACK_IMPORTED_MODULE_0__[\"getState\"])();\n\n  if (paintBucket.classList.contains('selected-tool')) {\n    paintBucket.classList.remove('selected-tool');\n    state['selectTool'] = '';\n  } else {\n    Object(_tools__WEBPACK_IMPORTED_MODULE_1__[\"unselectTools\"])();\n    paintBucket.classList.add('selected-tool');\n    state['selectTool'] = 'bucket';\n  }\n\n  Object(_state__WEBPACK_IMPORTED_MODULE_0__[\"setState\"])(state);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (paintBucket);\n\n//# sourceURL=webpack:///./src/modules/paint-bucket.js?");

/***/ }),

/***/ "./src/modules/state.js":
/*!******************************!*\
  !*** ./src/modules/state.js ***!
  \******************************/
/*! exports provided: state, setState, getState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"state\", function() { return tempState; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setState\", function() { return setState; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getState\", function() { return getState; });\nvar defaultState = {\n  currentColor: 'red',\n  prevColor: 'green',\n  firstColor: 'red',\n  secondColor: 'blue',\n  selectTool: '',\n  figures: [{\n    id: 0,\n    color: '#ccc',\n    circle: true,\n    top: '0',\n    left: '0'\n  }, {\n    id: 1,\n    color: '#ccc',\n    circle: true,\n    top: '0',\n    left: '153'\n  }, {\n    id: 2,\n    color: '#ccc',\n    circle: false,\n    top: '0',\n    left: '306'\n  }, {\n    id: 3,\n    color: '#ccc',\n    circle: true,\n    top: '153',\n    left: '0'\n  }, {\n    id: 4,\n    color: '#ccc',\n    circle: true,\n    top: '153',\n    left: '153'\n  }, {\n    id: 5,\n    color: '#ccc',\n    circle: true,\n    top: '153',\n    left: '306'\n  }, {\n    id: 6,\n    color: '#ccc',\n    circle: false,\n    top: '306',\n    left: '0'\n  }, {\n    id: 7,\n    color: '#ccc',\n    circle: true,\n    top: '306',\n    left: '153'\n  }, {\n    id: 8,\n    color: '#ccc',\n    circle: false,\n    top: '306',\n    left: '306'\n  }]\n};\nvar tempState = {};\n\nfunction setState(state) {\n  if (localStorage.getItem('state') != null) {\n    console.log('set--', state);\n    localStorage.setItem('state', JSON.stringify(state));\n  } else {\n    localStorage.setItem('state', JSON.stringify(defaultState));\n  }\n}\n\nfunction getState() {\n  console.log('get--', JSON.parse(localStorage.getItem('state')));\n  return JSON.parse(localStorage.getItem('state'));\n} // if (!!localStorage.getItem('state')){\n//   setState(defaultState);\n//   tempState = defaultState;\n// }else{\n//   console.log('12')\n//   tempState = getState()\n// }\n\n\n\n\n//# sourceURL=webpack:///./src/modules/state.js?");

/***/ }),

/***/ "./src/modules/tools.js":
/*!******************************!*\
  !*** ./src/modules/tools.js ***!
  \******************************/
/*! exports provided: unselectTools, loadCanvas, loadColors */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"unselectTools\", function() { return unselectTools; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadCanvas\", function() { return loadCanvas; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadColors\", function() { return loadColors; });\n/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ \"./src/modules/state.js\");\n\n\nfunction unselectTools() {\n  var tools = document.querySelector('.toolbar__tools');\n\n  for (var i = 0; i < tools.children.length; i++) {\n    if (tools.children[i].classList.contains('selected-tool')) {\n      tools.children[i].classList.remove('selected-tool');\n    }\n  }\n}\n\nfunction loadCanvas() {\n  var state = Object(_state__WEBPACK_IMPORTED_MODULE_0__[\"getState\"])();\n  var figures = document.querySelectorAll('.canvas__figure');\n\n  for (var i = 0; i < figures.length; i++) {\n    figures[i].style.backgroundColor = state['figures'][i]['color'];\n    figures[i].style.top = state['figures'][i]['top'] + 'px';\n    figures[i].style.left = state['figures'][i]['left'] + 'px';\n\n    if (state['figures'][i]['circle']) {\n      figures[i].classList.add('circle');\n    } else {\n      figures[i].classList.remove('circle');\n    }\n  }\n}\n\nfunction loadColors() {\n  var state = Object(_state__WEBPACK_IMPORTED_MODULE_0__[\"getState\"])();\n  document.querySelector('.colors__demo-current-color').style.backgroundColor = state['currentColor'];\n  document.querySelector('.colors__demo-prev-color').style.backgroundColor = state['prevColor'];\n  document.querySelector('.colors__demo-red-color').style.backgroundColor = state['firstColor'];\n  document.querySelector('.colors__demo-blue-color').style.backgroundColor = state['secondColor'];\n}\n\n\n\n//# sourceURL=webpack:///./src/modules/tools.js?");

/***/ }),

/***/ "./src/modules/transform.js":
/*!**********************************!*\
  !*** ./src/modules/transform.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ \"./src/modules/state.js\");\n/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tools */ \"./src/modules/tools.js\");\n\n\nvar transform = document.getElementById('transform');\ntransform.addEventListener('click', function () {\n  var state = Object(_state__WEBPACK_IMPORTED_MODULE_0__[\"getState\"])();\n\n  if (transform.classList.contains('selected-tool')) {\n    transform.classList.remove('selected-tool');\n    state['selectTool'] = '';\n    console.log(state);\n  } else {\n    Object(_tools__WEBPACK_IMPORTED_MODULE_1__[\"unselectTools\"])();\n    transform.classList.add('selected-tool');\n    state['selectTool'] = 'transform';\n    console.log(state);\n  }\n\n  Object(_state__WEBPACK_IMPORTED_MODULE_0__[\"setState\"])(state);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (transform);\n\n//# sourceURL=webpack:///./src/modules/transform.js?");

/***/ })

/******/ });