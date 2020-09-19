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
   wipeStatusDisplays();
   displaygameBoard();
 } else if (event.key === "f" || event.key === "j") {
   slapHandler(event);
 }
}

function slapHandler(event) {
  var topCard = currentGame.kitty[0].number;
  var result = "";
  if (topCard === 11) {
    result = "SLAPJACK!"
    currentGame.slapCorrectly(event);
    displayCorrectSlap(event, result);
  } else if (currentGame.kitty.length > 1 && topCard === currentGame.kitty[1].number) {
    result = "PAIR!";
    currentGame.slapCorrectly(event);
    displayCorrectSlap(event, result);
  } else if (currentGame.kitty.length > 2 && topCard === currentGame.kitty[2].number) {
    result = "SANDWICH!";
    currentGame.slapCorrectly(event);
  } else {
    result = "BAD SLAP!"
    currentGame.slapIncorrectly(event);
    displayIncorrectSlap(event, result);
  }
}

function wipeStatusDisplays() {
  gameUpdate.innerText = "";
  gameBoard.innerHTML = "";
}

function displaygameBoard() {
  var lastCardPlayed = `<img src=${currentGame.kitty[0].src} alt="Last Played Card">`;
  gameBoard.insertAdjacentHTML('afterbegin', lastCardPlayed);
  displayTurnStatus();
}

function displayTurnStatus() {
  gameUpdate.innerText = "";
  if (currentGame.player1.turn) {
    turnUpdate.innerText = "Player One's Turn!";
  } else {
    turnUpdate.innerText = "Player Two's Turn!";
  }
}

function displayCorrectSlap(event, result) {
  wipeStatusDisplays();
  gameUpdate.innerText = "";
  if (event.key === "f") {
    gameUpdate.innerText = `${result} Player 1 takes the pile!`
  } else if (event.key === "j") {
    gameUpdate.innerText = `${result} Player 2 takes the pile!`
  }
}

function displayIncorrectSlap(event, result) {
  if (event.key === "f") {

  } else if (event.key === "j") {

  }
}
