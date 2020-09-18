var gameUpdate = document.querySelector(".game-update");
var gameboard = document.querySelector(".kitty-deck")

window.addEventListener("load", startNewGame);
window.addEventListener("keydown", handlePlayerActions);

var currentGame;

function startNewGame() {
  currentGame = new Game();
  currentGame.shuffleDeck();
  currentGame.dealDeck();
}

function handlePlayerActions(event) {
  if (event.key === "q" || event.key === "p") {
   currentGame.playHand(event);
   displayGameBoard();
 } else if (event.key === "f" || event.key === "j") {
   currentGame.slap(event);
 }
}

function displayGameBoard() {
  gameboard.innerHTML = "";
  var lastCardPlayed = `<img src=${currentGame.kitty[0].src} alt="Last Played Card">`;
  gameboard.insertAdjacentHTML('afterbegin', lastCardPlayed);
  displayStatus();
}

function displayStatus() {
  if (currentGame.player1.turn) {
    gameUpdate.innerText = "Player One's Turn!";
  } else {
    gameUpdate.innerText = "Player Two's Turn!";
  }
}
