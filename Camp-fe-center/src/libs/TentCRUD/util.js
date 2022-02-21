/* eslint import/prefer-default-export: 0 */

/**
 * @param key {String}
 * @param val {String | Number | Boolean}
 * @param arr {Array}
 * @return {Number}
 */
export const findIndexByKey = (key, val, arr) => arr.findIndex(item => item[key] === val);
