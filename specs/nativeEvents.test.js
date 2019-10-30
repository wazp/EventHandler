import { isNative } from '../src/nativeEvents'
import TestRunner from 'jest-runner'

test(`click to be part of the native event array`, () => {
    expect(isNative(`click`)).toBe(true)
})

test(`blablabla to not be part of the native event array`, () => {
    expect(isNative(`blablabla`)).not.toBe(true)
})
