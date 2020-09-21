class Player {
  constructor(id) {
    this.turn = false;
    this.hand = [];
    this.wins = 0;
    this.id = id;
  }

  saveWinsToStorage() {
    var stringifiedWins = JSON.stringify();
    localStorage.setItem(`${this.id}Wins`, stringifiedWins);
  }
}
