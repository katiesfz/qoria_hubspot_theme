/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/generate_joke.js":
/*!******************************!*\
  !*** ./src/generate_joke.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function joke() {
  return "I don't trust stairs.";
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (joke);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss ***!
  \***********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `body {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.footer-wrapper {
  flex-shrink: 0;
}

.content-wrapper {
  flex: 1 0 auto;
}

footer.bg-gradient-primary a {
  color: #FFFFFF;
}

.heading-bg-gradient {
  display: inline;
  padding: 0.06em 1.8em 0.15em 0;
  line-height: 1.6em;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}

.bg-gradient-primary {
  background-color: #58b78e;
}

.bg-gradient-primary-reverse {
  background-color: #58b78e;
}

.bg-gradient-primary-transparent {
  background-color: #58b78e;
  background: linear-gradient(45deg, #58b78e 0%, transparent 100%) border-box;
}

.bg-gradient-secondary-transparent {
  background-color: #515ba5;
  background: linear-gradient(45deg, #515ba5 0%, transparent 100%) border-box;
}

.fade-45 {
  -webkit-mask-image: linear-gradient(45deg, rgba(0, 0, 0, 0.9) 24%, transparent 63%);
  mask-image: linear-gradient(45deg, rgba(0, 0, 0, 0.9) 24%, transparent 63%);
}

.bg-image-faded:before {
  background-position: center center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  mix-blend-mode: luminosity;
  background-size: cover;
  content: "";
  opacity: 0.1;
}

h1, h2, h3 {
  font-weight: 300;
}

h6 {
  font-weight: 700;
}

p:last-child {
  margin-top: 0;
  margin-bottom: 0;
}

.text-decoration-partial-underline {
  margin-bottom: 1.5em;
}
.text-decoration-partial-underline:after {
  background: currentColor;
  bottom: -0.5em;
  content: "";
  display: block;
  height: 4px;
  position: relative;
  width: 40px;
}
.text-decoration-partial-underline.text-center:after {
  margin: 0 auto;
}
.text-decoration-partial-underline.text-end:after {
  margin-left: auto;
}

.text-tilted {
  transform: rotate(-1.2deg);
}

p.intro {
  font-weight: normal;
}

blockquote {
  padding: 2rem;
  margin: 2rem 0;
  background-color: #ebebeb;
}

.x-small {
  font-size: 0.75rem;
}

.hero-full-video, .hero-full-image {
  position: relative;
  background-color: black;
  width: 100%;
  /*  overflow: hidden; */
}

.video-bg-container {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: 100%;
  height: 100%;
  z-index: 0;
  -ms-transform: translateX(-50%) translateY(-50%);
  -moz-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  overflow: hidden;
}

.hero-full-video video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: 0;
  -ms-transform: translateX(-50%) translateY(-50%);
  -moz-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
}

.hero-full-video .container,
.hero-full-video .container-fluid,
.hero-full-video .container-xxl,
.hero-full-video .container-xl,
.hero-full-video .container-lg,
.hero-full-video .container-md,
.hero-full-video .container-sm,
.hero-full-image .container,
.hero-full-image .container-fluid,
.hero-full-image .container-xxl,
.hero-full-image .container-xl,
.hero-full-image .container-lg,
.hero-full-image .container-md,
.hero-full-image .container-sm {
  position: relative;
  z-index: 2;
}

.hero-full-video .heading-location-bottom-left, .hero-full-image .heading-location-bottom-left {
  padding-top: 10rem;
}

.hero-full-video .heading-location-33-left, .hero-full-image .heading-location-33-left {
  padding-top: 3.3rem;
  padding-bottom: 6.6rem;
}

.hero-full-video .heading-location-middle-left, .hero-full-image .heading-location-middle-left {
  padding-top: 5rem;
  padding-bottom: 5rem;
}

.hero-full-video .heading-location-top-left, .hero-full-image .heading-location-top-left {
  padding-bottom: 10rem;
}

.hero-full-video .heading-location-66-left, .hero-full-image .heading-location-66-left {
  padding-top: 6.6rem;
  padding-bottom: 3.3rem;
}

.hero-form {
  padding-top: 7rem;
}

@media (min-width: 768px) {
  .hero-full-video .heading-location-bottom-left, .hero-full-image .heading-location-bottom-left {
    padding-top: 30rem;
  }
  .hero-full-video .heading-location-33-left, .hero-full-image .heading-location-33-left {
    padding-top: 10rem;
    padding-bottom: 20rem;
  }
  .hero-full-video .heading-location-middle-left, .hero-full-image .heading-location-middle-left {
    padding-top: 15rem;
    padding-bottom: 15rem;
  }
  .hero-full-video .heading-location-top-left, .hero-full-image .heading-location-top-left {
    padding-bottom: 30rem;
  }
  .hero-full-video .heading-location-66-left, .hero-full-image .heading-location-66-left {
    padding-top: 20rem;
    padding-bottom: 10rem;
  }
  .hero-form {
    padding-top: 10rem;
  }
}
.hero-full-video .overlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: black;
  opacity: 0.5;
  z-index: 1;
}

.page-contents.arrow-down:after {
  left: 43px;
}

img.blog-featured-image {
  max-height: 300px;
  width: 100%;
  object-fit: cover;
  object-position: center center;
}

.blog-listing img.featured-image {
  max-height: 200px;
  width: 100%;
}

.blog-post-body img {
  max-width: 100%;
}

.content-type-tag {
  position: absolute;
  bottom: 0;
  display: block;
  left: 0;
  padding: 0.5em 1em;
  line-height: 1em;
  font-size: 1rem;
}

.play-button {
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
  min-width: 50px;
  width: 10%;
}

.play-button:after {
  content: "";
  display: block;
  padding-top: 69.82759%;
}

.play-button-light {
  mix-blend-mode: screen;
  opacity: 70%;
}

.q-icon img {
  width: 0.6rem;
}

/* Blog post styles */
.blog-post h3, .blog-post .h3 {
  font-weight: bold;
}
.blog-post h4, .blog-post .h4 {
  font-weight: bold;
  color: #58b78e;
}
.blog-post h5, .blog-post .h5 {
  color: #58b78e;
}
.blog-post h6, .blog-post .h6 {
  font-weight: bold;
}
.blog-post .blog-post-body #hs_cos_wrapper_post_body > p:first-of-type {
  font-weight: bold;
}
.blog-post hr {
  width: 50%;
  margin: 2rem auto;
  border-color: #b0b0b0;
}

.hs-search-results__listing li {
  margin-bottom: 0 !important;
}

.hs-search-results__title {
  color: #58b78e;
}

.fa-end {
  vertical-align: 0;
}

button, [type=button], [type=reset], [type=submit] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
}

.cursor-alias {
  cursor: alias;
}

.cursor-all-scroll {
  cursor: all-scroll;
}

.cursor-auto {
  cursor: auto;
}

.cursor-cell {
  cursor: cell;
}

.cursor-col-resize {
  cursor: col-resize;
}

.cursor-context-menu {
  cursor: context-menu;
}

.cursor-copy {
  cursor: copy;
}

.cursor-crosshair {
  cursor: crosshair;
}

.cursor-default {
  cursor: default;
}

.cursor-e-resize {
  cursor: e-resize;
}

.cursor-ew-resize {
  cursor: ew-resize;
}

.cursor-grab {
  cursor: grab;
}

.cursor-grabbing {
  cursor: grabbing;
}

.cursor-help {
  cursor: help;
}

.cursor-move {
  cursor: move;
}

.cursor-n-resize {
  cursor: n-resize;
}

.cursor-ne-resize {
  cursor: ne-resize;
}

.cursor-nesw-resize {
  cursor: nesw-resize;
}

.cursor-ns-resize {
  cursor: ns-resize;
}

.cursor-nw-resize {
  cursor: nw-resize;
}

.cursor-nwse-resize {
  cursor: nwse-resize;
}

.cursor-no-drop {
  cursor: no-drop;
}

.cursor-none {
  cursor: none;
}

.cursor-not-allowed {
  cursor: not-allowed;
}

.cursor-pointer {
  cursor: pointer;
}

.cursor-progress {
  cursor: progress;
}

.cursor-row-resize {
  cursor: row-resize;
}

.cursor-s-resize {
  cursor: s-resize;
}

.cursor-se-resize {
  cursor: se-resize;
}

.cursor-sw-resize {
  cursor: sw-resize;
}

.cursor-text {
  cursor: text;
}

.cursor-w-resize {
  cursor: w-resize;
}

.cursor-wait {
  cursor: wait;
}

.cursor-zoom-in {
  cursor: zoom-in;
}

.cursor-zoom-out {
  cursor: zoom-out;
}`, "",{"version":3,"sources":["webpack://./src/styles/main.scss"],"names":[],"mappings":"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","sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles/main.scss":
/*!******************************!*\
  !*** ./src/styles/main.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./main.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/Linewize_byqoria_colour.png":
/*!************************************************!*\
  !*** ./src/assets/Linewize_byqoria_colour.png ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "Linewize_byqoria_colour.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _generate_joke__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./generate_joke */ "./src/generate_joke.js");
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/main.scss */ "./src/styles/main.scss");
/* harmony import */ var _assets_Linewize_byqoria_colour_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/Linewize_byqoria_colour.png */ "./src/assets/Linewize_byqoria_colour.png");



var logoImg = document.getElementById("logoImg");
logoImg.src = _assets_Linewize_byqoria_colour_png__WEBPACK_IMPORTED_MODULE_2__;
console.log((0,_generate_joke__WEBPACK_IMPORTED_MODULE_0__["default"])());
/******/ })()
;
//# sourceMappingURL=bundle.325ae0425a118a6c5b53.js.map