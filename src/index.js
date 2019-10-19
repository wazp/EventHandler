/**
 * Quick and dirty Event Handler singleton that handles namespacing of events.
 * At the moment it only handles native events
 * 
 * @module EventHandler
 * @category utils
 *
 * @todo Add list of native events that we can compare against, so we can do custom events with the same singleton
 * @done Handle add/remove listener on a per element basis
 * @todo Handle later added elements (bind to document, compare on element)
 *
 * @example
 * EventHandler.addListener(`#myId .selectboxes`, `focus.namespace`, e => { focus(el, settings, e) })
 * EventHandler.addListener(input, `focus.namespace`, e => { focus(el, settings, e) })
  */
class EventHandlerClass {
    constructor() {
        /**
         * List of aliases for methods. Purely a quality of living for the dev
         */
        this.on = this.addListener
        this.off = this.removeListener

        // this is just for debugging reasons right now!
        document.addEventListener(`keyup`, e => {
            if (e.key === `E`) {
                console.log(functionMap)
            }
        })
    }

    /**
     * Adds an event listener
     * @param {HTMLElement} el Element to bind the event to. Defaults to document.
     * @param {string} event Event to bind. Either native or a custom event.
     * @param {function} cb Callback function to execute when event is triggered
     * @param {boolean|object} {useCapture=false} useCapture boolean or event options object
     */
    addListener(el, event, cb, useCapture = false) {
        const _els = getIterable(el)
        const _eventInfo = createEventObject(event, cb, useCapture)

        _els.forEach(el => {
            /** check if el is already in our map */
            let _el = getElementFromMap(el)

            if (_el) {
                _el.events.push({
                    ..._eventInfo
                })
            } else {
                functionMap.push({
                    element: el,
                    events: [
                        _eventInfo
                    ]
                })
                _el = getElementFromMap(el)
            }

            const _event = getEventFromMap(el, event)
            try {
                el.addEventListener(_event.event, _event.callback, _event.options)
            } catch (e) {
                console.warn(`Couldn't add event`)
            }
            
        })
    }

    /**
     * Removes an event listener
     * @param {HTMLElement} el Element to remove the event from
     * @param {string} event Event to remove
     */
    removeListener(el, event) {
        const els = getIterable(el)

        els.forEach(el => {
            const _el = getElementFromMap(el)
            const _event = getEventFromMap(el, event)

            /** remove from function map */
            const _index = _el.events.findIndex(o => o.event === _event.event && o.namespace === _event.namespace)
            if (_index > -1) {
                _el.events.splice(_index, 1)

                /** remove event listener */
                el.removeEventListener(_event.event, _event.callback, _event.options)
            }
            
        })
        
    }
}

/**
 * Map of all added event functions
 * @private
 */
const functionMap = []

/**
 * Gives back an object detailing the event information and callback, to include in the function map
 * @param {string} event Event name, including namespace if available
 * @param {function} cb Callback function
 * @returns {object} eventInfo
 */
const createEventObject = (event, cb, options) => {
    const eventName = event.split('.')
    const eventInfo = {
        'event': eventName[0],
        'namespace': eventName[1],
        'callback': cb,
        'options': options
    }
    return eventInfo
}

/**
 * Function to return iterable, regardless of being send selector string, nodelist or html collection.
 * @param {string|NodeList|HTMLCollection} el Selector string, Node List or HTML Collection
 */
const getIterable = (el) => {
    const els = []
    if (typeof el === `string`) { // if string, query the elements!
        el = document.querySelectorAll(el)
    }

    const isList = NodeList.prototype.isPrototypeOf(el) || HTMLCollection.prototype.isPrototypeOf(el) // eslint-disable-line no-prototype-builtins

    if (!isList) {
        els.push(el)
    } else {
        Array.prototype.forEach.call(el, el => {
            els.push(el)
        })
    }

    return els
}

const getElementFromMap = (el) => {
    return functionMap.find(o => o.element === el)
}

const getEventFromMap = (el, event) => {
    const _eventName = event.split('.')
    const _element = getElementFromMap(el)
    return _element.events.find(o => o.event === _eventName[0] && o.namespace === _eventName[1])
}

export const EventHandler = new EventHandlerClass()
