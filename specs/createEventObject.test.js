import { createEventObject } from '../src/createEventObject'

const _eventInfoWithNamespace = createEventObject(`click.test`, e => e, false)
const _eventInfoWithoutNamespace = createEventObject(`click`, e => e, false)

test(`should return an object`, () => {
    expect(typeof _eventInfoWithNamespace).toBe(`object`)
})

test(`should separate event type and namespace`, () => {
    expect(_eventInfoWithNamespace.event).toBe(`click`)
    expect(_eventInfoWithNamespace.namespace).toBe(`test`)
})

test(`should have undefined namespace if not defined`, () => {
    expect(typeof _eventInfoWithoutNamespace.namespace).toBe(`undefined`)
})

test(`should have function as callback value`, () => {
    expect(typeof _eventInfoWithNamespace.callback).toBe(`function`)
})
