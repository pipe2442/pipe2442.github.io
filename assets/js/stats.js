import * as renders from './renders.js'

export default () => {
  
  const menuOption = document.querySelector('.js-info-menu')
  menuOption.addEventListener('click', function ({ target }) {
    if (target.dataset.type) {
      const tab = document.querySelector(`[data-type="${target.dataset.type}"]`)
      const tabs = document.querySelectorAll('.js-info-pokemon')
      const menuOptions = document.querySelectorAll('.js-menu-option')
      menuOptions.forEach(elm => {
        elm.classList.remove('menu__option--active')
      })
      
      tabs.forEach((elm) => {
        if(elm.dataset.action === tab.dataset.type) {
          tab.classList.add('menu__option--active')
          elm.classList.add('info__pokemon--active')
          return
        }
        elm.classList.remove('info__pokemon--active')
      })
    }
  })

  const newStat = (pokemonStats, container) => {
    pokemonStats.forEach((s) => {
      const stat = document.createElement('ul')
      stat.classList.add('stats__list')
      stat.innerHTML = `
        <li class="list__stat">${s.stat.name}</li>
        <li class="list__bar"></li>
        <li class="list__stat">${s.base_stat}</li>
      `
      stat.children[1].style.width = `${(s.base_stat * 400) / 100}px`
      container.appendChild(stat)
    })
  }

  const newAbilities = (abilities, container) => {
    abilities.forEach((a) => {
      const ability = document.createElement('div')
      ability.classList.add('abilities__details')
      ability.innerHTML = `
        <h4 class="abilities__title">${a.ability.name}</h4>
        `
      container.appendChild(ability)
      fetchAbility(a.ability.url, ability)
    })
  }

  const fetchAbility = async (url, container) => {
    try {
      const res = await axios(url)
      const ability = res.data
      const ab = ability.effect_entries[1].short_effect
      const par = document.createElement('p')
      par.classList.add('abilities__text')
      par.innerHTML = `
          <p class="abilities__text">${ab}</p>
        `
      container.appendChild(par)
    } catch (error) {
      console.log(error)
    }
  }

  const getPokemon = async (id) => {

    const stats = document.querySelector('.js-stats-container')
    const statsContainer = document.querySelector('.js-stat-card')
    const abilities = document.querySelector('.js-abilities-container')
    
    try {
      const res = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`)
      const pokemon = res.data
      statsContainer.innerHTML = ''
      statsContainer.innerHTML = renders.renderNewPokemon(pokemon)
      newStat(pokemon.stats, stats)
      newAbilities(pokemon.abilities, abilities)
    } catch (error) {
      console.log(error)
    }
  }

  const cardsContainer = document.querySelector('.js-cards-container')
  const filters = document.querySelector('.js-filters')
  const attributescontainer = document.querySelector('.js-attributes')
  const observer = document.querySelector('.js-observer')

  cardsContainer.addEventListener('click', (e) => {
    filters.classList.add('filters--hide')
    cardsContainer.classList.add('cards__container--hide')
    observer.classList.add('observer--hide')
    attributescontainer.classList.add('pokedex__attributes--active')
    getPokemon(e.target.dataset.id)
  })
}
