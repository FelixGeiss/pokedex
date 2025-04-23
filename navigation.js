let currentIndex = 0;
let searchIndex = false;
let counter = 0;

function findNextHigherIndex(value) {
  let largerValues = SearchPokemons.filter((num) => num > value);

  if (searchIndex === true) {
    handleSearchIndexTrue(largerValues);
  } else {
    handleSearchIndexFalse(value);
  }
}

function handleSearchIndexTrue(largerValues) {
  let naechsterGroessererWert = Math.min(...largerValues);

  if (naechsterGroessererWert === Infinity) {
    disableArrowRaigt()
  } else {
    renderBigcard(naechsterGroessererWert);
  }
}

function handleSearchIndexFalse(value) {
  let nextIndex = value + 1;

  if (nextIndex >= counter) {
    renderMore();
    deactivateImage(nextIndex);
  } else {
    renderBigcard(nextIndex);
  }
}

function deactivateImage(nextIndex) {
  let arrowImg = document.getElementById("arrowRight");
  
  arrowImg.classList.add("disabled");
  arrowImg.onclick = null;
  arrowImg.style.pointerEvents = "none";
  setTimeout(function () {
    arrowImg.classList.remove("disabled");
    renderBigcard(nextIndex);
  }, 2000);
}

function findNextLowerIndex(value) {
  let smallerValues = SearchPokemons.filter((num) => num < value);
  if (searchIndex === true) {
    let nextSmallerValue = Math.max(...smallerValues);
    if (nextSmallerValue === -Infinity) {
      disableArrowLeft()
    } else {
      renderBigcard(nextSmallerValue);
    }
  } else {
    if (value===0) {
      disableArrowLeft()
    } else {
      let previousIndex = value - 1;
      renderBigcard(previousIndex);
    }
  }
  
}

function disableArrowLeft(){ 
  let arrowImg = document.getElementById("arrowLeft");
  arrowImg.classList.add("disabled");
  arrowImg.onclick = null;
  arrowImg.style.pointerEvents = "none";
}

function disableArrowRaigt(){
  let arrowImg = document.getElementById("arrowRight");
  arrowImg.classList.add("disabled");
  arrowImg.onclick = null;
  arrowImg.style.pointerEvents = "none";
}

