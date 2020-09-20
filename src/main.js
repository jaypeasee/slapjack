var turnUpdate = document.querySelector(".turn-update");
var gameUpdate = document.querySelector(".game-update");
var gameBoard = document.querySelector(".kitty-deck");
var playerOneDeck = document.querySelector(".player-one-deck");
var playerTwoDeck = document.querySelector(".player-two-deck");

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
    turnHandler(event);
 } else if (event.key === "f" || event.key === "j") {
   slapHandler(event);
 }
}

function turnHandler(event) {
  if ((currentGame.player1.hand.length === 1 && currentGame.player2.hand.length === 0) || (currentGame.player1.hand.length === 0 && currentGame.player2.hand.length === 1)) {
    currentGame.redealSurvivalRound(event);
  }
  else if (currentGame.player1.hand.length === 0 || currentGame.player2.hand.length === 0) {
    currentGame.overrideTurn(event);
    wipeStatusDisplays();
  } else {
    currentGame.playHand(event);
    wipeStatusDisplays();
  }
  if (currentGame.kitty.length > 0) {
    displaygameBoard();
  }
}

function slapHandler(event, topCard) {
  var topCard = currentGame.kitty[0].number;
  if (currentGame.player1.hand.length === 0 || currentGame.player2.hand.length === 0) {
    handleSurvivalSlap(event, topCard);
  }
  else if ((topCard === 11) || (currentGame.kitty.length > 1 && topCard === currentGame.kitty[1].number) || (currentGame.kitty.length > 2 && topCard === currentGame.kitty[2].number)) {
    handleCorrectSlap(event, topCard);
  } else {
    currentGame.slapIncorrectly(event);
    displayTurnStatus();
    displayIncorrectSlap(event);
  }
}

function handleSurvivalSlap(event, topCard) {
  if ((topCard === 11 && currentGame.player1.hand.length === 0 && event.key === "f") || (topCard === 11 && currentGame.player2.hand.length === 0 && event.key === "j")) {
    handleCorrectSlap(event, topCard);
    resetPlayerDecks();
  } else if ((topCard === 11 && currentGame.player2.hand.length === 0 && event.key === "f") || (topCard === 11 && currentGame.player1.hand.length === 0 && event.key === "j") || (currentGame.player1.hand.length === 0 && event.key === "f") || (currentGame.player2.hand.length === 0 && event.key === "j")) {
    currentGame.gameOverSlap();
    displayGameOver();
  } else if ((currentGame.player1.hand.length === 0 && event.key === "j") || (currentGame.player2.hand.length === 0 && event.key === "f")) {
    currentGame.slapIncorrectly(event);
    displayIncorrectSlap(event);
    resetPlayerDecks();
  }
}

function displayGameOver() {
  gameBoard.innerHTML = "";
  gameUpdate.innerText = "";
  if (currentGame.player1.hand.length === 0) {
    gameUpdate.innerText = "Player Two Wins!";
  } else if (currentGame.player2.hand.length === 0) {
    gameUpdate.innerText = "Player One Wins!";
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
  displayTurnStatus();
  displayCorrectSlap(event, result);
}

function wipeStatusDisplays() {
  gameUpdate.innerText = "";
  gameBoard.innerHTML = "";
}

function displaygameBoard() {
    wipeStatusDisplays();
    var lastCardPlayed = `<img src=${currentGame.kitty[0].src} alt="Last Played Card">`;
    gameBoard.insertAdjacentHTML('afterbegin', lastCardPlayed);
    displayTurnStatus();
  if (currentGame.player1.hand.length < 1 || currentGame.player2.hand.length < 1) {
    displaySurvivalRound();
  }
}

function displaySurvivalRound() {
  if (currentGame.player1.hand.length === 0) {
    playerOneDeck.innerHTML = "";
  } else if (currentGame.player2.hand.length === 0) {
    playerTwoDeck.innerHTML = "";
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
    gameUpdate.innerText = `${result} Player 1 takes the pile!`;
  } else if (event.key === "j") {
    gameUpdate.innerText = `${result} Player 2 takes the pile!`;
  }
  resetPlayerDecks();
}

function displayIncorrectSlap(event) {
  displaygameBoard();
  if (event.key === "f") {
    gameUpdate.innerText = "BAD SLAP! Player 1 forfeits a card to Player 2!";
  } else if (event.key === "j") {
    gameUpdate.innerText = "BAD SLAP! Player 2 forfeits a card to Player 1!";
  }
}

function resetPlayerDecks() {
  var cardBack = `<img src="./assets/back.png" alt="Player Deck">`;
  playerOneDeck.innerHTML = "";
  playerTwoDeck.innerHTML = "";
  playerOneDeck.insertAdjacentHTML('afterbegin', cardBack);
  playerTwoDeck.insertAdjacentHTML('afterbegin', cardBack);
}
