import { add, double } from './numbers'

describe('Add', () => {
  it('should add two numbers', () => {
    expect(add(2, 2)).toBe(4)
  })
})

describe('Double', () => {
  it('should double a number', () => {
    expect(double(2)).toBe(4)
  })
})
