// Get all the table cells
const cells = document.querySelectorAll("td");

// Create a variable to keep track of whose turn it is
let turn = "X";

// Create a variable to keep track of the game state
let gameState = ["", "", "", "", "", "", "", "", ""];

// Function to handle cell click events
function handleCellClick(event) {
  const cell = event.target;
  const rowIndex = parseInt(cell.getAttribute("data-row"));
  const colIndex = parseInt(cell.getAttribute("data-col"));
  const cellIndex = rowIndex * 3 + colIndex;

  // Check if the clicked cell is already occupied
  if (gameState[cellIndex] !== "") {
    return;
  }

  // Update the cell with the current player's mark
  cell.setAttribute("data-value", turn);
  cell.innerText = turn;

  // Update the game state with the current player's mark
  gameState[cellIndex] = turn;

  // Check if the game is over
  if (checkForWinner()) {
    alert(`${turn} wins!`);
    resetGame();
    return;
  } else if (checkForTie()) {
    alert(`It's a tie!`);
    resetGame();
    return;
  }

  // Switch to the other player's turn
  turn = turn === "X" ? "O" : "X";
}

// Function to check if there is a winner
function checkForWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];

    if (
      gameState[a] !== "" &&
      gameState[a] === gameState[b] &&
      gameState[b] === gameState[c]
    ) {
      return true;
    }
  }

  return false;
}

// Function to check if there is a tie
function checkForTie() {
  for (let i = 0; i < gameState.length; i++) {
    if (gameState[i] === "") {
      return false;
    }
  }

  return true;
}

// Function to reset the game
function resetGame() {
  // Clear the game state
  gameState = ["", "", "", "", "", "", "", "", ""];

  // Reset the turn to X
  turn = "X";

  // Reset the board
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    cell.setAttribute("data-value", "");
    cell.innerText = "";
  }
}

// Add event listeners to all the table cells
for (let i = 0; i < cells.length; i++) {
  const cell = cells[i];
  cell.addEventListener("click", handleCellClick);
}

// Function to start a new game
function newGame() {
  resetGame();
}
