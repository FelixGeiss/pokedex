const BASE_URL = "https://pokeapi.co/api/v2/";
let pokemons = [];
let SearchPokemons = [];
let debounceTimeout;

async function init() {
  await fetchPokemons();
  renderFirstPokemon();
  const searchInput = document.getElementById("Search");
  searchInput.addEventListener("input", handleInput);
}

function renderMore() {
  const button = document.getElementById("seeMore");
  button.disabled = true;
  renderFirstPokemon(counter);
}

async function renderFirstPokemon(offset = 0) {
  const spinner = document.getElementById("loadingSpinner");
  spinner.style.display = "flex";
  const seeMoreBtn = document.getElementById("seeMore");
  if (pokemons.length > 0) {
    const limit = Math.min(offset + 20, pokemons.length);
    await processPokemonRange(offset, limit);
  } else {
  }
  counter += 20;
  seeMoreBtn.classList.remove("hidden");
}

async function processPokemonRange(offset, limit) {
  for (let index = offset; index < limit; index++) {
    try {
      const pokemonData = await loadPokemonData(index);
      displayPokemon(pokemonData, index);
    } catch (error) {}
  }
  const button = document.getElementById("seeMore");
  button.disabled = false;
  const spinner = document.getElementById("loadingSpinner");
  spinner.style.display = "none";
}

function displayPokemon(pokemonData, index) {
  const main = document.getElementById("mainContainer");
  mainContent(index, main, pokemonData);
}

async function loadPokemonData(index) {
  const name = pokemons[index].name;
  const pokeData = await fetchPokeData(`/pokemon/${name}`);
  const id = pokeData.id;
  const imgFrond = pokeData.sprites.front_default;

  const { type1, type2 } = extractPokemonTypes(pokeData);
  const { typeImg1, typeImg2 } = await loadTypeImages(type1, type2);

  return { id, imgFrond, type1, type2, typeImg1, typeImg2, name };
}

function extractPokemonTypes(pokeData) {
  const types = pokeData.types.map((t) => t.type.name);
  const [type1, type2] = types;
  return { type1, type2 };
}

async function loadTypeImages(type1, type2) {
  const typeImg1 = await loadTypeImage(type1);
  const typeImg2 = type2 ? await loadTypeImage(type2) : null;
  return { typeImg1, typeImg2 };
}

async function loadPokemonData(index) {
  const name = pokemons[index].name;
  const pokeData = await fetchPokeData(`/pokemon/${name}`);
  const id = pokeData.id;
  const imgFrond = pokeData.sprites.front_default;

  const types = pokeData.types.map((t) => t.type.name);
  const [type1, type2] = types;

  const typeImg1 = await loadTypeImage(type1);
  const typeImg2 = type2 ? await loadTypeImage(type2) : null;

  return { id, imgFrond, type1, type2, typeImg1, typeImg2, name };
}

async function loadPokemonGeneralData(index) {
  const name = pokemons[index].name;
  const pokeData = await fetchPokeData(`/pokemon/${name}`);
  const hp = pokeData.stats[0].base_stat;
  const imgBack = pokeData.sprites.back_default;
  return { name, hp, imgBack, moves: pokeData.moves };
}

async function loadMoveData(move) {
  let moveName = move?.move.name || "no attack";
  let effekt = "No effect";
  let power = "0";

  if (moveName !== "no attack") {
    try {
      const moveData = await fetchPokeData(`/move/${moveName}`);
      effekt = moveData.effect_entries[0]?.effect || "No effect";
      power = moveData.power || "0";
    } catch (error) {
      moveName = "no attack";
    }
  }
  return { moveName, effekt, power };
}

async function loadPokemonDataBigCard(index) {
  const { hp, imgBack, moves } = await loadPokemonGeneralData(index);

  const move1Data = await loadMoveData(moves[0]);
  const move2Data = await loadMoveData(moves[1]);

  return {
    hp,
    imgBack,
    moveName1: move1Data.moveName,
    effekt1: move1Data.effekt,
    power1: move1Data.power,
    moveName2: move2Data.moveName,
    effekt2: move2Data.effekt,
    power2: move2Data.power,
  };
}

async function loadTypeImage(typeName) {
  const typeDetails = await fetchPokeData(`/type/${typeName}`);
  return getTypeImage(typeDetails);
}

async function fetchPokemons() {
  let offset = 0;
  const limit = 100;
  let data;
  do {
    data = await fetchPaginatedData(offset, limit);
    if (data && data.results) {
      pokemons = pokemons.concat(data.results);
    }
    offset += limit;
  } while (data && data.next);
  return pokemons;
}

async function fetchPaginatedData(offset, limit) {
  const spinner = document.getElementById("loadingSpinner");
  spinner.style.display = "flex";
  try {
    const response = await fetch(
      `${BASE_URL}pokemon/?limit=${limit}&offset=${offset}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

async function fetchPokeData(path) {
  try {
    const response = await fetch(BASE_URL + path);

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

function getTypeImage(typeDetails) {
  return (
    typeDetails.sprites?.["generation-iii"]?.colosseum?.name_icon ||
    typeDetails.sprites?.["generation-vi"]?.["x-y"]?.name_icon ||
    null
  );
}

function togglePokemonVisibility() {
  const pokemonBack = document.getElementById("back");
  const pokemonFrond = document.getElementById("frond");
  pokemonBack.classList.toggle("hidden");
  pokemonFrond.classList.toggle("hidden");
}

async function renderBigcard(index) {
  const pokemonData = await loadPokemonData(index);
  const bigCardData = await loadPokemonDataBigCard(index);
  const card = document.getElementById("closeContainer");
  bigCard(index, pokemonData, bigCardData, card);
}

async function load(index) {
  const mainSearch = document.getElementById("mainContainerSearch");

  try {
    let pokemonData = await loadPokemonData(index);
    toggleMain();
    mainContentSearch(index, mainSearch, pokemonData);
  } catch (error) {}
  searchIndex = true;
}

function toggleMain() {
  const mainSearch = document.getElementById("mainContainerSearch");
  const main = document.getElementById("mainContainer");

  const seeMoreBtn = document.getElementById("seeMore");
  const backBtn = document.getElementById("backButton");
  
  controlToggle(mainSearch, main, seeMoreBtn, backBtn);
}

function controlToggle(mainSearch, main, seeMoreBtn, backBtn) {
  if (searchIndex === true) {
    mainSearch.classList.remove("hidden");
    main.classList.add("hidden");
    backBtn.classList.remove("hidden");
    seeMoreBtn.classList.add("hidden");
    searchIndex = true;
  } else {
    mainSearch.classList.add("hidden");
    main.classList.remove("hidden");
    seeMoreBtn.classList.remove("hidden");
    backBtn.classList.add("hidden");
  }
  return;
}

function backBtnClick() {
  searchIndex = false;
  toggleMain();
}
