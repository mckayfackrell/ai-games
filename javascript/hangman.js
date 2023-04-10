// List of words to choose from
var words = [
  "apple",
  "banana",
  "cherry",
  "date",
  "elderberry",
  "fig",
  "grape",
  "honeydew",
  "kiwi",
  "lemon",
  "mango",
  "nectarine",
  "orange",
  "pear",
  "quince",
  "raspberry",
  "strawberry",
  "tangerine",
  "watermelon",
];

// Variables for the game
var chosenWord;
var wordArray;
var guessesLeft;
var incorrectGuesses;

// Initialize a new game
function newGame() {
  // Choose a random word
  chosenWord = words[Math.floor(Math.random() * words.length)];

  // Split the word into an array of characters
  wordArray = chosenWord.split("");

  // Initialize the number of guesses left and the list of incorrect guesses
  guessesLeft = 6;
  incorrectGuesses = [];

  // Display the word as underscores
  var wordDisplay = "";
  for (var i = 0; i < wordArray.length; i++) {
    wordDisplay += "_ ";
  }
  document.getElementById("word").innerHTML = wordDisplay;

  // Display the number of guesses remaining and the list of incorrect guesses
  document.getElementById("guesses").innerHTML = guessesLeft;
  document.getElementById("incorrect").innerHTML = incorrectGuesses.join(", ");

  // Clear the guess input field
  document.getElementById("guess").value = "";

  // Set focus to the guess input field
  document.getElementById("guess").focus();
}

function guessLetter() {
  // Get the letter the user guessed
  var letter = document.getElementById("guess").value.toLowerCase();

  // Check if the input is a letter
  if (!letter.match(/[a-z]/i)) {
    alert("Please enter a letter.");
    return;
  }

  // Check if the letter has already been guessed
  if (incorrectGuesses.indexOf(letter) !== -1) {
    alert("You've already guessed that letter. Please try again.");
    return;
  }

  // Clear the guess input field
  document.getElementById("guess").value = "";

  // Check if the letter is in the word
  var foundLetter = false;
  for (var i = 0; i < wordArray.length; i++) {
    if (wordArray[i] === letter) {
      foundLetter = true;
      document.getElementById("word").innerHTML =
        document.getElementById("word").innerHTML.substring(0, i * 2) +
        letter +
        document.getElementById("word").innerHTML.substring(i * 2 + 1);
    }
  }

  // If the letter is not in the word, decrement the number of guesses remaining and add the letter to the list of incorrect guesses
  if (!foundLetter) {
    guessesLeft--;
    incorrectGuesses.push(letter);
    document.getElementById("guesses").innerHTML = guessesLeft;
    document.getElementById("incorrect").innerHTML =
      incorrectGuesses.join(", ");
  }

  // Check if the game is over
  if (guessesLeft === 0) {
    // Disable the guess button and input field
    document.getElementById("guess").disabled = true;
    document.getElementsByTagName("button")[0].disabled = true;

    // Display a message indicating whether the player won or lost
    if (
      wordArray.join("") ===
      document.getElementById("word").innerHTML.replace(/ /g, "")
    ) {
      alert("Congratulations! You won!");
    } else {
      alert('Sorry, you lost. The word was "' + chosenWord + '".');
    }
  }

  // Set focus to the guess input field
  document.getElementById("guess").focus();
}
