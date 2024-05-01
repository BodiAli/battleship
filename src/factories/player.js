import Gameboard from "./gameboard.js";

class Player {
  constructor(name = "") {
    this.gameBoard = new Gameboard();
    this.name = name;
  }
}

export default Player;
