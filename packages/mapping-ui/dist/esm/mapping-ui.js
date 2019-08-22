import { loadModules } from 'esri-loader';

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

var arrayWithHoles = _arrayWithHoles;

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

var iterableToArrayLimit = _iterableToArrayLimit;

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var nonIterableRest = _nonIterableRest;

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
}

var slicedToArray = _slicedToArray;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var asyncToGenerator = _asyncToGenerator;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var defineProperty = _defineProperty;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var POSITION_DEFAULT = {
  position: 'top-right'
};

var TOGGLER_DEFAULT = _objectSpread({
  maps: ['topo', 'satellite'],
  options: {
    activeBasemap: 'topo'
  }
}, POSITION_DEFAULT);

var GALLERY_DEFAULT = _objectSpread({
  options: {
    activeBasemap: 'topo'
  }
}, POSITION_DEFAULT);

var widgets = {};
widgets.ready = new Promise(
/*#__PURE__*/
function () {
  var _ref = asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(resolve, reject) {
    var _ref2, _ref3, Expand, BasemapGallery, BasemapToggle;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return loadModules(['esri/widgets/Expand', 'esri/widgets/BasemapGallery', 'esri/widgets/BasemapToggle']);

          case 2:
            _ref2 = _context.sent;
            _ref3 = slicedToArray(_ref2, 3);
            Expand = _ref3[0];
            BasemapGallery = _ref3[1];
            BasemapToggle = _ref3[2];

            widgets.addBasemapGallery = function (view) {
              var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : GALLERY_DEFAULT;
              var bg = new BasemapGallery(_objectSpread({
                view: view,
                container: document.createElement('div')
              }, config.options));
              var expand = new Expand({
                view: view,
                content: bg.domNode,
                expandIconClass: 'esri-icon-basemap'
              });
              view.ui.add(expand, config.position || 'top-right');
            };

            widgets.addBasemapToggler = function (view, context) {
              var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TOGGLER_DEFAULT;
              // toggle basemap
              console.log('BASEMAP TOGGLE IS: ', BasemapToggle);
              var bt = new BasemapToggle(_objectSpread({
                view: view,
                nextBasemap: config.maps[context.currentBasemapIndex + 1] || 'topo'
              }, config.options)); // handle logic to shuffle through basemaps

              if (!('currentBasemapIndex' in context)) {
                context.currentBasemapIndex = 0;
              }

              bt.on('toggle', function (obj) {
                context.currentBasemapIndex = config.maps.indexOf(obj.current.id);

                if (context.currentBasemapIndex === config.maps.length - 1) {
                  obj.target.nextBasemap = config.maps[0];
                } else {
                  obj.target.nextBasemap = config.maps[context.currentBasemapIndex + 1];
                }
              });
              view.ui.add(bt, config.position || 'top-right');
            };

            resolve(widgets);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

export { widgets };
