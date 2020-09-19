var gameUpdate = document.querySelector(".game-update");
var gameboard = document.querySelector(".kitty-deck")

window.addEventListener("load", startNewGame);
window.addEventListener("keydown", handlePlayerActions);

var currentGame;

function startNewGame() {
  currentGame = new Game();
  currentGame.shuffleDeck(); //pass argument
  currentGame.dealDeck();
}

function handlePlayerActions(event) {
  if (event.key === "q" || event.key === "p") {
   currentGame.playHand(event);
   displayGameBoard();
 } else if (event.key === "f" || event.key === "j") {
   slapHandler(event);
 }
}

function slapHandler(event) {
  var topCard = currentGame.kitty[0].number;
  if (topCard === 11) {
    currentGame.slapCorrectly(event);
  } else if (currentGame.kitty.length > 1 && topCard === currentGame.kitty[1].number) {
    currentGame.slapCorrectly(event);
  } else if (currentGame.kitty.length > 2 && topCard === currentGame.kitty[2].number) {
    currentGame.slapCorrectly(event);
  } else {
    currentGame.slapIncorrectly(event);
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
