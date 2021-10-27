import * as fetching from "./fetch.js";

const zeroFill = (number, width) => {
  width -= number.toString().length;
  if (width > 0) {
    return new Array(width + (/\./.test(number) ? 2 : 1)).join("0") + number;
  }
  return number + "";
};

const sortingPokemons = (filterType, pokemonarray, FILTERS) => {
  if (filterType === FILTERS.name_asc) {
    pokemonarray = pokemonarray.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (filterType === FILTERS.name_desc) {
    pokemonarray = pokemonarray
      .sort((a, b) => {
        return a.name.localeCompare(b.name);
      }).reverse();
  }
  if (filterType === FILTERS.number_desc) {
    pokemonarray = pokemonarray.reverse();
  }
  return pokemonarray;
};

const renderNewPokemon = (pokemon) => {
  const secondType = pokemon.types[1] ? `${pokemon.types[1].type.name}` : "";
  return `
      <div class="card" data-id="${pokemon.id}">
        <div class="card__info">
          <img src="${
            pokemon.sprites.front_default
          }" alt="pokemon image" class="info__image">
          <div class="info__text">
            <h3 class="text__title">${pokemon.name}</h3>
            <span class="text__number">#${zeroFill(pokemon.id, 3)}</span>
          </div>
        </div>
        <div class="card__type">
          <div class="type__text">${pokemon.types[0].type.name}</div>
          <hr class="type__hr">
          <div class="type__text">${secondType}</div>
        </div>
      </div>
      `;
};

const renderPokemons = (pokemons, container) => {
  const html = pokemons.reduce((acc, cur) => {
    const pokemon = (acc += renderNewPokemon(cur));
    return pokemon;
  }, "");
  container.innerHTML = html;
};

const renderNewOption = (option) => {
  if (option === "shadow" || option === "unknown") return "<li></li>";
  return `
  <li>
    <a class="options__content" data-filter="type" data-value="${option}">
      ${option}
    </a>
  </li>
  `;
};

async function renderOptions() {
  const pokemonTypes = await fetching.fetchOptionsSelect();
  const container = document.querySelector(".js-options");
  const html = pokemonTypes.reduce((acc, cur) => {
    const option = (acc += renderNewOption(cur));
    return option;
  }, "");
  container.innerHTML += html;
}

export {
  zeroFill,
  renderNewPokemon,
  renderPokemons,
  sortingPokemons,
  renderOptions,
};
