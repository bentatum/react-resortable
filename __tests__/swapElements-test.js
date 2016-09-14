
import { default as expect } from 'expect'
import { default as swapArrayElements } from '../src/swapArrayElements'

describe('swap elements in array', () => {
  const items = ['Gold', 'Crimson', 'Hotpink', 'Blueviolet', 'Cornflowerblue']

  it('swaps two elements based on indexFrom and indexTo', () => {
    expect(swapArrayElements(items, 1, 2)).toEqual(['Gold', 'Hotpink', 'Crimson', 'Blueviolet', 'Cornflowerblue'])
  })

  it('leaves array the same if indexFrom and indexTo are the same', () => {
    expect(swapArrayElements(items, 0, 0)).toEqual(items)
  })
})
