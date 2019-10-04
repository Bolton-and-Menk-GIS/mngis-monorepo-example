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

/**
 * gets seconds from time delta from any combination of values
 * @param {number} seconds - number of seconds
 * @param {number} minutes - number of minutes
 * @param {number} hours - number of hours
 * @param {number} days - number of days
 * @param {number} weeks - number of weeks
 * @param {number} months - number of months
 * @param {number} years - number of years
 * @returns {number} cummulative nubmer of seconds derived from input time deltas
 *
 * @example
 * // returns 90000 (1 day + 1 hour or 25 hours)
 * twentyFiveHours = getSeconds({days: 1, hours: 1}); // or getSeconds({hours: 25})
 */
function getSeconds() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$seconds = _ref.seconds,
      seconds = _ref$seconds === void 0 ? 0 : _ref$seconds,
      _ref$minutes = _ref.minutes,
      minutes = _ref$minutes === void 0 ? 0 : _ref$minutes,
      _ref$hours = _ref.hours,
      hours = _ref$hours === void 0 ? 0 : _ref$hours,
      _ref$days = _ref.days,
      days = _ref$days === void 0 ? 0 : _ref$days,
      _ref$weeks = _ref.weeks,
      weeks = _ref$weeks === void 0 ? 0 : _ref$weeks,
      _ref$months = _ref.months,
      months = _ref$months === void 0 ? 0 : _ref$months,
      _ref$years = _ref.years,
      years = _ref$years === void 0 ? 0 : _ref$years;

  var SECONDS_PER_MINUTE = 60;
  var SECONDS_PER_HOUR = 3600;
  var SECONDS_PER_DAY = 86400;
  var SECONDS_PER_WEEK = 604800;
  var SECONDS_PER_MONTH = 2.628e6;
  var SECONDS_PER_YEAR = 3.154e7;
  var toAdd = [{
    unit: seconds,
    val: 1
  }, {
    unit: minutes,
    val: SECONDS_PER_MINUTE
  }, {
    unit: hours,
    val: SECONDS_PER_HOUR
  }, {
    unit: days,
    val: SECONDS_PER_DAY
  }, {
    unit: weeks,
    val: SECONDS_PER_WEEK
  }, {
    unit: months,
    val: SECONDS_PER_MONTH
  }, {
    unit: years,
    val: SECONDS_PER_YEAR
  }];
  return toAdd.reduce(function (acc, v) {
    return acc + v.unit * v.val;
  }, 0);
}
/**
 * helper function to run asynchronous function on all items in an array
 * @async
 * @param {Any[]} array - input array of items to run against an async function
 * @param {function} callbackfn - an asynchronous function 
 * @returns {Any[]} an array of the outputs from the asynchronous function for each item in array
 * @see https://stackoverflow.com/a/53508547/3005089
 * @example
 * async function isEven(n) {
 *   await setTimeout(()=> null, 250);
 *   return !(n % 2)
 * }
 * const vals = [2, 4, 3, 7, 8, 9, 10, 11];
 * const bools = await mapAsync(vals, isEven);
 * // [true, true, false, false, true, false, true, false]
 */

function mapAsync(array, callbackfn) {
  return Promise.all(array.map(callbackfn));
}
/**
 * performs an Array.prototype.filter function on an array using an asynchronous function
 * @async
 * @param {Any[]} array - input array of items to run against an async function
 * @param {function} callbackfn - an asynchronous function 
 * @returns {Any[]} a filtered array of the outputs from the asynchronous function for each item in array
 * @see https://stackoverflow.com/a/53508547/3005089
 * @example
 * async function isEven(n) {
 *   await setTimeout(()=> null, 250);
 *   return !(n % 2)
 * }
 * const vals = [2, 4, 3, 7, 8, 9, 10, 11];
 * await filterAsync(vals, isEven);
 * // [2, 4, 8, 10]
 */

function filterAsync(_x, _x2) {
  return _filterAsync.apply(this, arguments);
}
/**
 * Casts input object to Array.
 *
 * @description Guarantees that the input is an Array. If the input is not an Array, it will be added to one.
 *
 * @function toArray
 * @param {(Object|Array|Number|String)} obj Object of any type to put into an array.
 *
 * @example
 * // returns [1];
 * const layerName = 'Cities';
 * const layerNames = toArray(layerName); // -> ['Cities']
 *
 * @example
 * // can also be used to validation and ensure the output is an array
 * const oidList = [1, 2, 3];
 * // returns the original object, because it is already an Array: [1, 2, 3]
 * toArray(oidList) // -> [1, 2, 3]
 *
 * @return {Array} an Array or the original object if input was an Array.  Will put any inputs into an Array, or can be used to ensure something is an Array.
 *
 */

function _filterAsync() {
  _filterAsync = asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(array, callbackfn) {
    var filterMap;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return mapAsync(array, callbackfn);

          case 2:
            filterMap = _context.sent;
            return _context.abrupt("return", array.filter(function (value, index) {
              return filterMap[index];
            }));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _filterAsync.apply(this, arguments);
}

function toArray(obj) {
  if (!obj) {
    return [];
  }

  if (Array.isArray(obj)) {
    return obj;
  } else {
    return [obj];
  }
}
/**
 * returns true if input is not null or undefined, explicit test
 * @function notNull
 * @param {Any} x - input to be tested
 *
 * @example
 * const obj = { test: false }
 * notNull(obj.test) // true, because boolean false is not null
 *
 * notNull(obj.foo) // false, because obj.foo is undefined
 */

var notNull = function notNull(x) {
  return ![null, undefined].includes(x);
};
/**
 * fetches nested properties from an object
 * @function nestedProp
 * @param {String[]} p - property chain order
 * @returns {Function} a function to call for the property, you would then use this call on an object: nestedProp(['edits', 'add'])(<your-object>)
 *
 * @example
 * // simple example with a single object (check for editable geometry)
 * const layerConfig = { name: 'Map Notes', edits: { add: true, update: { attributes: true, geometry: true }, delete: true }};
 * const canEditGeometry = nestedProp(['edits', 'update', 'geometry'])(layerConfig); // true, same as calling layerConfig.edits.update.geometry
 *
 * @example
 * // can also be used for one level deep
 * const edits = nestedProp('edits')(layerConfig) //  { add: true, update: { attributes: true, geometry: true }, delete: true }
 *
 * @example
 * // find all editable geometries in a list
 * const layerConfigs = [
 * {
 *    name: 'Map Notes',
 *    edits: {
 *      add: true,
 *      update: {
 *        attributes: true,
 *        geometry: true
 *      },
 *      delete: true
 *    }
 *  }, {
 *    name: 'Storm Manholes',
 *    edits: {
 *      add: true,
 *      update: {
 *        attributes: true,
 *        geometry: false
 *      },
 *     delete: false
 *    }
 *  }]
 *
 * // now filter the array to only include editable geometries (1 result, curried function will automatically take each item)
 * layerConfigs.filter(nestedProp(['edits', 'update', 'geometry'])); // {name: 'Map Notes', ...}
 *
 */

var nestedProp = function nestedProp(p) {
  return function (o) {
    return (typeof p === "string" ? p.split(".") : toArray(p)).reduce(function (xs, x) {
      return notNull(xs) && notNull(xs[x]) ? xs[x] : null;
    }, o);
  };
};

export { filterAsync, getSeconds, mapAsync, nestedProp, notNull, toArray };
