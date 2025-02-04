const log = (msg) => console.log(msg);

document.addEventListener("DOMContentLoaded", () => {
  oGameData.init();
});

document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();

  let validateForm = document.getElementById("form");
  let errorMessage = document.querySelector("div.error-message p");
  let formData = new FormData(validateForm);

  oGameData.trainerName = formData.get("nick");
  oGameData.trainerAge = formData.get("age");
  oGameData.trainerGender = formData.get("gender");

  if (oGameData.trainerName.length < 5 || oGameData.trainerName.length > 10) {
    errorMessage.textContent =
      "Tränarens namn måste vara mellan 5-10 tecken långt";
    return;
  } else if (oGameData.trainerAge < 10 || oGameData.trainerAge > 15) {
    errorMessage.textContent = "Tränaren måste vara mellan 10-15 år gammal";
    return;
  } else if (oGameData.trainerGender === null) {
    errorMessage.textContent = "Du måste välja om du är en pojke eller flicka";
    return;
  }

  startGame();
});

// starta spelet efter valideringen har lyckats, dölj formuläret och visa spelet.

function startGame() {
  let gameField = document.querySelector("#gameField");
  let audio = document.querySelector("audio");

  document.querySelector("#formWrapper").classList.add("d-none");
  gameField.classList.remove("intro-bg");
  gameField.classList.add("start-bg");
  // audio.play();
  loadPokemons();
  setInterval(movePokemons, 3000);
  tryToCatchPokemons();
}

function loadPokemons() {
  // Laddar ner pokemons från mina assets.
  for (let i = 0; i < 10; i++) {
    let number = Math.floor(Math.random() * 151) + 1;
    let pokemonNumber = String(number).padStart(3, "0");
    let url = `assets/pokemons/${pokemonNumber}.png`;
    let img = document.createElement("img");
    let isCaught = false;
    let xValue = oGameData.getLeftPosition();
    let yValue = oGameData.getTopPosition();

    img.src = url;
    img.id = number;
    img.width = 300;
    img.height = 300;
    img.style.position = "absolute";
    img.style.transform = `translate(${xValue}px, ${yValue}px)`;

    oGameData.pokemonNumbers.push({ number, img, isCaught, url }); // Skapat en objekt här av olika properties, samma properties men olika värden. Detta objekt pushas in i arrayen pokemonNumbers.
    gameField.appendChild(img); // Lägger till img i gameField.
  }
}

function tryToCatchPokemons() {
  oGameData.pokemonNumbers.forEach((pokemon) => {
    pokemon.img.addEventListener("mouseover", () => {
      if (pokemon.isCaught) {
        pokemon.isCaught = false;
        oGameData.nmbrOfCaughtPokemons--;
        pokemon.img.src = pokemon.url;
      } else {
        pokemon.isCaught = true;
        oGameData.nmbrOfCaughtPokemons++;
        pokemon.img.src = `assets/ball.webp`;

        // Timern startas när första är infångad
        if (oGameData.nmbrOfCaughtPokemons === 1 && !startTime) {
          startTime = Date.now();
          console.log("Timer starts!");
        }

        // När 10 är fångade stoppas timern
        if (oGameData.nmbrOfCaughtPokemons === 10) {
          let endTime = Date.now();
          let totalTime = ((endTime - startTime) / 1000).toFixed(2); //Sekunder visas med två decimaler

          console.log(`Total time: ${totalTime} seconds!`);

          //saveHighScore(totalTime); Här kan en "saveHighScore" funktion skapas
        }
      }
    });
  });
}

function movePokemons() {
  // Flyttar pokemons slumpmässigt på skärmen.
  if (oGameData.nmbrOfCaughtPokemons === 10) {
    return;
  }
  oGameData.pokemonNumbers.forEach((pokemon) => {
    let xValue = oGameData.getLeftPosition();
    let yValue = oGameData.getTopPosition();
    pokemon.img.style.transform = `translate(${xValue}px, ${yValue}px)`;
  });
}