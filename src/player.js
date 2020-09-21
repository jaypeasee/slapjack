class Player {
  constructor(id) {
    this.turn = false;
    this.hand = [];
    this.id = id;
    this.wins = 0;
  }

  saveWinsToStorage() {
    var stringifiedWins = JSON.stringify(this.wins);
    localStorage.setItem(`${this.id}Wins`, stringifiedWins);
  }
}
