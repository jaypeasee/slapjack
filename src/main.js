var turnUpdate = document.querySelector(".turn-update");
var gameUpdate = document.querySelector(".game-update");
var gameBoard = document.querySelector(".kitty-deck")

window.addEventListener("load", startNewGame);
window.addEventListener("keydown", handlePlayerActions);

var currentGame;

function startNewGame() {
  currentGame = new Game();
  currentGame.shuffleDeck(currentGame.cardDeck);
  currentGame.dealDeck();
}

function handlePlayerActions(event) {
  if (event.key === "q" || event.key === "p") {
   currentGame.playHand(event);
   wipeDisplays();
   displaygameBoard();
 } else if (event.key === "f" || event.key === "j") {
   slapHandler(event);
 }
}

function slapHandler(event) {
  var topCard = currentGame.kitty[0].number;
  if ((topCard === 11) || (currentGame.kitty.length > 1 && topCard === currentGame.kitty[1].number) || (currentGame.kitty.length > 2 && topCard === currentGame.kitty[2].number)) {
    currentGame.slapCorrectly(event);
    wipeDisplays();
  } else {
    currentGame.slapIncorrectly(event);
  }
}

//update gameBoard on slap

function wipeDisplays() {
  gameUpdate.innerText = "";
  gameBoard.innerHTML = "";
}

function displaygameBoard() {
  var lastCardPlayed = `<img src=${currentGame.kitty[0].src} alt="Last Played Card">`;
  gameBoard.insertAdjacentHTML('afterbegin', lastCardPlayed);
  displayStatus();
}

function displayStatus() {
  if (currentGame.player1.turn) {
    turnUpdate.innerText = "Player One's Turn!";
  } else {
    turnUpdate.innerText = "Player Two's Turn!";
  }
}
