class Game {
  constructor() {
    this.kitty = [];
    this.gameCount = 0;
    this.player1 = new Player(true, true);
    this.player2 = new Player(false, false);
    this.cardDeck = [
      { src: "./assets/blue-01.png", number: 1, color: "blue" },
      { src: "./assets/blue-02.png", number: 2, color: "blue" },
      { src: "./assets/blue-03.png", number: 3, color: "blue" },
      { src: "./assets/blue-04.png", number: 4, color: "blue" },
      { src: "./assets/blue-05.png", number: 5, color: "blue" },
      { src: "./assets/blue-06.png", number: 6, color: "blue" },
      { src: "./assets/blue-07.png", number: 7, color: "blue" },
      { src: "./assets/blue-08.png", number: 8, color: "blue" },
      { src: "./assets/blue-09.png", number: 9, color: "blue" },
      { src: "./assets/blue-10.png", number: 10, color: "blue" },
      { src: "./assets/blue-jack.png", number: 11, color: "blue" },
      { src: "./assets/blue-king.png", number: 13, color: "blue" },
      { src: "./assets/blue-queen.png", number: 12, color: "blue" },
      { src: "./assets/gold-01.png", number: 1, color: "gold" },
      { src: "./assets/gold-02.png", number: 2, color: "gold" },
      { src: "./assets/gold-03.png", number: 3, color: "gold" },
      { src: "./assets/gold-04.png", number: 4, color: "gold" },
      { src: "./assets/gold-05.png", number: 5, color: "gold" },
      { src: "./assets/gold-06.png", number: 6, color: "gold" },
      { src: "./assets/gold-07.png", number: 7, color: "gold" },
      { src: "./assets/gold-08.png", number: 8, color: "gold" },
      { src: "./assets/gold-09.png", number: 9, color: "gold" },
      { src: "./assets/gold-10.png", number: 10, color: "gold" },
      { src: "./assets/gold-jack.png", number: 11, color: "gold" },
      { src: "./assets/gold-king.png", number: 13, color: "gold" },
      { src: "./assets/gold-queen.png", number: 12, color: "gold" },
      { src: "./assets/green-01.png", number: 1, color: "green" },
      { src: "./assets/green-02.png", number: 2, color: "green" },
      { src: "./assets/green-03.png", number: 3, color: "green" },
      { src: "./assets/green-04.png", number: 4, color: "green" },
      { src: "./assets/green-05.png", number: 5, color: "green" },
      { src: "./assets/green-06.png", number: 6, color: "green" },
      { src: "./assets/green-07.png", number: 7, color: "green" },
      { src: "./assets/green-08.png", number: 8, color: "green" },
      { src: "./assets/green-09.png", number: 9, color: "green" },
      { src: "./assets/green-10.png", number: 10, color: "green" },
      { src: "./assets/green-jack.png", number: 11, color: "green" },
      { src: "./assets/green-king.png", number: 13, color: "green" },
      { src: "./assets/green-queen.png", number: 12, color: "green" },
      { src: "./assets/red-01.png", number: 1, color: "red" },
      { src: "./assets/red-02.png", number: 2, color: "red" },
      { src: "./assets/red-03.png", number: 3, color: "red" },
      { src: "./assets/red-04.png", number: 4, color: "red" },
      { src: "./assets/red-05.png", number: 5, color: "red" },
      { src: "./assets/red-06.png", number: 6, color: "red" },
      { src: "./assets/red-07.png", number: 7, color: "red" },
      { src: "./assets/red-08.png", number: 8, color: "red" },
      { src: "./assets/red-09.png", number: 9, color: "red" },
      { src: "./assets/red-10.png", number: 10, color: "red" },
      { src: "./assets/red-jack.png", number: 11, color: "red" },
      { src: "./assets/red-king.png", number: 13, color: "red" },
      { src: "./assets/red-queen.png", number: 12, color: "red" },
    ];
  }

  shuffleDeck(cards) {
    var exchangeIndex;
    var temporaryIndex;
    for (var i = cards.length -1; i > 0; i--) {
      exchangeIndex = Math.floor(Math.random() * (i + 1));
      temporaryIndex = cards[i];
      cards[i] = cards[exchangeIndex];
      cards[exchangeIndex] = temporaryIndex;
    }
    if (this.cardDeck.length === 52) {
      this.cardDeck = cards;
    } else {
      return cards;
    }
  }

  dealDeck() {
    for (var i = 0; i < this.cardDeck.length; i++) {
      if (i % 2 === 0) {
        this.player1.hand.push(this.cardDeck[i]);
      } else {
        this.player2.hand.push(this.cardDeck[i]);
      }
    }
    this.cardDeck = [];
  }

  playHand(event) {
    if (event.key === "q" && this.player1.turn) {
      this.kitty.unshift(this.player1.hand[0]);
      this.player1.hand.shift();
      this.toggleTurns(event);
    } else if (event.key === "p" && this.player2.turn) {
      this.kitty.unshift(this.player2.hand[0]);
      this.player2.hand.shift();
      this.toggleTurns(event);
    }
  }

  toggleTurns() {
    if (this.player1.turn && this.player1.hand.length > 0 && this.player2.hand.length > 0) {
      this.player1.turn = false;
      this.player2.turn = true;
    } else if (this.player2.turn && this.player1.hand.length > 0 && this.player2.hand.length > 0) {
      this.player1.turn = true;
      this.player2.turn = false;
    }
  }

  overrideTurn(event) {
    if (this.player1.hand.length === 0 && this.player1.turn) {
      this.player1.turn = false;
      this.player2.turn = true;
    } else if (this.player2.hand.length === 0 && this.player2.turn) {
      this.player2.turn = false;
      this.player1.turn = true;
    }
    this.playHand(event);
  }

  slapCorrectly(event) {
    if (event.key === "f") {
      this.player1.hand = this.player1.hand.concat(this.kitty);
      this.kitty = [];
      this.shuffleDeck(this.player1.hand);
      this.player2.turn = true;
      this.player1.turn = false;
    } else if (event.key === "j") {
      this.player2.hand = this.player2.hand.concat(this.kitty);
      this.kitty = [];
      this.shuffleDeck(this.player2.hand);
      this.player1.turn = true;
      this.player2.turn = false;
    }
  }

  gameOverSlap() {
    if (this.player1.hand.length === 0) {
      this.player2.wins++;
    } else if (this.player2.hand.length === 0) {
      this.player1.wins++;
    }
  }

  slapIncorrectly(event) {
    if (event.key === "f") {
      this.player2.hand.push(this.player1.hand[0]);
      this.player1.hand.shift();
      this.player2.turn = true;
      this.player1.turn = false;
    } else if (event.key === "j") {
      this.player1.hand.push(this.player2.hand[0]);
      this.player2.hand.shift();
      this.player1.turn = true;
      this.player2.turn = false;
    }
  }

  redealSurvivalRound(event) {
    this.playHand(event);
    if (this.player1.turn) {
      this.player1.hand = this.player1.hand.concat(this.kitty);
      this.kitty = [];
      this.shuffleDeck(this.player1.hand);
    } else if (this.player2.turn) {
      this.player2.hand = this.player2.hand.concat(this.kitty);
      this.kitty = [];
      this.shuffleDeck(this.player2.hand);
    }
  }

  resetGame() {

  }
}
