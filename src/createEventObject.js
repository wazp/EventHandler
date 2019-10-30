/**
 * Gives back an object detailing the event information and callback, to include in the function map
 * @param {string} event Event name, including namespace if available
 * @param {function} cb Callback function
 * @returns {object} eventInfo
 */
export const createEventObject = (event, cb, options) => {
    const eventName = event.split('.')
    const eventInfo = {
        'event': eventName[0],
        'namespace': eventName[1],
        'callback': cb,
        'options': options
    }
    return eventInfo
}
