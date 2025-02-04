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
