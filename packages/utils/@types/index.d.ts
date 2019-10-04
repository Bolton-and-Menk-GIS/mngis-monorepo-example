/**
 * a time delta from any combination of values
 * @typedef {object} TimeDelta
 * @property {number} [seconds] - number of seconds
 * @property {number} [minutes] - number of minutes
 * @property {number} [hours] - number of hours
 * @property {number} [days] - number of days
 * @property {number} [weeks] - number of weeks
 * @property {number} [months] - number of months
 * @property {number} [years] - number of years
 */
export interface TimeDelta {
  /** number of seconds */
  seconds?: number,
  /** number of minutes */
  minutes?: number,
  /** number of hours */
  hours?: number,
  /** number of days */
  days?: number,
  /** number of weeks */
  weeks?: number,
  /** number of months */
  months?: number,
  /** number of years */
  years?: number,
}