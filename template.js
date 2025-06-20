function mainContent(index, main, pokemonData) {
  main.innerHTML += `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3">
      <div class="card custom-card">
        <div class="${pokemonData.type1} contentSize">
          <div class="header  text-start">
            <h5 class="card-title fs-6 text-break">${pokemonData.name}</h5>
            <h5 class="card-title fs-6 ms-1">#${pokemonData.id}</h5>
          </div>
          <div class="typImg">
            <img src="${
              pokemonData.typeImg1
            }" class="card-img-top type margin" alt="">
            <img src="${
              pokemonData.typeImg2 ?? ""
            }" class="card-img-top type margin" alt="">
          
          </div>
          
          <div class="containerImg ">
            <img src="${
              pokemonData.imgFrond ?? "./img/istockphoto-1530149386-612x612.jpg"
            }" onclick="renderBigcard(${index})" class="card-img-top pokemon img-fluid" data-bs-toggle="modal" data-bs-target="#exampleModalToggle" style="cursor: pointer;">
          </div>
        </div>
      </div>
    </div>
  `;
}
function mainContentSearch(index, mainSearch, pokemonData) {
  mainSearch.innerHTML += `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3">
      <div class="card custom-card">
        <div class="${pokemonData.type1} contentSize">
          <div class="header">
            <h5 class="card-title">${pokemonData.name}</h5>
            <h5 class="card-title">#${pokemonData.id}</h5>
          </div>
          <div class="typImg">
            <img src="${
              pokemonData.typeImg1
            }" class="card-img-top type margin" alt="">
            <img src="${
              pokemonData.typeImg2 ?? ""
            }" class="card-img-top type margin" alt="">
          </div>
          
          <div class="containerImg">
            <img src="${
              pokemonData.imgFrond ?? "./img/istockphoto-1530149386-612x612.jpg"
            }" onclick="renderBigcard(${index})" class="card-img-top pokemon img-fluid" data-bs-toggle="modal" data-bs-target="#exampleModalToggle" style="cursor: pointer;">
          </div>
        </div>
      </div>
    </div>
  `;
}

function bigCard(index, pokemonData, bigCardData, card) {
  card.innerHTML = `
    <div class="close">
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>

    <div class="card custom-card ${
      pokemonData.type1 ?? "Unknown"
    } bigCardContainer overflow-hidden">
      <div class="${pokemonData.type1 ?? "Unknown"} contentSize">
        <div class="header">
          <h1 class="card-title text-break fs-3">${pokemonData.name ?? "Nameless"}</h1>
          <h1 class="card-title  fs-3">#${pokemonData.id ?? "00"}</h1>
        </div>
       <div class="play-icon"><img onclick="playCry(${pokemonData.id})" src="img/volumen.png" alt=""></div>
        <audio id="pokemonCry${pokemonData.id}" src="https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemonData.id}.ogg"></audio>
      </div>
      <img id="frond" src="${
        pokemonData.imgFrond ?? "./img/istockphoto-1530149386-612x612.jpg"
      }" class="card-img-top" alt="">
      
     <img id="back" src="${
       bigCardData.imgBack ?? "./img/istockphoto-1530149386-612x612.jpg"
     }" class="card-img-top hidden" alt="Pokemon Image">
        
      <div class="card-body">
        <div class="arrow">
          <img id="arrowLeft" onclick="findNextLowerIndex(${index})" src="./img/linker-pfeil.png">
          <img id ="arrowTurn" onclick="togglePokemonVisibility()" src="./img/ruckgangig-machen.png">
          <img id="arrowRight" src="./img/rechter-pfeil.png" onclick="findNextHigherIndex(${index})">
        </div>

        <ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Home</button>
  </li>
  <li class="nav-item ms-3" role="presentation">
    <button class="nav-link" id="stats-tab" data-bs-toggle="tab" data-bs-target="#stats-tab-pane" type="button" role="tab" aria-controls="stats-tab-pane" aria-selected="false">Stats</button>
  </li>
</ul>
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
          <div class="bigCardInfo">
          <h5 class="card-title">HP ${bigCardData.hp ?? "00"}</h5>
          <div class="typeBigCard">
            <img src="${
              pokemonData.typeImg1 ?? "Unknown"
            }" class="card-img-top type" alt="">
            <img src="${
              pokemonData.typeImg2 ?? ""
            }" class="card-img-top type" alt="">
          </div>
        </div>
        <ul>
          <li>
            <h6>${bigCardData.moveName1 ?? "Unknown"}</h6>
            <h6 class="power">Power ${bigCardData.power1 ?? 0}</h6>
          </li>
          <li>
            <p class="card-text overflow-y-auto">${bigCardData.effekt1 ?? "Unknown"}</p>
          </li>
        </ul>
      </div>
    </div>
  
  <div class="tab-pane fade mt-4" id="stats-tab-pane" role="tabpanel" aria-labelledby="stats-tab" tabindex="0">
<div class="mt-2">Height: ${pokemonData.height} dm</div>
<div class="mt-2">Weight: ${pokemonData.weight} hg</div>
<div class="mt-2">Base Experience: ${pokemonData.base_experience} EP</div>

</div>
  
  </div>

  `;
}
