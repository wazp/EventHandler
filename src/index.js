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

import { functionMap } from './functionMap.js'
import { isNative } from './nativeEvents.js'
import { getIterable } from './getIterable.js'
import { createEventObject } from './createEventObject.js'
import { getElementFromMap } from './getElementFromMap.js'
import { getEventFromMap } from './getEventFromMap.js'

class EventHandlerClass {
    constructor() {
        /**
         * List of aliases for methods. Purely a quality of living for the dev
         */
        this.on = this.addListener
        this.off = this.removeListener

        this.showMap = () => { console.log(functionMap) }
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

            console.log(`isNative: ${isNative(_event.event)}`)

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
        const _els = getIterable(el)

        _els.forEach(el => {
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

    // TODO: We need to figure out how to only trigger namespaced events etc...
    triggerEvent(el, event, eventOptions){
        const  _els = getIterable(el)
        const eventName = event.split('.')
        const options = eventOptions || {}

        const ev = new Event(eventName[0], options)

        _els.forEach(el => {
            const _el = getElementFromMap(el)

            _el.dispatchEvent(ev)
        })
    }
}

export const EventHandler = new EventHandlerClass()
