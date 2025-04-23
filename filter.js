function handleInput(event) {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    const query = event.target.value.trim().toLowerCase();
    if (query.length >= 3) {
      const filteredPokemons = filterPokemons(query);
      displayPokemons(filteredPokemons);
    } else {
      document.getElementById("mainContainerSearch").innerHTML =
        '<div class="nothingFoundContainer"><h1>Nothing Found</h1></div>';
    }
  }, 300);
}

function filterPokemons(query) {
  return pokemons
    .filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 10);
}

async function displayPokemons(filteredPokemons) {
  const spinner = document.getElementById("loadingSpinner");
  spinner.style.display = "flex";

  if (filteredPokemons.length === 0) {
    const mainSearch = document.getElementById("mainContainerSearch");
    mainSearch.innerHTML =
      '<div class="nothingFoundContainer"><h1>Nothing Found</h1></div>';
    searchIndex = true;
    toggleMain();
    spinner.style.display = "none";
    return;
  }

  initializeSearchArea();
  sortFilteredPokemons(filteredPokemons);
  await processFilteredPokemons(filteredPokemons);
  spinner.style.display = "none";
}

function initializeSearchArea() {
  const mainSearch = document.getElementById("mainContainerSearch");
  mainSearch.innerHTML = "";
  SearchPokemons.length = 0;
}

function sortFilteredPokemons(filteredPokemons) {
  filteredPokemons.sort((a, b) => pokemons.indexOf(a) - pokemons.indexOf(b));
}

async function processFilteredPokemons(filteredPokemons) {
  for (const pokemon of filteredPokemons) {
    let actualIndex = pokemons.indexOf(pokemon);
    SearchPokemons.push(actualIndex);
    await load(actualIndex);
  }
}
