/**
 * Retrieves the element from the function map.
 * @param {*} el 
 * @param {*} functionMap 
 */

import { functionMap } from './functionMap.js'

export const getElementFromMap = (el) => {
    return functionMap.find(o => o.element === el)
}
