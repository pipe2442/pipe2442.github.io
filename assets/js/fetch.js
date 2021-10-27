import * as renders from './renders.js'

const HTMLResponse = document.querySelector('.js-cards-container')
const cleanScreen = (node) => node.querySelectorAll('*').forEach(n => n.remove())
const FILTERS = {
  default_sort: 'sort...',
  name_asc: 'by name (asc)',
  name_desc: 'by name (desc)',
  number_asc: 'by number (asc)',
  number_desc: 'by number (desc)',
  default_type: 'filter by type...'
}
let POKEMONS = []
const OPTIONS_FILTERS = document.querySelectorAll('.options')
const TARGET = document.querySelector('.js-observer')

const factoryPokedex = async (offset = 0, type = FILTERS.default_type, sort = FILTERS.default_sort) => {
  const getPokemonAxios = async (type) => {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=16&offset=${offset}`
    if (type !== FILTERS.default_type) {
      POKEMONS = []
      url = `https://pokeapi.co/api/v2/type/${type}`
    }

    try {
      let pokemons = []
      const res = await axios(url)
      const pokemonData = { ...res.data }
      if (type !== FILTERS.default_type) {
        pokemonData.pokemon.forEach(p => {
          pokemons.push(p.pokemon)
        })
      } else {
        pokemons = pokemonData.results
      }

      return pokemons
    } catch (error) {
      console.log(error)
    }
  }

  const pokemonsUrl = await getPokemonAxios(type)
  callPokedex(pokemonsUrl, sort, offset, type)
}

async function callPokedex (pokemonsUrl, sort, offset, type) {
  try {
    const responses = []
    pokemonsUrl.forEach(item => {
      responses.push(axios(item.url))
    })
    for await (const response of responses) {
      const pokemon = response.data
      POKEMONS.push(pokemon)
    }
    POKEMONS = renders.sortingPokemons(sort, POKEMONS, FILTERS)
    let pokeLength = POKEMONS.length
    if(offset >= pokeLength) {
      TARGET.classList.add('observer--hide')
    }
    if (type !== FILTERS.default_type) {
      for (let start = 0 + offset; start <= 15 + offset; start++) {
        const pokemon = renders.renderNewPokemon(POKEMONS[start])
        HTMLResponse.innerHTML += pokemon
      }
    } else {
      renders.renderPokemons(POKEMONS, HTMLResponse)
    }
  } catch (error) {
    console.log(error)
  }
}

async function fetchOptionsSelect () {
  const url = 'https://pokeapi.co/api/v2/type/'
  const pokemonTypes = []
  try {
    const res = await axios(url)
    res.data.results.forEach(type => {
      pokemonTypes.push(type.name)
    })
  } catch (error) {
    console.log(error)
  }
  return pokemonTypes
}

function initIntersection (offset = 0, type, sort) {
  
  const handleIntersection = (entries) => {
    entries.map((entry) => {
      if (entry.isIntersecting) {
        factoryPokedex(offset, type, sort)
        offset += 16
      };
    })
  }
  const observer = new IntersectionObserver(handleIntersection)
  observer.observe(TARGET)
  OPTIONS_FILTERS.forEach(filter => {
    filter.addEventListener('click', () => {
      observer.unobserve(TARGET)
      POKEMONS = []
    })
  })
}

export {
  initIntersection,
  fetchOptionsSelect,
  HTMLResponse,
  factoryPokedex,
  cleanScreen,
  FILTERS,
  TARGET
}
