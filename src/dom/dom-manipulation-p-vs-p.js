import driveGame from "../drive-game.js";
import renderCells from "./render-cells.js";
import createCells from "./create-cells.js";
import Gameboard from "../factories/gameboard.js";
import choosePlayerVs from "./dom-pvs.js";
import toggleSound from "../toggle-sound.js";
import SoundEffect from "../play-audio.js";
import toggleBoards from "../toggle-ships-visibility.js";

class DomPvP {
  static init() {
    choosePlayerVs.playerVsPlayer = true;
    this.game = driveGame();
    this.getPlayerTurns();
    this.getShipsCount();
    this.getShips();

    this.getPlayers();
    this.getGrids();

    createCells(this.player1.gameBoard, this.player2.gameBoard, this.grid1, this.grid2);
    this.cacheDom();
    this.bindEvents();
  }

  static getShipsCount() {
    this.numberOfShipsLength4 = 1;
    this.numberOfShipsLength3 = 2;
    this.numberOfShipsLength2 = 3;
    this.numberOfShipsLength1 = 4;

    this.p2NumberOfShipsLength4 = 1;
    this.p2NumberOfShipsLength3 = 2;
    this.p2NumberOfShipsLength2 = 3;
    this.p2NumberOfShipsLength1 = 4;
  }

  static getGrids() {
    this.grid1 = document.querySelector("#player-1-grid");
    this.grid2 = document.querySelector("#player-2-grid");

    this.player1BoardShowed = true;
    this.player2BoardShowed = false;
  }

  static cacheDom() {
    this.placeShipsParagraph = document.getElementById("place-ships-p");
    this.attackShipsParagraph = document.getElementById("attack-ships-p");

    this.playerPieces = document.querySelectorAll("#p-vs-p-boards .player-pieces");

    this.player1Container = document.getElementById("player-1-container");
    this.player2Container = document.getElementById("player-2-container");

    this.showNextPlayerBoardButton = document.getElementById("show-next");
    this.attackNextPlayerButton = document.getElementById("attack-next-player");

    this.modal = document.getElementById("modal-overlay");
    this.hideModalButton = document.getElementById("hide-placing-ships-modal");

    this.attackingModal = document.getElementById("attacking-modal-overlay");
    this.hideAttackingModalButton = document.getElementById("hide-attacking-modal");

    this.p1RandomizeButton = document.getElementById("p-1-randomize");
    this.p1ClearButton = document.getElementById("p-1-clear");
    this.p2RandomizeButton = document.getElementById("p-2-randomize");
    this.p2ClearButton = document.getElementById("p-2-clear");
    this.startButton = document.getElementById("p-vs-p-start-game");

    this.restartButton = document.getElementById("restart-game-p-vs-p");

    this.gameStage = document.getElementById("game-stage");

    this.ship4 = document.getElementById("p-1-ship-4");
    this.ship3 = document.getElementById("p-1-ship-3");
    this.ship2 = document.getElementById("p-1-ship-2");
    this.ship1 = document.getElementById("p-1-ship-1");

    this.shipLength4Count = document.getElementById("p-1-ship-4-count");
    this.shipLength3Count = document.getElementById("p-1-ship-3-count");
    this.shipLength2Count = document.getElementById("p-1-ship-2-count");
    this.shipLength1Count = document.getElementById("p-1-ship-1-count");

    this.p2Ship4 = document.getElementById("p-2-ship-4");
    this.p2Ship3 = document.getElementById("p-2-ship-3");
    this.p2Ship2 = document.getElementById("p-2-ship-2");
    this.p2Ship1 = document.getElementById("p-2-ship-1");

    this.p2ShipLength4Count = document.getElementById("p-2-ship-4-count");
    this.p2ShipLength3Count = document.getElementById("p-2-ship-3-count");
    this.p2ShipLength2Count = document.getElementById("p-2-ship-2-count");
    this.p2ShipLength1Count = document.getElementById("p-2-ship-1-count");

    this.mainMenu = document.getElementById("p-v-p-main-menu");

    this.player1Cells = document.querySelectorAll("#player-1-grid > .cell");
    this.player2Cells = document.querySelectorAll("#player-2-grid > .cell");
  }

  static bindEvents() {
    this.showNextPlayerBoardButton.addEventListener("click", this.showModal.bind(this));
    this.attackNextPlayerButton.addEventListener("click", this.showNextPlayerModal.bind(this));

    this.hideModalButton.addEventListener("click", this.showOtherPlayerBoard.bind(this));
    this.hideAttackingModalButton.addEventListener("click", this.showNextPlayerToAttackBoard.bind(this));

    this.restartButton.addEventListener("click", this.restartGame.bind(this));

    this.p1RandomizeButton.addEventListener("click", this.p1RandomShipPlacement.bind(this));

    this.p2RandomizeButton.addEventListener("click", this.p2RandomShipPlacement.bind(this));

    this.p1ClearButton.addEventListener("click", this.p1ClearBoard.bind(this));

    this.p2ClearButton.addEventListener("click", this.p2ClearBoard.bind(this));

    this.startButton.addEventListener("click", this.startGame.bind(this));

    this.player2Cells.forEach((cell) => {
      cell.addEventListener("dragover", this.p2DisplayShipOnBoard.bind(this));
      cell.addEventListener("drop", this.p2AppendShip.bind(this));
      cell.addEventListener("click", this.p2ChangeDirection.bind(this));
      cell.addEventListener("click", this.player1AttackPlayer2.bind(this));
    });
    this.player1Cells.forEach((cell) => {
      cell.addEventListener("dragover", this.displayShipOnBoard.bind(this));
      cell.addEventListener("drop", this.appendShip.bind(this));
      cell.addEventListener("click", this.changeDirection.bind(this));
      cell.addEventListener("click", this.player2AttackPlayer1.bind(this));
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

    this.p2Ship4.addEventListener("dragstart", this.p2TakeShip4.bind(this));
    this.p2Ship4.addEventListener("dragend", (ev) => {
      const element = ev.target;
      if (!this.shipLength4Placed) {
        this.p2NumberOfShipsLength4 += 1;
        this.p2ShipLength4Count.textContent = `${this.p2NumberOfShipsLength4}x`;
      }
      element.classList.remove("dragging");
      renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
    });

    this.p2Ship3.addEventListener("dragstart", this.p2TakeShip3.bind(this));
    this.p2Ship3.addEventListener("dragend", (ev) => {
      const element = ev.target;
      if (!this.shipLength3Placed) {
        this.p2NumberOfShipsLength3 += 1;
        this.p2ShipLength3Count.textContent = `${this.p2NumberOfShipsLength3}x`;
      }
      element.classList.remove("dragging");
      renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
    });

    this.p2Ship2.addEventListener("dragstart", this.p2TakeShip2.bind(this));
    this.p2Ship2.addEventListener("dragend", (ev) => {
      const element = ev.target;
      if (!this.shipLength2Placed) {
        this.p2NumberOfShipsLength2 += 1;
        this.p2ShipLength2Count.textContent = `${this.p2NumberOfShipsLength2}x`;
      }
      element.classList.remove("dragging");
      renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
    });

    this.p2Ship1.addEventListener("dragstart", this.p2TakeShip1.bind(this));
    this.p2Ship1.addEventListener("dragend", (ev) => {
      const element = ev.target;
      if (!this.shipLength1Placed) {
        this.p2NumberOfShipsLength1 += 1;
        this.p2ShipLength1Count.textContent = `${this.p2NumberOfShipsLength1}x`;
      }
      element.classList.remove("dragging");
      renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
    });

    this.mainMenu.addEventListener("click", this.returnToMainMenu.bind(this));
  }

  static showOtherPlayerBoard() {
    this.modal.classList.add("removed");
    if (this.player1BoardShowed && !this.player2BoardShowed) {
      this.player1Container.classList.add("removed");
      this.showNextPlayerBoardButton.classList.add("removed");

      if (!toggleBoards.hideBoards) {
        this.p2ClearButton.classList.remove("removed");
        this.p2RandomizeButton.classList.remove("removed");
      }
      this.p1ClearButton.classList.add("removed");
      this.p1RandomizeButton.classList.add("removed");
      this.player2Container.classList.remove("removed");

      this.startButton.classList.remove("removed");

      this.player1BoardShowed = false;
      this.player2BoardShowed = true;
    } else if (!this.player1BoardShowed && this.player2BoardShowed) {
      this.player1Container.classList.remove("removed");

      if (!toggleBoards.hideBoards) {
        this.p1ClearButton.classList.remove("removed");
        this.p1RandomizeButton.classList.remove("removed");
      }

      this.p2ClearButton.classList.add("removed");
      this.p2RandomizeButton.classList.add("removed");
      this.player2Container.classList.add("removed");

      this.player1BoardShowed = true;
      this.player2BoardShowed = false;
    }
  }

  static showNextPlayerToAttackBoard() {
    this.attackingModal.classList.add("removed");
    if (this.player1BoardShowed && !this.player2BoardShowed) {
      this.player1Container.classList.add("removed");
      this.player2Container.classList.remove("removed");

      this.player1BoardShowed = false;
      this.player2BoardShowed = true;
    } else if (!this.player1BoardShowed && this.player2BoardShowed) {
      this.player1Container.classList.remove("removed");
      this.player2Container.classList.add("removed");

      this.player1BoardShowed = true;
      this.player2BoardShowed = false;
    }
  }

  static getPlayers() {
    const players = this.game.getPlayers(choosePlayerVs.player1Name, choosePlayerVs.player2Name);
    this.player1 = players.player1;
    this.player2 = players.player2;
  }

  static getPlayerTurns() {
    this.player1Turn = false;
    this.player2Turn = true;
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
    this.checkNextPlayerIsReady();
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

  static p2AppendShip(ev) {
    const cell = ev.target;
    const element = document.querySelector(".dragging");
    if (element && element.id.includes("ship-4")) {
      if (this.p2NumberOfShipsLength4 === 0) {
        const isPlaced = this.player2.gameBoard.placeShip(
          this.player2Ships.p2ShipLength4,
          cell.coord.x,
          cell.coord.y,
          "horizontal"
        );
        if (isPlaced) {
          this.shipLength4Placed = true;
        }
      }
    } else if (element && element.id.includes("ship-3")) {
      if (this.p2NumberOfShipsLength3 === 1) {
        const isPlaced = this.player2.gameBoard.placeShip(
          this.player2Ships.p2Ship1Length3,
          cell.coord.x,
          cell.coord.y,
          "horizontal"
        );
        if (isPlaced) {
          this.shipLength3Placed = true;
        }
      } else if (this.p2NumberOfShipsLength3 === 0) {
        const isPlaced = this.player2.gameBoard.placeShip(
          this.player2Ships.p2Ship2Length3,
          cell.coord.x,
          cell.coord.y,
          "horizontal"
        );
        if (isPlaced) {
          this.shipLength3Placed = true;
        }
      }
    } else if (element && element.id.includes("ship-2")) {
      if (this.p2NumberOfShipsLength2 === 2) {
        const isPlaced = this.player2.gameBoard.placeShip(
          this.player2Ships.p2Ship1Length2,
          cell.coord.x,
          cell.coord.y,
          "horizontal"
        );
        if (isPlaced) {
          this.shipLength2Placed = true;
        }
      } else if (this.p2NumberOfShipsLength2 === 1) {
        const isPlaced = this.player2.gameBoard.placeShip(
          this.player2Ships.p2Ship2Length2,
          cell.coord.x,
          cell.coord.y,
          "horizontal"
        );
        if (isPlaced) {
          this.shipLength2Placed = true;
        }
      } else if (this.p2NumberOfShipsLength2 === 0) {
        const isPlaced = this.player2.gameBoard.placeShip(
          this.player2Ships.p2Ship3Length2,
          cell.coord.x,
          cell.coord.y,
          "horizontal"
        );
        if (isPlaced) {
          this.shipLength2Placed = true;
        }
      }
    } else if (element && element.id.includes("ship-1")) {
      if (this.p2NumberOfShipsLength1 === 3) {
        const isPlaced = this.player2.gameBoard.placeShip(
          this.player2Ships.p2Ship1Length1,
          cell.coord.x,
          cell.coord.y,
          "horizontal"
        );
        if (isPlaced) {
          this.shipLength1Placed = true;
        }
      } else if (this.p2NumberOfShipsLength1 === 2) {
        const isPlaced = this.player2.gameBoard.placeShip(
          this.player2Ships.p2Ship2Length1,
          cell.coord.x,
          cell.coord.y,
          "horizontal"
        );
        if (isPlaced) {
          this.shipLength1Placed = true;
        }
      } else if (this.p2NumberOfShipsLength1 === 1) {
        const isPlaced = this.player2.gameBoard.placeShip(
          this.player2Ships.p2Ship3Length1,
          cell.coord.x,
          cell.coord.y,
          "horizontal"
        );
        if (isPlaced) {
          this.shipLength1Placed = true;
        }
      } else if (this.p2NumberOfShipsLength1 === 0) {
        const isPlaced = this.player2.gameBoard.placeShip(
          this.player2Ships.p2Ship4Length1,
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

  static p2DisplayShipOnBoard(ev) {
    ev.preventDefault();
    const cell = ev.target;
    const element = document.querySelector(".dragging");
    if (element && element.id.includes("ship-4")) {
      if (this.p2NumberOfShipsLength4 === 0) {
        this.player2.gameBoard.placeShip(
          this.player2Ships.p2ShipLength4,
          cell.coord.x,
          cell.coord.y,
          "horizontal"
        );
        renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
        this.player2.gameBoard.removeShip(this.player2Ships.p2ShipLength4);
      }
    } else if (element && element.id.includes("ship-3")) {
      if (this.p2NumberOfShipsLength3 === 1) {
        this.player2.gameBoard.placeShip(
          this.player2Ships.p2Ship1Length3,
          cell.coord.x,
          cell.coord.y,
          "horizontal"
        );
        renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
        this.player2.gameBoard.removeShip(this.player2Ships.p2Ship1Length3);
      } else if (this.p2NumberOfShipsLength3 === 0) {
        this.player2.gameBoard.placeShip(
          this.player2Ships.p2Ship2Length3,
          cell.coord.x,
          cell.coord.y,
          "horizontal"
        );
        renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
        this.player2.gameBoard.removeShip(this.player2Ships.p2Ship2Length3);
      }
    } else if (element && element.id.includes("ship-2")) {
      if (this.p2NumberOfShipsLength2 === 2) {
        this.player2.gameBoard.placeShip(
          this.player2Ships.p2Ship1Length2,
          cell.coord.x,
          cell.coord.y,
          "horizontal"
        );
        renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
        this.player2.gameBoard.removeShip(this.player2Ships.p2Ship1Length2);
      } else if (this.p2NumberOfShipsLength2 === 1) {
        this.player2.gameBoard.placeShip(
          this.player2Ships.p2Ship2Length2,
          cell.coord.x,
          cell.coord.y,
          "horizontal"
        );
        renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
        this.player2.gameBoard.removeShip(this.player2Ships.p2Ship2Length2);
      } else if (this.p2NumberOfShipsLength2 === 0) {
        this.player2.gameBoard.placeShip(
          this.player2Ships.p2Ship3Length2,
          cell.coord.x,
          cell.coord.y,
          "horizontal"
        );
        renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
        this.player2.gameBoard.removeShip(this.player2Ships.p2Ship3Length2);
      }
    } else if (element && element.id.includes("ship-1")) {
      if (this.p2NumberOfShipsLength1 === 3) {
        this.player2.gameBoard.placeShip(
          this.player2Ships.p2Ship1Length1,
          cell.coord.x,
          cell.coord.y,
          "horizontal"
        );
        renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
        this.player2.gameBoard.removeShip(this.player2Ships.p2Ship1Length1);
      } else if (this.p2NumberOfShipsLength1 === 2) {
        this.player2.gameBoard.placeShip(
          this.player2Ships.p2Ship2Length1,
          cell.coord.x,
          cell.coord.y,
          "horizontal"
        );
        renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
        this.player2.gameBoard.removeShip(this.player2Ships.p2Ship2Length1);
      } else if (this.p2NumberOfShipsLength1 === 1) {
        this.player2.gameBoard.placeShip(
          this.player2Ships.p2Ship3Length1,
          cell.coord.x,
          cell.coord.y,
          "horizontal"
        );
        renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
        this.player2.gameBoard.removeShip(this.player2Ships.p2Ship3Length1);
      } else if (this.p2NumberOfShipsLength1 === 0) {
        this.player2.gameBoard.placeShip(
          this.player2Ships.p2Ship4Length1,
          cell.coord.x,
          cell.coord.y,
          "horizontal"
        );
        renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
        this.player2.gameBoard.removeShip(this.player2Ships.p2Ship4Length1);
      }
    }
  }

  static changeDirection(ev) {
    if (!this.start) {
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
  }

  static p2ChangeDirection(ev) {
    if (!this.start) {
      const cell = ev.target;
      if (cell.ship) {
        const head = this.player2.gameBoard.getShipHead(cell.ship);
        this.player2.gameBoard.removeShip(cell.ship);
        if (
          !cell.ship.isVertical &&
          this.player2.gameBoard.canPlaceShip(cell.ship.length, head.x, head.y, "vertical")
        ) {
          this.player2.gameBoard.placeShip(cell.ship, head.x, head.y, "vertical");
          cell.ship.isVertical = true;
        } else if (
          cell.ship.isVertical &&
          this.player2.gameBoard.canPlaceShip(cell.ship.length, head.x, head.y, "horizontal")
        ) {
          this.player2.gameBoard.placeShip(cell.ship, head.x, head.y, "horizontal");
          cell.ship.isVertical = false;
        } else if (this.player2.gameBoard.canPlaceShip(cell.ship.length, head.x, head.y, "horizontal")) {
          this.player2.gameBoard.placeShip(cell.ship, head.x, head.y, "horizontal");
        } else if (this.player2.gameBoard.canPlaceShip(cell.ship.length, head.x, head.y, "vertical")) {
          this.player2.gameBoard.placeShip(cell.ship, head.x, head.y, "vertical");
        }
        renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
      }
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

  static p2TakeShip4(ev) {
    this.shipLength4Placed = false;
    const element = ev.target;
    const { dataTransfer } = ev;
    if (this.p2NumberOfShipsLength4 > -1) {
      const number = Math.max(0, (this.p2NumberOfShipsLength4 -= 1));
      this.p2ShipLength4Count.textContent = `${number}x`;
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

  static p2TakeShip3(ev) {
    this.shipLength3Placed = false;
    const element = ev.target;
    const { dataTransfer } = ev;
    if (this.p2NumberOfShipsLength3 > -1) {
      const number = Math.max(0, (this.p2NumberOfShipsLength3 -= 1));
      this.p2ShipLength3Count.textContent = `${number}x`;
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

  static p2TakeShip2(ev) {
    this.shipLength2Placed = false;
    const element = ev.target;
    const { dataTransfer } = ev;
    if (this.p2NumberOfShipsLength2 > -1) {
      const number = Math.max(0, (this.p2NumberOfShipsLength2 -= 1));
      this.p2ShipLength2Count.textContent = `${number}x`;
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

  static p2TakeShip1(ev) {
    this.shipLength1Placed = false;
    const element = ev.target;
    const { dataTransfer } = ev;
    if (this.p2NumberOfShipsLength1 > -1) {
      const number = Math.max(0, (this.p2NumberOfShipsLength1 -= 1));
      this.p2ShipLength1Count.textContent = `${number}x`;
    }
    element.classList.add("dragging");
    dataTransfer.setDragImage(element, 20, 20);
    dataTransfer.setData("text/plain", 1);
    dataTransfer.effectAllowed = "copyMove";
  }

  static changeGameStage(text) {
    if (this.isGameOver() && this.isGameReady) {
      if (this.player2.gameBoard.isAllSunk()) {
        this.gameStage.textContent = `${this.player1.name} Won!`;
      } else if (this.player1.gameBoard.isAllSunk()) {
        this.gameStage.textContent = `${this.player2.name} Won!`;
      }
      return;
    }
    this.gameStage.textContent = text;
  }

  static p1RandomShipPlacement() {
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

    this.shipLength4Count.textContent = "0x";
    this.shipLength3Count.textContent = "0x";
    this.shipLength2Count.textContent = "0x";
    this.shipLength1Count.textContent = "0x";

    this.checkNextPlayerIsReady();
    renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
  }

  static p2RandomShipPlacement() {
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

    this.p2NumberOfShipsLength1 = -1;
    this.p2NumberOfShipsLength2 = -1;
    this.p2NumberOfShipsLength3 = -1;
    this.p2NumberOfShipsLength4 = -1;

    this.p2ShipLength4Count.textContent = "0x";
    this.p2ShipLength3Count.textContent = "0x";
    this.p2ShipLength2Count.textContent = "0x";
    this.p2ShipLength1Count.textContent = "0x";

    this.shipsPlaced();
    this.checkGameReady();
    renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
  }

  static clearBoard() {
    this.player1.gameBoard = new Gameboard();
    this.player2.gameBoard = new Gameboard();
    this.numberOfShipsLength1 = 4;
    this.numberOfShipsLength2 = 3;
    this.numberOfShipsLength3 = 2;
    this.numberOfShipsLength4 = 1;

    this.p2NumberOfShipsLength1 = 4;
    this.p2NumberOfShipsLength2 = 3;
    this.p2NumberOfShipsLength3 = 2;
    this.p2NumberOfShipsLength4 = 1;

    this.shipLength4Count.textContent = `${this.numberOfShipsLength4}x`;
    this.shipLength3Count.textContent = `${this.numberOfShipsLength3}x`;
    this.shipLength2Count.textContent = `${this.numberOfShipsLength2}x`;
    this.shipLength1Count.textContent = `${this.numberOfShipsLength1}x`;

    this.p2ShipLength4Count.textContent = `${this.p2NumberOfShipsLength4}x`;
    this.p2ShipLength3Count.textContent = `${this.p2NumberOfShipsLength3}x`;
    this.p2ShipLength2Count.textContent = `${this.p2NumberOfShipsLength2}x`;
    this.p2ShipLength1Count.textContent = `${this.p2NumberOfShipsLength1}x`;

    this.isGameReady = false;
    this.shipsPlaced();
    this.checkGameReady();
    renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
  }

  static p1ClearBoard() {
    this.player1.gameBoard = new Gameboard();

    this.numberOfShipsLength1 = 4;
    this.numberOfShipsLength2 = 3;
    this.numberOfShipsLength3 = 2;
    this.numberOfShipsLength4 = 1;

    this.shipLength4Count.textContent = `${this.numberOfShipsLength4}x`;
    this.shipLength3Count.textContent = `${this.numberOfShipsLength3}x`;
    this.shipLength2Count.textContent = `${this.numberOfShipsLength2}x`;
    this.shipLength1Count.textContent = `${this.numberOfShipsLength1}x`;

    this.checkNextPlayerIsReady();
    renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
  }

  static p2ClearBoard() {
    this.player2.gameBoard = new Gameboard();

    this.p2NumberOfShipsLength1 = 4;
    this.p2NumberOfShipsLength2 = 3;
    this.p2NumberOfShipsLength3 = 2;
    this.p2NumberOfShipsLength4 = 1;

    this.p2ShipLength4Count.textContent = `${this.p2NumberOfShipsLength4}x`;
    this.p2ShipLength3Count.textContent = `${this.p2NumberOfShipsLength3}x`;
    this.p2ShipLength2Count.textContent = `${this.p2NumberOfShipsLength2}x`;
    this.p2ShipLength1Count.textContent = `${this.p2NumberOfShipsLength1}x`;

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

  static checkNextPlayerIsReady() {
    if (this.player1.gameBoard.ships.length === 10) {
      this.isShowNextPlayerBoardButtonReady = true;
      this.showNextPlayerBoardButton.classList.remove("disabled");
    } else {
      this.isShowNextPlayerBoardButtonReady = false;
      this.showNextPlayerBoardButton.classList.add("disabled");
    }
  }

  static checkAttackNextPlayerIsReady() {
    if (this.attackNextPlayer) {
      this.isShowAttackNextPlayerButtonReady = true;
      this.attackNextPlayerButton.classList.remove("disabled");
    } else {
      this.isShowAttackNextPlayerButtonReady = false;
      this.attackNextPlayerButton.classList.add("disabled");
    }
  }

  static showNextPlayerModal() {
    if (this.isShowAttackNextPlayerButtonReady) {
      this.attackingModal.classList.remove("removed");
      this.attackNextPlayer = false;
      if (this.player1Turn && !this.player2Turn) {
        this.attackShipsParagraph.textContent = `Click continue to attack ${this.player2.name}'s board!`;
      } else if (!this.player1Turn && this.player2Turn) {
        this.attackShipsParagraph.textContent = `Click continue to attack ${this.player1.name}'s board!`;
      }
    }
    this.checkAttackNextPlayerIsReady();
  }

  static showModal() {
    if (this.isShowNextPlayerBoardButtonReady) {
      this.placeShipsParagraph.textContent = `Click continue to show ${this.player2.name}'s board`;

      this.modal.classList.remove("removed");
    }
  }

  static startGame(ev) {
    if (this.isGameReady) {
      this.start = true;
      toggleBoards.hideBoards = true;
      ev.target.classList.add("removed");

      this.modal.classList.remove("removed");
      this.attackNextPlayerButton.classList.remove("removed");

      this.p2RandomizeButton.classList.add("removed");
      this.p1RandomizeButton.classList.add("removed");
      this.p1ClearButton.classList.add("removed");
      this.p2ClearButton.classList.add("removed");

      this.placeShipsParagraph.textContent = `Click continue to start attacking ${this.player1.name}'s board!`;

      this.changeGameStage(`${this.player2.name}'s turn!`);

      renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
    } else if (!this.isGameReady) {
      this.start = false;
    }
  }

  static restartGame() {
    this.isGameReady = false;
    this.start = false;
    this.player1Turn = false;
    this.player2Turn = true;
    this.attackNextPlayer = false;
    this.player1BoardShowed = true;
    this.player2BoardShowed = false;
    toggleBoards.hideBoards = false;

    this.resetShips();
    this.clearBoard();
    this.changeGameStage("Place your ships!");

    this.p1RandomizeButton.classList.remove("removed");
    this.p1ClearButton.classList.remove("removed");
    this.showNextPlayerBoardButton.classList.remove("removed");
    this.player1Container.classList.remove("removed");

    this.player2Container.classList.add("removed");
    this.p2RandomizeButton.classList.add("removed");
    this.p2ClearButton.classList.add("removed");
    this.startButton.classList.add("removed");
    this.attackNextPlayerButton.classList.add("removed");

    this.checkAttackNextPlayerIsReady();
    this.checkGameReady();
    this.checkNextPlayerIsReady();
  }

  static getShips() {
    this.player1Ships = this.game.getShips().player1Ships;
    this.player2Ships = this.game.getShips().player2Ships;
    this.isVertical = false;
  }

  static resetShips() {
    this.player1Ships.p1ShipLength4.resetHitCount();
    this.player1Ships.p1Ship1Length3.resetHitCount();
    this.player1Ships.p1Ship2Length3.resetHitCount();
    this.player1Ships.p1Ship1Length2.resetHitCount();
    this.player1Ships.p1Ship2Length2.resetHitCount();
    this.player1Ships.p1Ship3Length2.resetHitCount();
    this.player1Ships.p1Ship1Length1.resetHitCount();
    this.player1Ships.p1Ship2Length1.resetHitCount();
    this.player1Ships.p1Ship3Length1.resetHitCount();
    this.player1Ships.p1Ship4Length1.resetHitCount();

    this.player2Ships.p2ShipLength4.resetHitCount();
    this.player2Ships.p2Ship1Length3.resetHitCount();
    this.player2Ships.p2Ship2Length3.resetHitCount();
    this.player2Ships.p2Ship1Length2.resetHitCount();
    this.player2Ships.p2Ship2Length2.resetHitCount();
    this.player2Ships.p2Ship3Length2.resetHitCount();
    this.player2Ships.p2Ship1Length1.resetHitCount();
    this.player2Ships.p2Ship2Length1.resetHitCount();
    this.player2Ships.p2Ship3Length1.resetHitCount();
    this.player2Ships.p2Ship4Length1.resetHitCount();
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

  static player1AttackPlayer2(ev) {
    if (this.shipsPlaced() && this.start && !this.isGameOver() && this.player1Turn) {
      const cell = ev.target;
      if (!cell.isHit && !cell.isAdjacent) {
        const shipHit = this.player2.gameBoard.receiveAttack(cell.coord.x, cell.coord.y);
        renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
        if (shipHit === true) {
          this.player2Turn = false;
          this.player1Turn = true;

          this.attackNextPlayer = false;
          if (toggleSound.soundOn) {
            SoundEffect.playIfHit();
          }
          this.changeGameStage(`${this.player1.name}'s turn!`);
        } else {
          this.player2Turn = true;
          this.player1Turn = false;

          this.attackNextPlayer = true;
          if (toggleSound.soundOn) {
            SoundEffect.playIfMiss();
          }
          this.changeGameStage(`${this.player2.name}'s turn!`);
          this.checkAttackNextPlayerIsReady();
        }
      }
    }
  }

  static player2AttackPlayer1(ev) {
    if (this.shipsPlaced() && this.start && !this.isGameOver() && this.player2Turn) {
      const cell = ev.target;
      if (!cell.isHit && !cell.isAdjacent) {
        const shipHit = this.player1.gameBoard.receiveAttack(cell.coord.x, cell.coord.y);
        renderCells(this.player1Cells, this.player2Cells, this.player1.gameBoard, this.player2.gameBoard);
        if (shipHit === true) {
          this.player2Turn = true;
          this.player1Turn = false;

          this.attackNextPlayer = false;
          if (toggleSound.soundOn) {
            SoundEffect.playIfHit();
          }
          this.changeGameStage(`${this.player2.name}'s turn!`);
        } else {
          this.player2Turn = false;
          this.player1Turn = true;

          this.attackNextPlayer = true;
          if (toggleSound.soundOn) {
            SoundEffect.playIfMiss();
          }
          this.changeGameStage(`${this.player1.name}'s turn!`);
          this.checkAttackNextPlayerIsReady();
        }
      }
    }
  }

  static isGameOver() {
    if (this.player1.gameBoard.isAllSunk()) {
      this.attackNextPlayerButton.classList.add("removed");

      return true;
    }
    if (this.player2.gameBoard.isAllSunk()) {
      this.attackNextPlayerButton.classList.add("removed");
      return true;
    }
    return false;
  }

  static returnToMainMenu() {
    choosePlayerVs.backToMainMenu();
    this.restartGame();
  }
}
export default DomPvP;
