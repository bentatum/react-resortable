
/**
 * @param {array} items
 * @param {number} indexFrom
 * @param {number} indexTo
 * @returns {array}
 */
export default (items, indexFrom, indexTo) => {
  var item = items[indexTo]
  items[indexTo] = items[indexFrom]
  items[indexFrom] = item
  return items
}
