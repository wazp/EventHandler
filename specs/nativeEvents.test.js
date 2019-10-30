import { isNative } from '../src/nativeEvents'

test(`should return true when supplied event is part of our array`, () => {
    expect(isNative(`click`)).toBe(true)
})

test(`should not return true when supplied event is not part of our array`, () => {
    expect(isNative(`thisIsNotInArray`)).not.toBe(true)
})
