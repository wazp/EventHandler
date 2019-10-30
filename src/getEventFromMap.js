import { getElementFromMap } from './getElementFromMap.js'

/**
 * Retrieve Event object from function map
 * @param {*} el 
 * @param {*} event 
 * @param {*} functionMap 
 */
export const getEventFromMap = (el, event) => {
    const _eventName = event.split('.')
    const _element = getElementFromMap(el)
    return _element.events.find(o => o.event === _eventName[0] && o.namespace === _eventName[1])
}
