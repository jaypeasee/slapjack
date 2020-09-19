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
  if (currentGame.kitty.length > 0) {
    displaygameBoard();
  }
 } else if (event.key === "f" || event.key === "j") {
   slapHandler(event);
 }
}

function slapHandler(event) {
  var topCard = currentGame.kitty[0].number;
  if ((topCard === 11) || (currentGame.kitty.length > 1 && topCard === currentGame.kitty[1].number) || (currentGame.kitty.length > 2 && topCard === currentGame.kitty[2].number)) {
    handleCorrectSlap(event, topCard);
  } else {
    currentGame.slapIncorrectly(event);
    displayIncorrectSlap(event);
  }
}

function handleCorrectSlap(event, topCard) {
  var result = "";
  if (topCard === 11) {
    result = "SLAPJACK!"
 } else if (topCard === currentGame.kitty[1].number) {
   result = "DOUBLE!";
 } else if (topCard === currentGame.kitty[2].number) {
   result = "SANDWICH!";
 }
  currentGame.slapCorrectly(event);
  displayCorrectSlap(event, result);
}

function wipeStatusDisplays() {
  gameUpdate.innerText = "";
  gameBoard.innerHTML = "";
}

function displaygameBoard() {
  if (currentGame.player1.hand.length > 0 && currentGame.player2.hand.length > 0) {
    var lastCardPlayed = `<img src=${currentGame.kitty[0].src} alt="Last Played Card">`;
    gameBoard.insertAdjacentHTML('afterbegin', lastCardPlayed);
    displayTurnStatus();
  }
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

function displayIncorrectSlap(event) {
  wipeStatusDisplays();
  if (event.key === "f") {
    gameUpdate.innerText = "BAD SLAP! Player 1 forfeits a card to Player 2!"
  } else if (event.key === "j") {
    gameUpdate.innerText = "BAD SLAP! Player 2 forfeits a card to Player 1!"
  }
}
