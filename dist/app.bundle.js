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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__textEditor_textEditor__ = __webpack_require__(1);


const MODULE_NAME = 'HtmlTextEditor';

angular.module(MODULE_NAME, [])
.component('textEditor', __WEBPACK_IMPORTED_MODULE_0__textEditor_textEditor__["a" /* default */]);

/* harmony default export */ __webpack_exports__["default"] = (MODULE_NAME);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const textEditor = {
  restrict: 'E',
  template: __webpack_require__(2),
  bindings: {
    myText: '=',
  },
  controller: TextEditorController
};

function TextEditorController(TextService, ModalService) {
  this.$onInit = () => {
    this.cursor = {
      start: 0,
      end: 0
    };
    this.textareaElement = document.getElementById('article-input');
    this.myText = this.myText || '';
  }

  this.saveCursor = (e) => {
    this.cursor.start = e.srcElement.selectionStart;
    this.cursor.end = e.srcElement.selectionEnd;
  };

  this.addText = () => {
    const position = this.cursor.start || 0;
    const stringToInsert = TextService.buildText();
    this.myText = TextService.insertString(position, this.myText, stringToInsert);
    TextService.setCursor(this.textareaElement, TextService.getStartText(position), TextService.getEndText(position));
  };

  this.sortText = () => {
    this.myText = sortBy(this.myText.split('\n')).join('\n');
  };

  this.wrapText = (wrap) => {
    const element = TextService.buildElement(wrap);
    this.myText = TextService.wrapByString(
      this.myText,
      element,
      this.cursor
    );
    TextService.setCursor(this.textareaElement, this.cursor.start);
  };

  this.handleKeyPress = (e) => {
    switch (e.code) {
      case "Enter":
        e.preventDefault();
        let position = e.srcElement.selectionStart;
        let stringToInsert = '\n</br>\n';
        this.myText = TextService.insertString(position, this.myText, stringToInsert);
        TextService.setCursor(e.srcElement, position + stringToInsert.length);
        break;
      default:
        break;
    }
  };
}

TextEditorController.$inject = ['TextService', 'ModalService'];

/* harmony default export */ __webpack_exports__["a"] = (textEditor);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "<div class=\"tools-panel\">\n  <div class=\"tools-panel__item\" ng-click=\"$ctrl.addText()\"><span class=\"glyphicon glyphicon-pencil\"></span></div>\n  <div class=\"tools-panel__item\" ng-click=\"$ctrl.sortText()\"><span class=\"glyphicon glyphicon-sort-by-attributes\"></span></div>\n  <div class=\"tools-panel__item\" ng-click=\"$ctrl.wrapText('i')\"><span class=\"glyphicon glyphicon-italic\"></span></div>\n  <div class=\"tools-panel__item\" ng-click=\"$ctrl.wrapText('b')\"><span class=\"glyphicon glyphicon-bold\"></span></div>\n</div>\n\n<textarea\n  id=\"article-input\"\n  class=\"form-control\"\n  ng-model=\"$ctrl.myText\"\n  ng-keypress=\"$ctrl.handleKeyPress($event)\"\n  ng-blur=\"$ctrl.saveCursor($event)\"\n  rows=\"20\"\n  required\n  >\n</textarea>\n"

/***/ })
/******/ ]);