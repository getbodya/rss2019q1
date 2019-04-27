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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/state */ \"./src/modules/state.js\");\n/* harmony import */ var _modules_paint_bucket__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/paint-bucket */ \"./src/modules/paint-bucket.js\");\n/* harmony import */ var _modules_figure__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/figure */ \"./src/modules/figure.js\");\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/modules/figure.js":
/*!*******************************!*\
  !*** ./src/modules/figure.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ \"./src/modules/state.js\");\n\nvar figures = document.getElementsByClassName('canvas__figure');\nconsole.log(figures.length);\n\nvar _loop = function _loop(i) {\n  figures[i].addEventListener('click', function () {\n    console.log(figures[i]);\n\n    switch (_state__WEBPACK_IMPORTED_MODULE_0__[\"default\"]['selectTool']) {\n      case 'bucket':\n        figures[i].style.backgroundColor = _state__WEBPACK_IMPORTED_MODULE_0__[\"default\"]['currentColor'];\n        break;\n\n      default:\n        break;\n    }\n  });\n};\n\nfor (var i = 0; i < figures.length; i++) {\n  _loop(i);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (figures);\n\n//# sourceURL=webpack:///./src/modules/figure.js?");

/***/ }),

/***/ "./src/modules/paint-bucket.js":
/*!*************************************!*\
  !*** ./src/modules/paint-bucket.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ \"./src/modules/state.js\");\n\nvar paintBucket = document.getElementById('bucket');\npaintBucket.addEventListener('click', function (e) {\n  if (paintBucket.classList.contains('selected-tool')) {\n    paintBucket.classList.remove('selected-tool');\n    _state__WEBPACK_IMPORTED_MODULE_0__[\"default\"]['selectTool'] = '';\n  } else {\n    paintBucket.classList.add('selected-tool');\n    _state__WEBPACK_IMPORTED_MODULE_0__[\"default\"]['selectTool'] = 'bucket';\n  }\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (paintBucket);\n\n//# sourceURL=webpack:///./src/modules/paint-bucket.js?");

/***/ }),

/***/ "./src/modules/state.js":
/*!******************************!*\
  !*** ./src/modules/state.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar state = {\n  currentColor: 'red',\n  prevColor: 'green',\n  firstColor: 'red',\n  secondColor: 'blue',\n  selectTool: ''\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (state);\n\n//# sourceURL=webpack:///./src/modules/state.js?");

/***/ })

/******/ });