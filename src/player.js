class Player {
  constructor(dealer, turn) {
    this.dealer = dealer;
    this.turn = turn;
    this.hand = [];
    this.wins = 0;
    this.id = Date.now();
  }

  saveWinsToStorage() {

  }
}
