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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TextService__ = __webpack_require__(3);



const MODULE_NAME = 'HtmlTextEditor';

angular.module(MODULE_NAME, [])
.factory('TextService', __WEBPACK_IMPORTED_MODULE_1__TextService__["a" /* default */])
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

function TextEditorController(TextService) {
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

  this.sortText = () => {
    this.myText = this.myText.split('\n').sort().join('\n');
  };

  this.wrapText = (wrap) => {
    const element = TextService.buildElement(wrap);
    this.myText = TextService.wrapByString(
      this.myText,
      element,
      this.cursor
    );
    TextService.setCursor(this.textareaElement, this.cursor.start + wrap.length + 2, this.cursor.end + wrap.length + 2);
  };

  this.handleKeyPress = (e) => {
    switch (e.code) {
      case "Enter":
        e.preventDefault();
        let position = e.srcElement.selectionStart;
        let stringToInsert = '</br>\n';
        this.myText = TextService.insertString(position, this.myText, stringToInsert);
        TextService.setCursor(e.srcElement, position + stringToInsert.length);
        break;
      default:
        break;
    }
  };
}

TextEditorController.$inject = ['TextService'];

/* harmony default export */ __webpack_exports__["a"] = (textEditor);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "<style>\n  .tools-panel {\n    display: flex;\n    justify-content: center;\n    color: gray;\n  }\n\n  .tools-panel__item {\n    margin: 0.5rem;\n    padding: 0.3rem;\n    width: 1.9rem;\n    text-align: center;\n  }\n\n  .tools-panel__item:hover {\n    box-shadow: 0 0.1rem 0 0 grey;\n    cursor: pointer;\n  }\n</style>\n\n<div class=\"tools-panel\">\n  <div class=\"tools-panel__item\" ng-click=\"$ctrl.wrapText('p')\"><span class=\"glyphicon glyphicon-pencil\"></span></div>\n  <div class=\"tools-panel__item\" ng-click=\"$ctrl.sortText()\"><span class=\"glyphicon glyphicon-sort-by-attributes\"></span></div>\n  <div class=\"tools-panel__item\" ng-click=\"$ctrl.wrapText('i')\"><span class=\"glyphicon glyphicon-italic\"></span></div>\n  <div class=\"tools-panel__item\" ng-click=\"$ctrl.wrapText('b')\"><span class=\"glyphicon glyphicon-bold\"></span></div>\n</div>\n\n<textarea\n  id=\"article-input\"\n  class=\"form-control\"\n  ng-model=\"$ctrl.myText\"\n  ng-keypress=\"$ctrl.handleKeyPress($event)\"\n  ng-blur=\"$ctrl.saveCursor($event)\"\n  rows=\"20\"\n  >\n</textarea>\n"

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function TextService() {
  return {
    insertString(position, text, stringToInsert) {
      text = text || '';
      return text.slice(0, position) + stringToInsert + text.slice(position);
    },

    wrapByString(str, strElement, cursor) {
      return str.slice(0, cursor.start) + strElement.open + str.slice(cursor.start, cursor.end) + strElement.close + str.slice(cursor.end, str.length);
    },

    setCursor(input, positionStart, positionEnd) {
      setTimeout(function () {
        input.focus();
        input.setSelectionRange(positionStart, positionEnd || positionStart);
      }, 10);
    },

    buildImage(src) {
      return `\n<img height="300" style="margin: 0.5rem;" src="${src}">\n`;
    },

    buildElement(elContent) {
      return { open: `<${elContent}>`, close: `</${elContent}>` };
    },

    getStartText(position) {
      return position + '\n<p>\n'.length;
    },

    getEndText(position) {
      return position + '\n<p>\n'.length + 'текст'.length;
    },
  }
}

TextService.$inject = [];

/* harmony default export */ __webpack_exports__["a"] = (TextService);


/***/ })
/******/ ]);