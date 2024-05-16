import driveGame from "../drive-game.js";
import renderCells from "./render-cells.js";
import createCells from "./create-cells.js";
import Gameboard from "../factories/gameboard.js";
import choosePlayerVs from "./dom-pvs.js";

// TODO: make dragImage vertical if vertical is true

class DomPvC {
  static init() {
    this.getPlayerTurns();
    this.getShipsCount();
    this.game = driveGame();
    this.getShips();
    this.getPlayers();
    this.grids = this.getGrids();
    createCells(this.player1.gameBoard, this.player2.gameBoard, this.grids.grid1, this.grids.grid2);
    this.cacheDom();
    this.bindEvents();
  }

  static getShipsCount() {
    this.numberOfShipsLength4 = 1;
    this.numberOfShipsLength3 = 2;
    this.numberOfShipsLength2 = 3;
    this.numberOfShipsLength1 = 4;
  }

  static getPlayerTurns() {
    this.player1Turn = true;
    this.player2Turn = false;
  }

  static getGrids() {
    const grid1 = document.querySelector("#player-grid");
    const grid2 = document.querySelector("#computer-grid");

    return { grid1, grid2 };
  }

  static cacheDom() {
    this.randomizeButton = document.getElementById("p-vs-c-randomize");
    this.startButton = document.getElementById("p-vs-c-start");
    this.restartButton = document.getElementById("restart-game-p-vs-c");

    this.player1Cells = document.querySelectorAll("#player-grid > .cell");
    this.player2Cells = document.querySelectorAll("#computer-grid > .cell");

    this.gameStage = document.getElementById("game-stage");

    this.ship4 = document.getElementById("ship-4");
    this.ship3 = document.getElementById("ship-3");
    this.ship2 = document.getElementById("ship-2");
    this.ship1 = document.getElementById("ship-1");

    this.ship4Count = document.getElementById("ship-4-count");
    this.shipLength3Count = document.getElementById("ship-3-count");
    this.shipLength2Count = document.getElementById("ship-2-count");
    this.shipLength1Count = document.getElementById("ship-1-count");
  }

  static bindEvents() {
    this.restartButton.addEventListener("click", this.restartGame.bind(this));
    this.player2Cells.forEach((cell) => {
      cell.addEventListener("click", this.attackOpponent.bind(this));
    });
    this.player1Cells.forEach((cell) => {
      cell.addEventListener("dragover", this.displayShipOnBoard.bind(this));
      cell.addEventListener("drop", this.appendShip.bind(this));
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

  static appendShip(ev) {
    console.log(ev.dataTransfer.getData("text/plain"));
  }

  static displayShipOnBoard(ev) {
    ev.preventDefault();
    const cell = ev.target;
    const element = document.querySelector(".dragging");
    if (element && element.id.includes("ship-4")) {
      if (this.numberOfShipsLength4 === 0) {
        this.player1.gameBoard.removeShip(this.ships.shipLength4);
        this.player1.gameBoard.placeShip(this.ships.shipLength4, cell.coord.x, cell.coord.y, "horizontal");
      }
      renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
    } else if (element && element.id.includes("ship-3")) {
      if (this.numberOfShipsLength3 === 1) {
        this.player1.gameBoard.removeShip(this.ships.ship1Length3);
        this.player1.gameBoard.placeShip(this.ships.ship1Length3, cell.coord.x, cell.coord.y, "horizontal");
      } else if (this.numberOfShipsLength3 === 0) {
        this.player1.gameBoard.removeShip(this.ships.ship2Length3);
        this.player1.gameBoard.placeShip(this.ships.ship2Length3, cell.coord.x, cell.coord.y, "horizontal");
      }
      renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
    } else if (element && element.id.includes("ship-2")) {
      if (this.numberOfShipsLength2 === 2) {
        this.player1.gameBoard.removeShip(this.ships.ship1Length2);
        this.player1.gameBoard.placeShip(this.ships.ship1Length2, cell.coord.x, cell.coord.y, "horizontal");
      } else if (this.numberOfShipsLength2 === 1) {
        this.player1.gameBoard.removeShip(this.ships.ship2Length2);
        this.player1.gameBoard.placeShip(this.ships.ship2Length2, cell.coord.x, cell.coord.y, "horizontal");
      } else if (this.numberOfShipsLength2 === 0) {
        this.player1.gameBoard.removeShip(this.ships.ship3Length2);
        this.player1.gameBoard.placeShip(this.ships.ship3Length2, cell.coord.x, cell.coord.y, "horizontal");
      }
      renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
    } else if (element && element.id.includes("ship-1")) {
      if (this.numberOfShipsLength1 === 3) {
        this.player1.gameBoard.removeShip(this.ships.ship1Length1);
        this.player1.gameBoard.placeShip(this.ships.ship1Length1, cell.coord.x, cell.coord.y, "horizontal");
      } else if (this.numberOfShipsLength1 === 2) {
        this.player1.gameBoard.removeShip(this.ships.ship2Length1);
        this.player1.gameBoard.placeShip(this.ships.ship2Length1, cell.coord.x, cell.coord.y, "horizontal");
      } else if (this.numberOfShipsLength1 === 1) {
        this.player1.gameBoard.removeShip(this.ships.ship3Length1);
        this.player1.gameBoard.placeShip(this.ships.ship3Length1, cell.coord.x, cell.coord.y, "horizontal");
      } else if (this.numberOfShipsLength1 === 0) {
        this.player1.gameBoard.removeShip(this.ships.ship4Length1);
        this.player1.gameBoard.placeShip(this.ships.ship4Length1, cell.coord.x, cell.coord.y, "horizontal");
      }
      renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
    }
  }

  static takeShip4(ev) {
    const element = ev.target;
    if (this.numberOfShipsLength4 > -1) {
      const number = Math.max(0, (this.numberOfShipsLength4 -= 1));
      this.ship4Count.textContent = `${number}x`;
    }
    element.classList.add("dragging");
    ev.dataTransfer.setDragImage(element, 20, 20);
    ev.dataTransfer.setData("text/plain", 4);
    // eslint-disable-next-line no-param-reassign
    ev.dataTransfer.effectAllowed = "copyMove";
  }

  static takeShip3(ev) {
    const element = ev.target;
    if (this.numberOfShipsLength3 > -1) {
      const number = Math.max(0, (this.numberOfShipsLength3 -= 1));
      this.shipLength3Count.textContent = `${number}x`;
    }
    element.classList.add("dragging");
    ev.dataTransfer.setDragImage(element, 20, 20);
    ev.dataTransfer.setData("text/plain", 3);
    // eslint-disable-next-line no-param-reassign
    ev.dataTransfer.effectAllowed = "copyMove";
  }

  static takeShip2(ev) {
    const element = ev.target;
    if (this.numberOfShipsLength2 > -1) {
      const number = Math.max(0, (this.numberOfShipsLength2 -= 1));
      this.shipLength2Count.textContent = `${number}x`;
    }
    element.classList.add("dragging");
    ev.dataTransfer.setDragImage(element, 20, 20);
    ev.dataTransfer.setData("text/plain", 2);
    // eslint-disable-next-line no-param-reassign
    ev.dataTransfer.effectAllowed = "copyMove";
  }

  static takeShip1(ev) {
    const element = ev.target;
    if (this.numberOfShipsLength1 > -1) {
      const number = Math.max(0, (this.numberOfShipsLength1 -= 1));
      this.shipLength1Count.textContent = `${number}x`;
    }

    element.classList.add("dragging");
    ev.dataTransfer.setData("text/plain", 1);
    // eslint-disable-next-line no-param-reassign
    ev.dataTransfer.effectAllowed = "copyMove";
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
    this.gameStage.textContent = text;
  }

  static restartGame() {
    this.player1.gameBoard = new Gameboard();
    this.player2.gameBoard = new Gameboard();
    renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
    this.player2.gameBoard.placeShip(this.ships.shipLength4, 3, 3, "horizontal");
    this.player1.gameBoard.placeShip(this.ships.shipLength4, 1, 1, "horizontal");
    this.changeGameStage("Place your ships!");
  }

  static getShips() {
    this.ships = {
      shipLength4: this.game.getShips().shipLength4,
      ship1Length3: this.game.getShips().ship1Length3,
      ship2Length3: this.game.getShips().ship2Length3,
      ship1Length2: this.game.getShips().ship1Length2,
      ship2Length2: this.game.getShips().ship2Length2,
      ship3Length2: this.game.getShips().ship3Length2,
      ship1Length1: this.game.getShips().ship1Length1,
      ship2Length1: this.game.getShips().ship2Length1,
      ship3Length1: this.game.getShips().ship3Length1,
      ship4Length1: this.game.getShips().ship4Length1,
    };
  }

  static getPlayers() {
    const players = this.game.getPlayers("bodi");
    this.player1 = players.player1;
    this.player2 = players.player2;

    this.player2.gameBoard.placeShip(this.ships.shipLength4, 3, 3, "horizontal");
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
    this.player1.gameBoard.placeShip(this.ships.shipLength4, 1, 1, "horizontal");
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
DomPvC.init();
