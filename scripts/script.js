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
let movePokemonsInterval = setInterval(movePokemons, 3000); // flyttar pokemons var 3e sekund, flyttade ut denna variabel från startgame funktionen för att kunna stoppa intervallet när spelet är över i gameover funktionen.

function startGame() {
  oGameData.init(); // Nollställer datan i oGameData(spelarens info etc.)
  let gameField = document.querySelector("#gameField");
  let audio = document.querySelector("audio");

  document.querySelector("#formWrapper").classList.add("d-none");
  gameField.classList.remove("intro-bg");
  gameField.classList.add("start-bg");
  // audio.play();
  loadPokemons();
  movePokemonsInterval;
  tryToCatchPokemons();
  oGameData.startTimeInMilliseconds(); // Startar tiden
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
  // Försöker fånga pokemons genom att hovra över dem.
  oGameData.pokemonNumbers.forEach((pokemon) => {
    pokemon.img.addEventListener("mouseover", () => {
      if (oGameData.nmbrOfCaughtPokemons === 10) {
        return; // Stop catching pokemons if game is over
      }

      if (pokemon.isCaught) {
        pokemon.isCaught = false;
        oGameData.nmbrOfCaughtPokemons--;
        pokemon.img.src = pokemon.url;
      } else {
        pokemon.isCaught = true;
        oGameData.nmbrOfCaughtPokemons++;
        pokemon.img.src = `assets/ball.webp`;
        }

        if (oGameData.nmbrOfCaughtPokemons === 10) {
          oGameData.endTimeInMilliseconds();
          log(oGameData.nmbrOfMilliseconds());
          gameOver();
        }
    });
  });
}

function movePokemons() {
  // Flyttar pokemons slumpmässigt på skärmen.
  if (oGameData.nmbrOfCaughtPokemons === 10) {
    gameOver();
    return;
  }
  oGameData.pokemonNumbers.forEach((pokemon) => {
    let xValue = oGameData.getLeftPosition();
    let yValue = oGameData.getTopPosition();
    pokemon.img.style.transform = `translate(${xValue}px, ${yValue}px)`;
  });
}

function gameOver() {
  clearInterval(movePokemonsInterval);
  showHighScore();
  document.querySelector("#high-score").classList.remove("d-none");
  let gameOverMsg = document.querySelector("#game-over");
  let milliseconds = oGameData.nmbrOfMilliseconds().toString().slice(0, 5);
  gameOverMsg.textContent = `Bra jobbat ${oGameData.trainerName}! Du fångade alla pokemons på ${milliseconds} millisekunder!`;
}

function showHighScore() {
  let highScoreList = document.querySelector("#highscore-list");
  let highScore = JSON.parse(localStorage.getItem("highScore")) || [];

  highScore.push({
    name: oGameData.trainerName,
    age: oGameData.trainerAge,
    time: oGameData.nmbrOfMilliseconds(),
  });

  // Sortera highscore-listan efter tid
  highScore.sort((a, b) => a.time - b.time);

  // Spara de 10 bästa tiderna
  highScore = highScore.slice(0, 10);

  // Uppdatera localStorage
  localStorage.setItem("highScore", JSON.stringify(highScore));

  // Visa highscore-listan

  highScore.forEach((score, index) => {
    let listItem = document.createElement("li");
    listItem.classList.add("high-score-list__item");
    listItem.textContent = `${score.name} - ${score.time} ms`;
    highScoreList.appendChild(listItem);
  });
}

// 10 slumpmässigt utvalda pokemons (av 151 stycken) skall slumpas ut på skärmen

// Användaren startar vid ett formulär och ni skall formulärvalidera följande - klar
// Tränarens namn måste vara mellan 5 och 10 tecken långt - klar
// Tränaren måste vara mellan 10 och 15 år gammal - klar
// Tränaren måste ha bockat i om hen är en pojke eller en flicka - klar
// Vid lyckad validering skall spelet starta, vid misslyckad validering meddelas användaren om exakt vad som gick snett - klar

// Under tiden spelet pågår skall spelmusik spelas - klar

// 10 slumpmässigt utvalda pokemons (av 151 stycken) skall slumpas ut på skärmen

// Bilderna skall ha en bredd och höjd på 300px.

// Var 3e sekund får varje pokemon en ny position

// När man hovrar över en pokemon så fångas den i en pokeboll
// När man hovrar över en pokeboll smiter pokemonen (måste vara samma pokemon som fångades)
// När alla pokemon fångats avslutas spelet

// Om användarens tid tar sig in på topp 10 snabbaste tider sparas hen ner i HighScore-listan i localStorage
// När HighScore-vyn dyker upp skall användaren kunna starta om spelet genom att återgå till startformuläret
