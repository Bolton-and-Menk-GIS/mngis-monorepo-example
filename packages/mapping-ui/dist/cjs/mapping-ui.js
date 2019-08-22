"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var esriLoader=require("esri-loader");function _arrayWithHoles(e){if(Array.isArray(e))return e}var arrayWithHoles=_arrayWithHoles;function _iterableToArrayLimit(e,r){var t=[],n=!0,a=!1,o=void 0;try{for(var i,s=e[Symbol.iterator]();!(n=(i=s.next()).done)&&(t.push(i.value),!r||t.length!==r);n=!0);}catch(e){a=!0,o=e}finally{try{n||null==s.return||s.return()}finally{if(a)throw o}}return t}var iterableToArrayLimit=_iterableToArrayLimit;function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}var nonIterableRest=_nonIterableRest;function _slicedToArray(e,r){return arrayWithHoles(e)||iterableToArrayLimit(e,r)||nonIterableRest()}var slicedToArray=_slicedToArray;function asyncGeneratorStep(e,r,t,n,a,o,i){try{var s=e[o](i),c=s.value}catch(e){return void t(e)}s.done?r(c):Promise.resolve(c).then(n,a)}function _asyncToGenerator(s){return function(){var e=this,i=arguments;return new Promise(function(r,t){var n=s.apply(e,i);function a(e){asyncGeneratorStep(n,r,t,a,o,"next",e)}function o(e){asyncGeneratorStep(n,r,t,a,o,"throw",e)}a(void 0)})}}var asyncToGenerator=_asyncToGenerator;function _defineProperty(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var defineProperty=_defineProperty;function ownKeys(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})),t.push.apply(t,n)}return t}function _objectSpread(r){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(t,!0).forEach(function(e){defineProperty(r,e,t[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):ownKeys(t).forEach(function(e){Object.defineProperty(r,e,Object.getOwnPropertyDescriptor(t,e))})}return r}var POSITION_DEFAULT={position:"top-right"},TOGGLER_DEFAULT=_objectSpread({maps:["topo","satellite"],options:{activeBasemap:"topo"}},POSITION_DEFAULT),GALLERY_DEFAULT=_objectSpread({options:{activeBasemap:"topo"}},POSITION_DEFAULT),widgets={};widgets.ready=new Promise(function(){var t=asyncToGenerator(regeneratorRuntime.mark(function e(r,t){var n,a,o,i,s;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,esriLoader.loadModules(["esri/widgets/Expand","esri/widgets/BasemapGallery","esri/widgets/BasemapToggle"]);case 2:n=e.sent,a=slicedToArray(n,3),o=a[0],i=a[1],s=a[2],widgets.addBasemapGallery=function(e){var r=1<arguments.length&&void 0!==arguments[1]?arguments[1]:GALLERY_DEFAULT,t=new i(_objectSpread({view:e,container:document.createElement("div")},r.options)),n=new o({view:e,content:t.domNode,expandIconClass:"esri-icon-basemap"});e.ui.add(n,r.position||"top-right")},widgets.addBasemapToggler=function(e,r){var t=2<arguments.length&&void 0!==arguments[2]?arguments[2]:TOGGLER_DEFAULT;console.log("BASEMAP TOGGLE IS: ",s);var n=new s(_objectSpread({view:e,nextBasemap:t.maps[r.currentBasemapIndex+1]||"topo"},t.options));"currentBasemapIndex"in r||(r.currentBasemapIndex=0),n.on("toggle",function(e){r.currentBasemapIndex=t.maps.indexOf(e.current.id),r.currentBasemapIndex===t.maps.length-1?e.target.nextBasemap=t.maps[0]:e.target.nextBasemap=t.maps[r.currentBasemapIndex+1]}),e.ui.add(n,t.position||"top-right")},r(widgets);case 10:case"end":return e.stop()}},e)}));return function(e,r){return t.apply(this,arguments)}}()),exports.widgets=widgets;
