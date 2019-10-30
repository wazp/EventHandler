/**
 * Function to return iterable, regardless of being sent selector string, nodelist or html collection.
 * @param {string|NodeList|HTMLCollection} el Selector string, Node List or HTML Collection
 */
export const getIterable = (el) => {
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
