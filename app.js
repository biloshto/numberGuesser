/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI elements
const game = document.querySelector("#game"),
      minNum = document.querySelector(".min-num"),
      maxNum = document.querySelector(".max-num"),
      guessBtn = document.querySelector("#guess-btn"),
      guessInput = document.querySelector("#guess-input"),
      message = document.querySelector(".message");

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener("mousedown", function(e) {
  // we want it to reload the page only if we click on the play again button
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener("click", function() {
  let guess = parseInt(guessInput.value);
  console.log(guess);

  // Validate
  // (make sure that is not blank, that is not less than the minimum or higher than the maximum; check for an NaN since we already parse it into a number and not for a string)
  if(isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}!`, "red");
  }

  //Check if won
  if (guess === winningNum) {
    // Game over - won
    gameOver(true, `${winningNum} is correct, you win!`);

    // OTHER WAY TO DO IT
    // // Disable input
    // guessInput.disabled = true;
    // // Change border color
    // guessInput.style.borderColor = "green";
    // // Set message
    // setMessage(`${winningNum} is correct, you win!`, "green");   
  } else {
    // Wrong number, substrack a guess
    guessesLeft--;

    if (guessesLeft === 0) {
    // Game over - lost
    gameOver(false, `Game over, you lost! The correct number was ${winningNum}.`)

    // OTHER WAY TO DO IT
    // // Disable input
    // guessInput.disabled = true;
    // // Change border color
    // guessInput.style.borderColor = "red";
    // // Set message
    // setMessage(`Game over, you lost! The correct number was ${winningNum}.`, "red");
    } else {
      // Game continues - answer wrong
    // gameOver(false, `${guess} is not correct. You've ${guessesLeft} guesses left.`);

    // Change border color
    guessInput.style.borderColor = "red";
    // Clear input
    guessInput.value = "";
    // Tell user it's the wrong number
    setMessage(`${guess} is not correct. You've ${guessesLeft} guesses left.`, "red");
    }
  }
});

// gameOver function
function gameOver(won, msg) {
  let color;
  won === true ? color = "green" : color = "red";

  // Disable input
  guessInput.disabled = true;
  // Change border and message color
  guessInput.style.borderColor = color;
  message.style.color = color;
  // Set message
  setMessage(msg);

  // Play again
  guessBtn.value = "Play again";
  guessBtn.className += "play-again";
}

// getRandomNum function
function getRandomNum(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

// setMessage function
function setMessage(msg, color) {
  // puts it in the paragraph and makes it red since it's an error message
  message.style.color = color;
  message.textContent = msg;
}