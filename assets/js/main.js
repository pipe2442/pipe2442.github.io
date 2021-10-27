import initOptionSelect from './optionselect.js'
import stats from './stats.js'
import optionselect from './optionselect.js'
import * as fetching from './fetch.js'
import * as rendering from './renders.js'

document.addEventListener('DOMContentLoaded', () => {
  initOptionSelect()
  stats()
  rendering.renderOptions()
  fetching.initIntersection(optionselect.type, optionselect.sort)
})
