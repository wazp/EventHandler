/**
 * @jest-environment jsdom
 */

import { getIterable } from '../src/getIterable'
import { exportAllDeclaration } from '@babel/types'

document.body.innerHTML = 
    `<ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
    </ul>`

test(`should return array of elements from selector string`, () => {
    const elements = getIterable(`ul li`)

    expect(Array.isArray(elements)).toBe(true)
    expect(elements.length).toBe(6)
    expect(elements[0] instanceof HTMLElement).toBe(true)
})

test(`should return array of elements from NodeList`, () => {
    const els = document.querySelectorAll(`li`)
    const elements = getIterable(els)

    expect(NodeList.prototype.isPrototypeOf(els)).toBe(true) // is NodeList?
    expect(Array.isArray(elements)).toBe(true)
    expect(elements.length).toBe(6)
    expect(elements[0] instanceof HTMLElement).toBe(true)
})

test(`should return array of elements from HTMLCollection`, () => {
    const els = document.getElementsByTagName(`li`)
    const elements = getIterable(els)

    expect(HTMLCollection.prototype.isPrototypeOf(els)).toBe(true) // is HTMLCollection?
    expect(Array.isArray(elements)).toBe(true)
    expect(elements.length).toBe(6)
    expect(elements[0] instanceof HTMLElement).toBe(true)
})
