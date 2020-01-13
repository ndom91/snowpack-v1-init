import { add as addRamda } from 'ramda'

type doubleType = (value: number) => number
export const double: doubleType = value => {
  return value * 2
}

type addType = (first: number, second: number) => number
export const add: addType = (first, second) => {
  return addRamda(first, second)
}
