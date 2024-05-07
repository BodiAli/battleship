import driveGame from "../drive-game.js";
import renderCells from "./render-cells.js";
import createCells from "./create-cells.js";
import choosePlayerVs from "./dom-pvs.js";

class Dom {
  static init() {
    this.game = driveGame();
    choosePlayerVs.playerVsComputer = true;
    this.getPlayers();
    this.grids = this.getGrids();
    createCells(this.player1.gameBoard, this.player2.gameBoard, this.grids.grid1, this.grids.grid2);
    this.cacheDom();
    this.bindEvents();
  }

  static getGrids() {
    const grid1 = document.querySelector("#player-grid");
    let grid2 = document.querySelector("#player2-grid");
    if (choosePlayerVs.playerVsComputer) {
      grid2 = document.querySelector("#computer-grid");
    }
    return { grid1, grid2 };
  }

  static cacheDom() {
    this.player1Cells = document.querySelectorAll("#player-grid > .cell");
    this.player2Cells = document.querySelectorAll("#player2-grid > .cell");
    if (choosePlayerVs.playerVsComputer) {
      this.player2Cells = document.querySelectorAll("#computer-grid > .cell");
    }
  }

  static bindEvents() {
    this.player2Cells.forEach((cell) => {
      cell.addEventListener("click", this.attackOpponent.bind(this));
    });
  }

  static getPlayers() {
    const players = this.game.getPlayers("bodi");
    this.player1 = players.player1;
    this.player2 = players.player2;

    this.player2.gameBoard.placeShipRandom(this.game.getShips().shipLength4);
    this.player2.gameBoard.placeShipRandom(this.game.getShips().ship1Length3);
    this.player2.gameBoard.placeShipRandom(this.game.getShips().ship2Length3);
    this.player2.gameBoard.placeShipRandom(this.game.getShips().ship1Length2);
    this.player1.gameBoard.placeShip(this.game.getShips().shipLength4, 3, 3, "vertical");
  }

  static attackOpponent(ev) {
    if (!this.isGameOver()) {
      const cell = ev.target;
      if (!cell.isHit && !cell.isAdjacent) {
        this.player2.gameBoard.receiveAttack(cell.coord.x, cell.coord.y);
        renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
        console.log(cell);
        setTimeout(() => {
          this.computerAttack();
        }, 300);
      }
      if (this.isGameOver()) {
        ev.preventDefault();
      }
    }
  }

  static computerAttack() {
    this.player1.gameBoard.receiveAttackRandom();
    console.log(this.player1.gameBoard.coordinates);
    renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
  }

  static isGameOver() {
    if (this.player1.gameBoard.isAllSunk()) {
      return true;
    }
    if (this.player2.gameBoard.isAllSunk()) {
      return true;
    }
    return false;
  }
}
Dom.init();

export default Dom;
