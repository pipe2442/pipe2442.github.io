import * as renders from './renders.js'

export default () => {
  
  const options = document.querySelectorAll('.menu__option')
  const stats = document.querySelector('.js-stats-container')
  const abilities = document.querySelector('.js-abilities-container')
  const effectiveness = document.querySelector('.js-pokemon-effectiveness')
  const infoPokemon = document.querySelectorAll('.js-info-pokemon')
  const statsContainer = document.querySelector('.js-stat-card')
  const cardsContainer = document.querySelector('.js-cards-container')
  const filters = document.querySelector('.js-filters')
  const attributescontainer = document.querySelector('.js-attributes')
  const observer = document.querySelector('.js-observer')
  const actualMenu = options[0]

  actualMenu.classList.toggle('menu__option--active__menu')
  stats.classList.toggle('info__pokemon--active_stats')

  options.forEach((option) => {
    option.addEventListener('click', () => {
      options.forEach((o) => o.classList.remove('menu__option--active__menu'))
      infoPokemon.forEach((o) => o.classList.remove('info__pokemon--active_stats'))
      option.classList.toggle('menu__option--active__menu')
      if (option.dataset.type === 'stats') {
        stats.classList.add('info__pokemon--active_stats')
      } else if (option.dataset.type === 'abilities') {
        abilities.classList.add('info__pokemon--active_stats')
      } else if (option.dataset.type === 'effectiveness') {
        effectiveness.classList.add('info__pokemon--active_stats')
      }
    })
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

  cardsContainer.addEventListener('click', (e) => {
    filters.classList.add('filters__selects--hide')
    cardsContainer.classList.add('cards__container--hide')
    observer.classList.add('observer--hide')
    attributescontainer.classList.add('pokedex__attributes--active')
    getPokemon(e.target.dataset.id)
  })
}
