/**
 * a time delta from any combination of values
 * @typedef {Object} TimeDelta
 * @property {number} [seconds] - number of seconds
 * @property {number} [minutes] - number of minutes
 * @property {number} [hours] - number of hours
 * @property {number} [days] - number of days
 * @property {number} [weeks] - number of weeks
 * @property {number} [months] - number of months
 * @property {number} [years] - number of years
 */

/**
 * gets seconds from time delta from any combination of values
 * @param {TimeDelta} timedelta - a {@link TimeDelta} object
 * @returns {number} cummulative nubmer of seconds derived from input time deltas
 *
 * @example
 * // returns 90000 (1 day + 1 hour or 25 hours)
 * twentyFiveHours = getSeconds({days: 1, hours: 1}); // or getSeconds({hours: 25})
 */
export function getSeconds({
  seconds = 0,
  minutes = 0,
  hours = 0,
  days = 0,
  weeks = 0,
  months = 0,
  years = 0
} = {}) {
  const SECONDS_PER_MINUTE = 60;
  const SECONDS_PER_HOUR = 3600;
  const SECONDS_PER_DAY = 86400;
  const SECONDS_PER_WEEK = 604800;
  const SECONDS_PER_MONTH = 2.628e6;
  const SECONDS_PER_YEAR = 3.154e7;
  const toAdd = [
    {
      unit: seconds,
      val: 1
    },
    {
      unit: minutes,
      val: SECONDS_PER_MINUTE
    },
    {
      unit: hours,
      val: SECONDS_PER_HOUR
    },
    {
      unit: days,
      val: SECONDS_PER_DAY
    },
    {
      unit: weeks,
      val: SECONDS_PER_WEEK
    },
    {
      unit: months,
      val: SECONDS_PER_MONTH
    },
    {
      unit: years,
      val: SECONDS_PER_YEAR
    }
  ];
  return toAdd.reduce((acc, v) => acc + v.unit * v.val, 0);
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
export function mapAsync(array, callbackfn) {
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
export async function filterAsync(array, callbackfn) {
  const filterMap = await mapAsync(array, callbackfn);
  return array.filter((value, index) => filterMap[index]);
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
export function toArray(obj) {
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
export const notNull = x => ![null, undefined].includes(x);

/**
 * fetches nested properties from an object
 * @function nestedProp
 * @param {String[]} p - property chain order
 * @returns {Function} a function to call for the property, you would then use this call on an object: nestedProp(['edits', 'add'])(<your-object>)
 *
 * @example
 * // simple example with a single object (check for editable geometry)
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
export const nestedProp = p => o =>
  (typeof p === "string" ? p.split(".") : toArray(p)).reduce(
    (xs, x) => (notNull(xs) && notNull(xs[x]) ? xs[x] : null),
    o
  );