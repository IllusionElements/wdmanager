export { lazy } from "./lazy"
export { pick } from "./pick"
export { allSettled } from "./allSettled"
export function isNull(n) {
  return n === null
}

export function isNotEmpty(arr) {
  return arr.length > 0
}