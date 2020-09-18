window.addEventListener("load", startNewGame);

var currentGame;

function startNewGame() {
  currentGame = new Game();
  currentGame.shuffleDeck();
  currentGame.dealDeck();
}
