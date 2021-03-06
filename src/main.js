var turnUpdate = document.querySelector('.turn-update');
var gameUpdate = document.querySelector('.game-update');
var gameBoard = document.querySelector('.kitty-deck');
var playerOneDeck = document.querySelector('.player-one-deck');
var playerTwoDeck = document.querySelector('.player-two-deck');

window.addEventListener('load', startNewGame);
window.addEventListener('keydown', handlePlayerActions);

var currentGame;

function startNewGame() {
  if (!currentGame) {
    currentGame = new Game();
  }
  retrieveLocalStorage();
  currentGame.determineDealer();
  currentGame.shuffleDeck(currentGame.cardDeck);
  currentGame.dealDeck();
}

function retrieveLocalStorage() {
  var storedPlayer1Wins = localStorage.getItem('player1Wins');
  var storedPlayer2Wins = localStorage.getItem('player2Wins');
  var parsedPlayer1Wins = JSON.parse(storedPlayer1Wins);
  var parsedPlayer2Wins = JSON.parse(storedPlayer2Wins);
  resetPlayerDecks();
}

function resetPlayerDecks() {
  playerOneDeck.children[0].classList.remove('hidden');
  playerTwoDeck.children[0].classList.remove('hidden');
  playerOneDeck.children[2].innerText = `${currentGame.player1.wins} Wins`;
  playerTwoDeck.children[2].innerText = `${currentGame.player2.wins} Wins`;
}

function handlePlayerActions(event) {
  if (event.key === 'q' || event.key === 'p') {
    handleTurn(event);
 } else if (event.key === 'f' || event.key === 'j') {
   handleSlap(event);
 }
}

function handleTurn(event) {
  if ((currentGame.player1.hand.length === 1 && currentGame.player2.hand.length === 0) || (currentGame.player1.hand.length === 0 && currentGame.player2.hand.length === 1)) {
    currentGame.redealSurvivalRound(event);
    displaySurvivalRedeal();
  }
  else if (currentGame.player1.hand.length === 0 || currentGame.player2.hand.length === 0) {
    currentGame.overrideTurn(event);
    resetGameBoard();
  } else {
    currentGame.playHand(event);
    resetGameBoard();
  }
  if (currentGame.kitty.length > 0) {
    displaygameBoard();
  }
}

function handleSlap(event) {
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
  if ((topCard === 11 && currentGame.player1.hand.length === 0 && event.key === 'f') || (topCard === 11 && currentGame.player2.hand.length === 0 && event.key === 'j')) {
    handleCorrectSlap(event, topCard);
    resetPlayerDecks();
  } else if ((topCard === 11 && currentGame.player2.hand.length === 0 && event.key === 'f') || (topCard === 11 && currentGame.player1.hand.length === 0 && event.key === 'j') || (currentGame.player1.hand.length === 0 && event.key === 'f') || (currentGame.player2.hand.length === 0 && event.key === 'j')) {
    currentGame.gameOverSlap();
    displayGameOver();
  } else if ((currentGame.player1.hand.length === 0 && event.key === 'j') || (currentGame.player2.hand.length === 0 && event.key === 'f')) {
    currentGame.slapIncorrectly(event);
    displayIncorrectSlap(event);
    resetPlayerDecks();
  }
}

function handleCorrectSlap(event, topCard) {
  var result = '';
  if (topCard === 11) {
    result = 'SLAPJACK!';
 } else if (topCard === currentGame.kitty[1].number) {
   result = 'DOUBLE!';
 } else if (topCard === currentGame.kitty[2].number) {
   result = 'SANDWICH!';
 }
  currentGame.slapCorrectly(event);
  displayTurnStatus();
  displayCorrectSlap(event, result);
}

function displaygameBoard() {
    resetGameBoard();
    var lastCardPlayed = `<img src=${currentGame.kitty[0].src} alt="Last Played Card" class="current-card">`;
    gameBoard.insertAdjacentHTML('afterbegin', lastCardPlayed);
    displayTurnStatus();
  if (currentGame.player1.hand.length < 1 || currentGame.player2.hand.length < 1) {
    displaySurvivalRound();
  }
}

function resetGameBoard() {
  gameUpdate.innerText = '';
  gameBoard.innerHTML = '';
}

function displaySurvivalRound() {
  if (currentGame.player1.hand.length === 0) {
    playerOneDeck.children[0].classList.add('hidden');
  } else if (currentGame.player2.hand.length === 0) {
    playerTwoDeck.children[0].classList.add('hidden');
  }
}

function displayTurnStatus() {
  gameUpdate.innerText = '';
  if (currentGame.player1.turn) {
    turnUpdate.innerText = "Player One's Turn!";
  } else {
    turnUpdate.innerText = "Player Two's Turn!";
  }
}

function displayDealerStatus() {
  gameUpdate.innerText = '';
  if (currentGame.player1.turn) {
    turnUpdate.innerText = 'Player One Starts!';
  } else {
    turnUpdate.innerText = 'Player Two Starts!';
  }
}

function displayCorrectSlap(event, result) {
  resetGameBoard();
  gameUpdate.innerText = '';
  if (event.key === 'f') {
    gameUpdate.innerText = `${result} Player 1 takes the pile!`;
  } else if (event.key === 'j') {
    gameUpdate.innerText = `${result} Player 2 takes the pile!`;
  }
  resetPlayerDecks();
}

function displayIncorrectSlap(event) {
  displaygameBoard();
  if (event.key === 'f') {
    gameUpdate.innerText = 'BAD SLAP! Player 1 forfeits a card to Player 2!';
  } else if (event.key === 'j') {
    gameUpdate.innerText = 'BAD SLAP! Player 2 forfeits a card to Player 1!';
  }
}

function displaySurvivalRedeal() {
  resetGameBoard();
  if (currentGame.player1.turn) {
    gameUpdate.innerText = 'REDEAL! Player One Takes the Pile!';
  } else if (currentGame.player2.turn) {
    gameUpdate.innerText = 'REDEAL! Player Two Takes the Pile!';
  }
}

function displayGameOver() {
  resetPlayerDecks();
  if (currentGame.player1.hand.length === 0) {
    gameUpdate.innerText = 'Player Two Wins!';
    playerOneDeck.children[0].classList.add('hidden');
  } else if (currentGame.player2.hand.length === 0) {
    gameUpdate.innerText = 'Player One Wins!';
    playerTwoDeck.children[0].classList.add('hidden');
  }
  pauseGame();
}

function pauseGame() {
  var timeout = setInterval(stopPause, 1000);
  var counter = 0;

  function stopPause() {
    counter++;
    if (counter === 3) {
      clearInterval(timeout);
      resetGame();
    }
  }
}

function resetGame() {
  currentGame.collectCards();
  startNewGame();
  resetPlayerDecks();
  resetGameBoard();
  displayDealerStatus();
}
