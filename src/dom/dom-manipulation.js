import driveGame from "../drive-game.js";
import renderCells from "./render-cells.js";
import createCells from "./create-cells.js";
import choosePlayerVs from "./dom-pvs.js";

class Dom {
  static init() {
    this.getPlayerTurns();
    this.getShipsCount();
    this.game = driveGame();
    choosePlayerVs.playerVsComputer = true;
    this.getPlayers();
    this.grids = this.getGrids();
    createCells(this.player1.gameBoard, this.player2.gameBoard, this.grids.grid1, this.grids.grid2);
    this.cacheDom();
    this.bindEvents();
  }

  static getShipsCount() {
    this.numberOf4Ships = 1;
    this.numberOf3Ships = 2;
    this.numberOf2Ships = 3;
    this.numberOf1Ships = 4;
  }

  static getPlayerTurns() {
    this.player1Turn = true;
    this.player2Turn = false;
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
    this.gameStage = document.getElementById("game-stage");

    this.ship4 = document.getElementById("ship-4");
    this.ship3 = document.getElementById("ship-3");
    this.ship2 = document.getElementById("ship-2");
    this.ship1 = document.getElementById("ship-1");

    this.ship4Count = document.getElementById("ship-4-count");
    this.ship3Count = document.getElementById("ship-3-count");
    this.ship2Count = document.getElementById("ship-2-count");
    this.ship1Count = document.getElementById("ship-1-count");
  }

  static bindEvents() {
    this.player2Cells.forEach((cell) => {
      cell.addEventListener("click", this.attackOpponent.bind(this));
    });
    this.ship4.addEventListener("dragstart", this.takeShip4.bind(this));
    this.ship4.addEventListener("dragend", (ev) => {
      const element = ev.target;
      element.classList.remove("dragging");
    });
    this.ship3.addEventListener("dragstart", this.takeShip3.bind(this));
    this.ship3.addEventListener("dragend", (ev) => {
      const element = ev.target;
      element.classList.remove("dragging");
    });
    this.ship2.addEventListener("dragstart", this.takeShip2.bind(this));
    this.ship2.addEventListener("dragend", (ev) => {
      const element = ev.target;
      element.classList.remove("dragging");
    });
    this.ship1.addEventListener("dragstart", this.takeShip1.bind(this));
    this.ship1.addEventListener("dragend", (ev) => {
      const element = ev.target;
      element.classList.remove("dragging");
    });
  }

  static takeShip4(ev) {
    const element = ev.target;
    this.numberOf4Ships = 0;
    this.ship4Count.textContent = `${this.numberOf4Ships}x`;
    element.classList.add("dragging");
  }

  static takeShip3(ev) {
    const element = ev.target;
    this.numberOf3Ships -= 1;
    this.ship3Count.textContent = `${this.numberOf3Ships}x`;
    element.classList.add("dragging");
  }

  static takeShip2(ev) {
    const element = ev.target;
    this.numberOf2Ships -= 1;
    this.ship2Count.textContent = `${this.numberOf2Ships}x`;
    element.classList.add("dragging");
  }

  static takeShip1(ev) {
    const element = ev.target;
    this.numberOf1Ships -= 1;
    this.ship1Count.textContent = `${this.numberOf1Ships}x`;
    element.classList.add("dragging");
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
