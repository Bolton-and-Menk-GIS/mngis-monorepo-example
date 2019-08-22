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


export function latLongToWebMercator({latitude, longitude}){
  const originShift = 2 * Math.PI * 6378137 / 2.0;
 
  let x = (longitude * originShift) / 180.0
    // (log(tan((90.0 + Y) * M_PI / 360.0)) / (M_PI / 180.0))*111319.490778
  y =(Math.log(Math.tan((90.0 + latitude) * Math.PI / 360.0)) / (Math.PI / 180.0))*111319.490778
  // y = 180 * Math.PI / (2 / Math.tan(Math.exp(y / Math.PI * 180)) + Math.PI * 2)
  return {x, y}
}
  