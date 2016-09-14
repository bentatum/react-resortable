
/**
 * @param {number} mousePos
 * @param {number} elementPos
 * @param {number} elementSize
 * @returns {boolean}
 */
export default (mousePos, elementPos, elementSize) => { // TODO refactor for UP
  var breakPoint = elementSize / 2 // break point is set to the middle line of element
  var mouseOverlap = mousePos - elementPos
  return mouseOverlap > breakPoint
}
