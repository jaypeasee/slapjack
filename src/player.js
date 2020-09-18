class Player {
  constructor(hand, turn, wins) {
    this.hand = hand;
    this.turn = turn;
    this.wins = wins;
    this.id = Date.now();
  }

  saveWinsToStorage() {

  }
}
