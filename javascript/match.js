// define the colors
const colors = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "orange",
  "pink",
  "brown",
];

// duplicate the colors to create pairs
const gameColors = colors.concat(colors);

// shuffle the colors randomly
gameColors.sort(() => 0.5 - Math.random());

// create the game board
const gameBoard = document.getElementById("game-wrapper");

for (let i = 0; i < gameColors.length; i++) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.color = gameColors[i];
  card.addEventListener("click", handleCardClick);
  gameBoard.appendChild(card);
}

let firstCard = null;
let secondCard = null;

// handle card clicks
function handleCardClick(event) {
  const card = event.target;

  if (firstCard === null) {
    firstCard = card;
    card.style.backgroundColor = card.dataset.color;
  } else if (secondCard === null && card !== firstCard) {
    secondCard = card;
    card.style.backgroundColor = card.dataset.color;

    if (firstCard.dataset.color === secondCard.dataset.color) {
      // match!
      firstCard.removeEventListener("click", handleCardClick);
      secondCard.removeEventListener("click", handleCardClick);
      firstCard = null;
      secondCard = null;
    } else {
      // no match
      setTimeout(() => {
        firstCard.style.backgroundColor = "gray";
        secondCard.style.backgroundColor = "gray";
        firstCard = null;
        secondCard = null;
      }, 1000);
    }
  }
}

// reset the game board
function resetGame() {
  gameBoard.innerHTML = "";
  gameColors.sort(() => 0.5 - Math.random());

  for (let i = 0; i < gameColors.length; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.color = gameColors[i];
    card.addEventListener("click", handleCardClick);
    gameBoard.appendChild(card);
  }

  firstCard = null;
  secondCard = null;
}
