import * as fetching from './fetch.js'

let type = 'filter by type...'
let sort = 'sort..'

export default () => {
  const jsFilters = document.querySelector('.js-filters')
  jsFilters.addEventListener('click', (e) => {
    e.preventDefault()

    if (e.target.dataset.showFilter) {
      const elmId = e.target.dataset.showFilter
      const optionsElm = jsFilters.querySelector(`#${elmId}`)
      optionsElm.classList.toggle('active')
      let elmSibling = '';
      (e.target.dataset.showFilter === 'filter-by-type') 
        ? elmSibling = e.target.parentElement.nextElementSibling.querySelector('.select')
        : elmSibling = e.target.parentElement.previousElementSibling.querySelector('.select')
      const opstionSibling = jsFilters.querySelector(`#${elmSibling}`)
      opstionSibling.classList.remove('active')
      console.warn('FILTRO HERMANO', elmSibling)
    }

    if (e.target.dataset.filter) {
      const defaultValue =
        e.target.dataset.filter === 'type' ? 'Filter by type...' : 'Sort...'
      const value = e.target.dataset.value || defaultValue
      const parentElm = e.target.closest('.selects__container')
      const optionsElm = e.target.closest('.options')
      const filterTitle = parentElm.querySelector('.js-filter-title')
      optionsElm.classList.toggle('active')
      filterTitle.innerText = value
      if (defaultValue === 'Sort...') sort = value.toLowerCase()
      if (defaultValue !== 'Sort...') type = value.toLowerCase()
      fetching.HTMLResponse.innerHTML = ''
      fetching.initIntersection(0, type, sort)
    }
  })
}
