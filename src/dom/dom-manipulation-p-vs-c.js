import driveGame from "../drive-game.js";
import renderCells from "./render-cells.js";
import createCells from "./create-cells.js";
import Gameboard from "../factories/gameboard.js";
import choosePlayerVs from "./dom-pvs.js";
import toggleSound from "../toggle-sound.js";
import SoundEffect from "../play-audio.js";

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
    this.clearButton = document.getElementById("p-vs-c-clear");
    this.startButton = document.getElementById("p-vs-c-start-game");

    this.restartButton = document.getElementById("restart-game-p-vs-c");

    this.player1Cells = document.querySelectorAll("#player-grid > .cell");
    this.player2Cells = document.querySelectorAll("#computer-grid > .cell");

    this.gameStage = document.getElementById("game-stage");

    this.ship4 = document.getElementById("ship-4");
    this.ship3 = document.getElementById("ship-3");
    this.ship2 = document.getElementById("ship-2");
    this.ship1 = document.getElementById("ship-1");

    this.shipLength4Count = document.getElementById("ship-4-count");
    this.shipLength3Count = document.getElementById("ship-3-count");
    this.shipLength2Count = document.getElementById("ship-2-count");
    this.shipLength1Count = document.getElementById("ship-1-count");

    this.mainMenu = document.getElementById("main-menu");
  }

  static bindEvents() {
    this.restartButton.addEventListener("click", this.restartGame.bind(this));

    this.randomizeButton.addEventListener("click", this.randomShipPlacement.bind(this));

    this.clearButton.addEventListener("click", this.clearBoard.bind(this));

    this.startButton.addEventListener("click", this.startGame.bind(this));

    this.player2Cells.forEach((cell) => {
      cell.addEventListener("click", this.attackOpponent.bind(this));
    });
    this.player1Cells.forEach((cell) => {
      cell.addEventListener("dragover", this.displayShipOnBoard.bind(this));
      cell.addEventListener("drop", this.appendShip.bind(this));
      cell.addEventListener("click", this.changeDirection.bind(this));
    });

    this.ship4.addEventListener("dragstart", this.takeShip4.bind(this));
    this.ship4.addEventListener("dragend", (ev) => {
      const element = ev.target;
      if (!this.shipLength4Placed) {
        this.numberOfShipsLength4 += 1;
        this.shipLength4Count.textContent = `${this.numberOfShipsLength4}x`;
      }
      element.classList.remove("dragging");
      renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
    });

    this.ship3.addEventListener("dragstart", this.takeShip3.bind(this));
    this.ship3.addEventListener("dragend", (ev) => {
      const element = ev.target;
      if (!this.shipLength3Placed) {
        this.numberOfShipsLength3 += 1;
        this.shipLength3Count.textContent = `${this.numberOfShipsLength3}x`;
      }
      element.classList.remove("dragging");
      renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
    });

    this.ship2.addEventListener("dragstart", this.takeShip2.bind(this));
    this.ship2.addEventListener("dragend", (ev) => {
      const element = ev.target;
      if (!this.shipLength2Placed) {
        this.numberOfShipsLength2 += 1;
        this.shipLength2Count.textContent = `${this.numberOfShipsLength2}x`;
      }
      element.classList.remove("dragging");
      renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
    });

    this.ship1.addEventListener("dragstart", this.takeShip1.bind(this));
    this.ship1.addEventListener("dragend", (ev) => {
      const element = ev.target;
      if (!this.shipLength1Placed) {
        this.numberOfShipsLength1 += 1;
        this.shipLength1Count.textContent = `${this.numberOfShipsLength1}x`;
      }
      element.classList.remove("dragging");
      renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
    });

    this.mainMenu.addEventListener("click", this.returnToMainMenu.bind(this));
  }

  static appendShip(ev) {
    const cell = ev.target;
    const element = document.querySelector(".dragging");
    if (element && element.id.includes("ship-4")) {
      if (this.numberOfShipsLength4 === 0) {
        const isPlaced = this.player1.gameBoard.placeShip(
          this.player1Ships.p1ShipLength4,
          cell.coord.x,
          cell.coord.y,
          "horizontal"
        );
        if (isPlaced) {
          this.shipLength4Placed = true;
        }
      }
    } else if (element && element.id.includes("ship-3")) {
      if (this.numberOfShipsLength3 === 1) {
        const isPlaced = this.player1.gameBoard.placeShip(
          this.player1Ships.p1Ship1Length3,
          cell.coord.x,
          cell.coord.y,
          "horizontal"
        );
        if (isPlaced) {
          this.shipLength3Placed = true;
        }
      } else if (this.numberOfShipsLength3 === 0) {
        const isPlaced = this.player1.gameBoard.placeShip(
          this.player1Ships.p1Ship2Length3,
          cell.coord.x,
          cell.coord.y,
          "horizontal"
        );
        if (isPlaced) {
          this.shipLength3Placed = true;
        }
      }
    } else if (element && element.id.includes("ship-2")) {
      if (this.numberOfShipsLength2 === 2) {
        const isPlaced = this.player1.gameBoard.placeShip(
          this.player1Ships.p1Ship1Length2,
          cell.coord.x,
          cell.coord.y,
          "horizontal"
        );
        if (isPlaced) {
          this.shipLength2Placed = true;
        }
      } else if (this.numberOfShipsLength2 === 1) {
        const isPlaced = this.player1.gameBoard.placeShip(
          this.player1Ships.p1Ship2Length2,
          cell.coord.x,
          cell.coord.y,
          "horizontal"
        );
        if (isPlaced) {
          this.shipLength2Placed = true;
        }
      } else if (this.numberOfShipsLength2 === 0) {
        const isPlaced = this.player1.gameBoard.placeShip(
          this.player1Ships.p1Ship3Length2,
          cell.coord.x,
          cell.coord.y,
          "horizontal"
        );
        if (isPlaced) {
          this.shipLength2Placed = true;
        }
      }
    } else if (element && element.id.includes("ship-1")) {
      if (this.numberOfShipsLength1 === 3) {
        const isPlaced = this.player1.gameBoard.placeShip(
          this.player1Ships.p1Ship1Length1,
          cell.coord.x,
          cell.coord.y,
          "horizontal"
        );
        if (isPlaced) {
          this.shipLength1Placed = true;
        }
      } else if (this.numberOfShipsLength1 === 2) {
        const isPlaced = this.player1.gameBoard.placeShip(
          this.player1Ships.p1Ship2Length1,
          cell.coord.x,
          cell.coord.y,
          "horizontal"
        );
        if (isPlaced) {
          this.shipLength1Placed = true;
        }
      } else if (this.numberOfShipsLength1 === 1) {
        const isPlaced = this.player1.gameBoard.placeShip(
          this.player1Ships.p1Ship3Length1,
          cell.coord.x,
          cell.coord.y,
          "horizontal"
        );
        if (isPlaced) {
          this.shipLength1Placed = true;
        }
      } else if (this.numberOfShipsLength1 === 0) {
        const isPlaced = this.player1.gameBoard.placeShip(
          this.player1Ships.p1Ship4Length1,
          cell.coord.x,
          cell.coord.y,
          "horizontal"
        );
        if (isPlaced) {
          this.shipLength1Placed = true;
        }
      }
    }
    this.shipsPlaced();
    this.checkGameReady();
    renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
  }

  static displayShipOnBoard(ev) {
    ev.preventDefault();
    const cell = ev.target;
    const element = document.querySelector(".dragging");
    if (element && element.id.includes("ship-4")) {
      if (this.numberOfShipsLength4 === 0) {
        this.player1.gameBoard.placeShip(
          this.player1Ships.p1ShipLength4,
          cell.coord.x,
          cell.coord.y,
          "horizontal"
        );
        renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
        this.player1.gameBoard.removeShip(this.player1Ships.p1ShipLength4);
      }
    } else if (element && element.id.includes("ship-3")) {
      if (this.numberOfShipsLength3 === 1) {
        this.player1.gameBoard.placeShip(
          this.player1Ships.p1Ship1Length3,
          cell.coord.x,
          cell.coord.y,
          "horizontal"
        );
        renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
        this.player1.gameBoard.removeShip(this.player1Ships.p1Ship1Length3);
      } else if (this.numberOfShipsLength3 === 0) {
        this.player1.gameBoard.placeShip(
          this.player1Ships.p1Ship2Length3,
          cell.coord.x,
          cell.coord.y,
          "horizontal"
        );
        renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
        this.player1.gameBoard.removeShip(this.player1Ships.p1Ship2Length3);
      }
    } else if (element && element.id.includes("ship-2")) {
      if (this.numberOfShipsLength2 === 2) {
        this.player1.gameBoard.placeShip(
          this.player1Ships.p1Ship1Length2,
          cell.coord.x,
          cell.coord.y,
          "horizontal"
        );
        renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
        this.player1.gameBoard.removeShip(this.player1Ships.p1Ship1Length2);
      } else if (this.numberOfShipsLength2 === 1) {
        this.player1.gameBoard.placeShip(
          this.player1Ships.p1Ship2Length2,
          cell.coord.x,
          cell.coord.y,
          "horizontal"
        );
        renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
        this.player1.gameBoard.removeShip(this.player1Ships.p1Ship2Length2);
      } else if (this.numberOfShipsLength2 === 0) {
        this.player1.gameBoard.placeShip(
          this.player1Ships.p1Ship3Length2,
          cell.coord.x,
          cell.coord.y,
          "horizontal"
        );
        renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
        this.player1.gameBoard.removeShip(this.player1Ships.p1Ship3Length2);
      }
    } else if (element && element.id.includes("ship-1")) {
      if (this.numberOfShipsLength1 === 3) {
        this.player1.gameBoard.placeShip(
          this.player1Ships.p1Ship1Length1,
          cell.coord.x,
          cell.coord.y,
          "horizontal"
        );
        renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
        this.player1.gameBoard.removeShip(this.player1Ships.p1Ship1Length1);
      } else if (this.numberOfShipsLength1 === 2) {
        this.player1.gameBoard.placeShip(
          this.player1Ships.p1Ship2Length1,
          cell.coord.x,
          cell.coord.y,
          "horizontal"
        );
        renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
        this.player1.gameBoard.removeShip(this.player1Ships.p1Ship2Length1);
      } else if (this.numberOfShipsLength1 === 1) {
        this.player1.gameBoard.placeShip(
          this.player1Ships.p1Ship3Length1,
          cell.coord.x,
          cell.coord.y,
          "horizontal"
        );
        renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
        this.player1.gameBoard.removeShip(this.player1Ships.p1Ship3Length1);
      } else if (this.numberOfShipsLength1 === 0) {
        this.player1.gameBoard.placeShip(
          this.player1Ships.p1Ship4Length1,
          cell.coord.x,
          cell.coord.y,
          "horizontal"
        );
        renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
        this.player1.gameBoard.removeShip(this.player1Ships.p1Ship4Length1);
      }
    }
  }

  static changeDirection(ev) {
    const cell = ev.target;
    if (cell.ship) {
      const head = this.player1.gameBoard.getShipHead(cell.ship);
      this.player1.gameBoard.removeShip(cell.ship);
      if (
        !cell.ship.isVertical &&
        this.player1.gameBoard.canPlaceShip(cell.ship.length, head.x, head.y, "vertical")
      ) {
        this.player1.gameBoard.placeShip(cell.ship, head.x, head.y, "vertical");
        cell.ship.isVertical = true;
      } else if (
        cell.ship.isVertical &&
        this.player1.gameBoard.canPlaceShip(cell.ship.length, head.x, head.y, "horizontal")
      ) {
        this.player1.gameBoard.placeShip(cell.ship, head.x, head.y, "horizontal");
        cell.ship.isVertical = false;
      } else if (this.player1.gameBoard.canPlaceShip(cell.ship.length, head.x, head.y, "horizontal")) {
        this.player1.gameBoard.placeShip(cell.ship, head.x, head.y, "horizontal");
      } else if (this.player1.gameBoard.canPlaceShip(cell.ship.length, head.x, head.y, "vertical")) {
        this.player1.gameBoard.placeShip(cell.ship, head.x, head.y, "vertical");
      }
      renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
    }
  }

  static takeShip4(ev) {
    this.shipLength4Placed = false;
    const element = ev.target;
    const { dataTransfer } = ev;
    if (this.numberOfShipsLength4 > -1) {
      const number = Math.max(0, (this.numberOfShipsLength4 -= 1));
      this.shipLength4Count.textContent = `${number}x`;
    }
    element.classList.add("dragging");
    dataTransfer.setDragImage(element, 20, 20);
    dataTransfer.setData("text/plain", 4);
    dataTransfer.effectAllowed = "copyMove";
  }

  static takeShip3(ev) {
    this.shipLength3Placed = false;
    const element = ev.target;
    const { dataTransfer } = ev;
    if (this.numberOfShipsLength3 > -1) {
      const number = Math.max(0, (this.numberOfShipsLength3 -= 1));
      this.shipLength3Count.textContent = `${number}x`;
    }
    element.classList.add("dragging");
    dataTransfer.setDragImage(element, 20, 20);
    dataTransfer.setData("text/plain", 3);
    dataTransfer.effectAllowed = "copyMove";
  }

  static takeShip2(ev) {
    this.shipLength2Placed = false;
    const element = ev.target;
    const { dataTransfer } = ev;
    if (this.numberOfShipsLength2 > -1) {
      const number = Math.max(0, (this.numberOfShipsLength2 -= 1));
      this.shipLength2Count.textContent = `${number}x`;
    }
    element.classList.add("dragging");
    dataTransfer.setDragImage(element, 20, 20);
    dataTransfer.setData("text/plain", 2);
    dataTransfer.effectAllowed = "copyMove";
  }

  static takeShip1(ev) {
    this.shipLength1Placed = false;
    const element = ev.target;
    const { dataTransfer } = ev;
    if (this.numberOfShipsLength1 > -1) {
      const number = Math.max(0, (this.numberOfShipsLength1 -= 1));
      this.shipLength1Count.textContent = `${number}x`;
    }
    element.classList.add("dragging");
    dataTransfer.setDragImage(element, 20, 20);
    dataTransfer.setData("text/plain", 1);
    dataTransfer.effectAllowed = "copyMove";
  }

  static changeGameStage(text) {
    if (this.isGameOver() && this.isGameReady) {
      if (this.player2.gameBoard.isAllSunk()) {
        this.gameStage.textContent = "You Won!";
      } else if (this.player1.gameBoard.isAllSunk()) {
        this.gameStage.textContent = "Computer Won!";
      }
      return;
    }
    this.gameStage.textContent = text;
  }

  static randomShipPlacement() {
    this.player1.gameBoard = new Gameboard();

    this.player1.gameBoard.placeShipRandom(this.player1Ships.p1ShipLength4);
    this.player1.gameBoard.placeShipRandom(this.player1Ships.p1Ship1Length3);
    this.player1.gameBoard.placeShipRandom(this.player1Ships.p1Ship2Length3);
    this.player1.gameBoard.placeShipRandom(this.player1Ships.p1Ship1Length2);
    this.player1.gameBoard.placeShipRandom(this.player1Ships.p1Ship2Length2);
    this.player1.gameBoard.placeShipRandom(this.player1Ships.p1Ship3Length2);
    this.player1.gameBoard.placeShipRandom(this.player1Ships.p1Ship1Length1);
    this.player1.gameBoard.placeShipRandom(this.player1Ships.p1Ship2Length1);
    this.player1.gameBoard.placeShipRandom(this.player1Ships.p1Ship3Length1);
    this.player1.gameBoard.placeShipRandom(this.player1Ships.p1Ship4Length1);

    this.numberOfShipsLength1 = -1;
    this.numberOfShipsLength2 = -1;
    this.numberOfShipsLength3 = -1;
    this.numberOfShipsLength4 = -1;

    this.player2.gameBoard = new Gameboard();

    this.player2.gameBoard.placeShipRandom(this.player2Ships.p2ShipLength4);
    this.player2.gameBoard.placeShipRandom(this.player2Ships.p2Ship1Length3);
    this.player2.gameBoard.placeShipRandom(this.player2Ships.p2Ship2Length3);
    this.player2.gameBoard.placeShipRandom(this.player2Ships.p2Ship1Length2);
    this.player2.gameBoard.placeShipRandom(this.player2Ships.p2Ship2Length2);
    this.player2.gameBoard.placeShipRandom(this.player2Ships.p2Ship3Length2);
    this.player2.gameBoard.placeShipRandom(this.player2Ships.p2Ship1Length1);
    this.player2.gameBoard.placeShipRandom(this.player2Ships.p2Ship2Length1);
    this.player2.gameBoard.placeShipRandom(this.player2Ships.p2Ship3Length1);
    this.player2.gameBoard.placeShipRandom(this.player2Ships.p2Ship4Length1);

    this.shipLength4Count.textContent = "0x";
    this.shipLength3Count.textContent = "0x";
    this.shipLength2Count.textContent = "0x";
    this.shipLength1Count.textContent = "0x";

    this.isGameReady = true;
    this.shipsPlaced();
    this.checkGameReady();
    renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
  }

  static clearBoard() {
    this.player1.gameBoard = new Gameboard();
    this.numberOfShipsLength1 = 4;
    this.numberOfShipsLength2 = 3;
    this.numberOfShipsLength3 = 2;
    this.numberOfShipsLength4 = 1;

    this.shipLength4Count.textContent = `${this.numberOfShipsLength4}x`;
    this.shipLength3Count.textContent = `${this.numberOfShipsLength3}x`;
    this.shipLength2Count.textContent = `${this.numberOfShipsLength2}x`;
    this.shipLength1Count.textContent = `${this.numberOfShipsLength1}x`;

    this.isGameReady = false;
    this.shipsPlaced();
    this.checkGameReady();
    renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
  }

  static checkGameReady() {
    if (this.isGameReady) {
      this.startButton.classList.remove("disabled");
    } else {
      this.startButton.classList.add("disabled");
    }
  }

  static startGame(ev) {
    if (this.isGameReady) {
      this.start = true;
      this.randomizeButton.classList.add("removed");
      this.clearButton.classList.add("removed");
      ev.target.classList.add("removed");
    } else if (!this.isGameReady) {
      this.start = false;
    }
  }

  static restartGame() {
    this.isGameReady = false;
    this.start = false;
    this.player1Turn = true;
    this.player2Turn = false;
    this.player2.gameBoard = new Gameboard();
    this.clearBoard();
    this.changeGameStage("Place your ships!");

    this.randomizeButton.classList.remove("removed");
    this.clearButton.classList.remove("removed");
    this.startButton.classList.remove("removed");
  }

  static getShips() {
    this.player1Ships = this.game.getShips().player1Ships;
    this.player2Ships = this.game.getShips().player2Ships;
    this.isVertical = false;
  }

  static shipsPlaced() {
    const isShipsPlaced =
      this.player1.gameBoard.ships.length === 10 && this.player2.gameBoard.ships.length === 10;
    if (isShipsPlaced) {
      this.isGameReady = true;
      return true;
    }
    return false;
  }

  static getPlayers() {
    const players = this.game.getPlayers();
    this.player1 = players.player1;
    this.player2 = players.player2;

    this.player2.gameBoard.placeShipRandom(this.player2Ships.p2ShipLength4);
    this.player2.gameBoard.placeShipRandom(this.player2Ships.p2Ship1Length3);
    this.player2.gameBoard.placeShipRandom(this.player2Ships.p2Ship2Length3);
    this.player2.gameBoard.placeShipRandom(this.player2Ships.p2Ship1Length2);
    this.player2.gameBoard.placeShipRandom(this.player2Ships.p2Ship2Length2);
    this.player2.gameBoard.placeShipRandom(this.player2Ships.p2Ship3Length2);
    this.player2.gameBoard.placeShipRandom(this.player2Ships.p2Ship1Length1);
    this.player2.gameBoard.placeShipRandom(this.player2Ships.p2Ship2Length1);
    this.player2.gameBoard.placeShipRandom(this.player2Ships.p2Ship3Length1);
    this.player2.gameBoard.placeShipRandom(this.player2Ships.p2Ship4Length1);
  }

  static attackOpponent(ev) {
    if (this.shipsPlaced() && this.start && !this.isGameOver() && this.player1Turn) {
      const cell = ev.target;
      if (!cell.isHit && !cell.isAdjacent) {
        const shipHit = this.player2.gameBoard.receiveAttack(cell.coord.x, cell.coord.y);
        renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
        if (shipHit === true) {
          this.player2Turn = false;
          this.player1Turn = true;
          if (toggleSound.soundOn) {
            SoundEffect.playIfHit();
          }
          this.changeGameStage("Your turn!");
        } else {
          this.player2Turn = true;
          this.player1Turn = false;
          if (toggleSound.soundOn) {
            SoundEffect.playIfMiss();
          }
          this.changeGameStage("Computer's turn!");
        }

        setTimeout(() => {
          this.computerAttack();
        }, 700);
      }
    }
  }

  static async computerAttack() {
    if (!this.isGameOver() && this.player2Turn) {
      let shipHit;
      do {
        shipHit = this.player1.gameBoard.receiveAttackRandom();
        // eslint-disable-next-line no-await-in-loop
        await new Promise((resolve) => {
          setTimeout(() => {
            renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
            resolve();
          }, 700);
        });
        if (!shipHit && toggleSound.soundOn) {
          SoundEffect.playIfMiss();
        } else if (shipHit && toggleSound.soundOn) {
          SoundEffect.playIfHit();
        }
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

  static returnToMainMenu() {
    choosePlayerVs.backToMainMenu();
    this.restartGame();
  }
}
DomPvC.init();
