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

export { getSeconds };
