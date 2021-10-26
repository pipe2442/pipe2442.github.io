import * as renders from './renders.js'

export default () => {
  const options = document.querySelectorAll('.menu__option')
  const stats = document.querySelector('.pokemon__stats')
  const abilities = document.querySelector('.pokemon__abilities')
  const effectiveness = document.querySelector('.pokemon__effectiveness')
  const infoPokemon = document.querySelectorAll('.js-info-pokemon')

  const actualMenu = options[0]
  const actualInfo = stats
  actualMenu.classList.toggle('--active__menu')
  actualInfo.classList.toggle('--active_stats')

  options.forEach((option) => {
    option.addEventListener('click', (e) => {
      options.forEach((o) => o.classList.remove('--active__menu'))
      infoPokemon.forEach((o) => o.classList.remove('--active_stats'))

      option.classList.toggle('--active__menu')

      if (option.innerText === 'Stats') {
        stats.classList.toggle('--active_stats')
      } else if (option.innerText === 'Abilities') {
        abilities.classList.toggle('--active_stats')
      } else if (option.innerText === 'Type Effectiveness') {
        effectiveness.classList.toggle('--active_stats')
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

  const abilitiesContainer = document.querySelector('.js-abilities-container')

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

  const statsContainer = document.querySelector('.js-stat-card')
  const statsInfoContainer = document.querySelector('.js-stats-container')

  const getPokemon = async (id) => {
    try {
      const res = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`)
      const pokemon = res.data

      statsContainer.innerHTML = ''
      statsContainer.innerHTML = renders.renderNewPokemon(pokemon)
      pokemon.abilities.forEach((a) => console.log(a.ability.name))
      pokemon.abilities.forEach((a) => console.log(a.ability.url))

      newStat(pokemon.stats, statsInfoContainer)
      newAbilities(pokemon.abilities, abilitiesContainer)
    } catch (error) {
      console.log(error)
    }
  }

  const cardsContainer = document.querySelector('.js-cards-container')
  const filters = document.querySelector('.js-filters')
  const attributescontainer = document.querySelector('.js-attributes')
  const observer = document.querySelector('.js-observer')

  cardsContainer.addEventListener('click', (e) => {
    filters.classList.add('active')
    cardsContainer.classList.add('active')
    observer.classList.add('active')
    attributescontainer.classList.add('show')
    getPokemon(e.target.dataset.id)
  })
}
