import initOptionSelect from './optionselect.js'
import stats from './stats.js'
import * as fetching from './fetch.js'
import optionselect from './optionselect.js'

document.addEventListener('DOMContentLoaded', () => {
  initOptionSelect()
  stats()
  fetching.initIntersection(optionselect.type, optionselect.sort)
})

console.warn('type', optionselect.type)
console.warn('sort', optionselect.sort)
