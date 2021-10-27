import * as fetching from './fetch.js'

let type = fetching.FILTERS.default_type
let sort = fetching.FILTERS.default_sort

export default () => {
  const jsFilters = document.querySelector('.js-filters')
  jsFilters.addEventListener('click', (e) => {
    e.preventDefault()

    if (e.target.dataset.showFilter) {
      const elmId = e.target.dataset.showFilter
      const optionsElm = jsFilters.querySelector(`#${elmId}`)
      optionsElm.classList.toggle('options--active')
    }

    if (e.target.dataset.filter) {
      const defaultValue =
        e.target.dataset.filter === 'type' ? fetching.FILTERS.default_type : fetching.FILTERS.default_sort
      const value = e.target.dataset.value || defaultValue
      const parentElm = e.target.closest('.selects__container')
      const optionsElm = e.target.closest('.options')
      const filterTitle = parentElm.querySelector('.js-filter-title')
      optionsElm.classList.toggle('options--active')
      filterTitle.innerText = value
      if (defaultValue === fetching.FILTERS.default_sort) sort = value.toLowerCase()
      if (defaultValue !== fetching.FILTERS.default_sort) type = value.toLowerCase()
      fetching.HTMLResponse.innerHTML = ''
      console.warn('SORTING', sort)
      fetching.initIntersection(0, type, sort)
    }
  })
}
