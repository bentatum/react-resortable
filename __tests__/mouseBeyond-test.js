
import { default as expect } from 'expect'
import { default as isMouseBeyond } from '../src/isMouseBeyond'

describe('checks if mouse pointer has reached over the breakpoint in next element', () => {
  const elementPos = 100
  const elementSize = 400

  it('gives false if mouse is outside of next element', () => {
    const mousePos = 0
    expect(isMouseBeyond(mousePos, elementPos, elementSize)).toBe(false)
  })

  it('gives false if mouse is inside of next element, but still hasn\'t reached the breakpoint', () => {
    const mousePos = 300
    expect(isMouseBeyond(mousePos, elementPos, elementSize)).toBe(false)
  })

  it('gives true if mouse is inside of next element and has just reached the breakpoint', () => {
    const mousePos = 301
    expect(isMouseBeyond(mousePos, elementPos, elementSize)).toBe(true)
  })

  it('gives true if mouse is on the edge of next element, already over the breakpoint', () => {
    const mousePos = 500
    expect(isMouseBeyond(mousePos, elementPos, elementSize)).toBe(true)
  })
})
