import driveGame from "../drive-game.js";
import renderCells from "./render-cells.js";
import createCells from "./create-cells.js";
import choosePlayerVs from "./dom-pvs.js";

class Dom {
  static init() {
    this.player1Turn = true;
    this.player2Turn = false;
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
    this.gameStage = document.getElementById("game-stage");
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

  static changeGameStage(text) {
    if (this.isGameOver()) {
      if (this.player2.gameBoard.isAllSunk()) {
        this.gameStage.textContent = "You Won!";
      } else if (this.player1.gameBoard.isAllSunk()) {
        this.gameStage.textContent = "Computer Won!";
      }
      return;
    }
    if (this.player1Turn) {
      this.gameStage.textContent = text;
    } else if (this.player2Turn) {
      this.gameStage.textContent = text;
    }
  }

  static getPlayers() {
    const players = this.game.getPlayers("bodi");
    this.player1 = players.player1;
    this.player2 = players.player2;

    this.player2.gameBoard.placeShip(this.game.getShips().shipLength4, 3, 3, "horizontal");
    // this.player2.gameBoard.placeShipRandom(this.game.getShips().ship1Length3);
    // this.player2.gameBoard.placeShipRandom(this.game.getShips().ship2Length3);
    // this.player2.gameBoard.placeShipRandom(this.game.getShips().ship1Length2);
    // this.player2.gameBoard.placeShipRandom(this.game.getShips().ship2Length2);
    // this.player2.gameBoard.placeShipRandom(this.game.getShips().ship3Length2);
    // this.player2.gameBoard.placeShipRandom(this.game.getShips().ship1Length1);
    // this.player2.gameBoard.placeShipRandom(this.game.getShips().ship2Length1);
    // this.player2.gameBoard.placeShipRandom(this.game.getShips().ship3Length1);
    // this.player2.gameBoard.placeShipRandom(this.game.getShips().ship4Length1);

    // seperator
    this.player1.gameBoard.placeShipRandom(this.game.getShips().shipLength4);
    // this.player1.gameBoard.placeShipRandom(this.game.getShips().ship1Length3);
    // this.player1.gameBoard.placeShipRandom(this.game.getShips().ship2Length3);
    // this.player1.gameBoard.placeShipRandom(this.game.getShips().ship1Length2);
    // this.player1.gameBoard.placeShipRandom(this.game.getShips().ship2Length2);
    // this.player1.gameBoard.placeShipRandom(this.game.getShips().ship3Length2);
    // this.player1.gameBoard.placeShipRandom(this.game.getShips().ship1Length1);
    // this.player1.gameBoard.placeShipRandom(this.game.getShips().ship2Length1);
    // this.player1.gameBoard.placeShipRandom(this.game.getShips().ship3Length1);
    // this.player1.gameBoard.placeShipRandom(this.game.getShips().ship4Length1);
  }

  static attackOpponent(ev) {
    if (!this.isGameOver() && this.player1Turn) {
      const cell = ev.target;
      if (!cell.isHit && !cell.isAdjacent) {
        const shipHit = this.player2.gameBoard.receiveAttack(cell.coord.x, cell.coord.y);
        renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
        if (shipHit === true) {
          this.player2Turn = false;
          this.player1Turn = true;
        } else {
          this.player2Turn = true;
          this.player1Turn = false;
        }

        this.changeGameStage("Your turn!");
        this.computerAttack();
      }
    }
  }

  static async computerAttack() {
    if (!this.isGameOver() && this.player2Turn) {
      this.changeGameStage("Computer's turn!");
      let shipHit;
      do {
        shipHit = this.player1.gameBoard.receiveAttackRandom();
        // eslint-disable-next-line no-await-in-loop
        await new Promise((resolve) => {
          setTimeout(() => {
            renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
            resolve();
          }, 300);
        });
      } while (shipHit && !this.isGameOver());
      this.player1Turn = true;
      this.player2Turn = false;
      this.changeGameStage("Your turn!");
    }
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
