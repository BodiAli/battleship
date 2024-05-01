import Ship from "./ship.js";

class Gameboard {
  constructor() {
    this.ships = [];
    this.missedCoordinates = [];
    this.coordinates = [];
    for (let x = 1; x <= 10; x++) {
      for (let y = 1; y <= 10; y++) {
        this.coordinates.push({ x, y, ship: null });
      }
    }
  }

  isCoordOccupied(x, y) {
    return !!this.coordinates.find((coord) => coord.x === x && coord.y === y && coord.ship);
  }

  placeShip(shipObject, xCoord, yCoord, direction) {
    const shipLength = shipObject.length;
    const shipPositions = [];

    // Check if the ship can be placed based on its length and direction
    let isValidPlacement = false;
    if (direction === "horizontal" && xCoord + shipLength - 1 <= 10) {
      isValidPlacement = true;
    } else if (direction === "vertical" && yCoord + shipLength - 1 <= 10) {
      isValidPlacement = true;
    }

    if (!isValidPlacement) {
      console.log("Invalid ship placement: Ship cannot be placed at the specified coordinates or direction");
      return;
    }

    for (let i = 0; i < shipLength; i++) {
      const x = direction === "horizontal" ? xCoord + i : xCoord;
      const y = direction === "vertical" ? yCoord + i : yCoord;
      if (
        this.isCoordOccupied(x, y) ||
        this.isCoordOccupied(x - 1, y) ||
        this.isCoordOccupied(x + 1, y) ||
        this.isCoordOccupied(x, y - 1) ||
        this.isCoordOccupied(x, y + 1)
      ) {
        console.log("Invalid ship placement: Adjacent coordinates already have ships.");
        return;
      }
      shipPositions.push({ x, y });
    }
    shipPositions.forEach(({ x, y }) => {
      const coordinate = this.coordinates.find((coord) => coord.x === x && coord.y === y);
      coordinate.ship = shipObject;
    });
    this.ships.push(shipObject);
  }

  receiveAttack(x, y) {
    let shipHit = false;
    this.coordinates.forEach((coords) => {
      if (coords.x === x && coords.y === y && coords.ship) {
        shipHit = true;
        coords.ship.hit();
      }
    });
    if (!shipHit) {
      this.missedCoordinates.push({ x, y });
    }
    return shipHit;
  }

  isAllSunk() {
    return this.ships.every((ship) => ship.hitCount >= ship.length);
  }
}
const gameBoard = new Gameboard();
const ship1 = new Ship(3);

const ship2 = new Ship(4);
const ship3 = new Ship(1);
const ship4 = new Ship(4);

gameBoard.placeShip(ship1, 1, 3, "horizontal");
console.log(gameBoard.placeShip(ship3, 8, 3, "horizontal"));
console.log(gameBoard.placeShip(ship2, 6, 3, "horizontal"));
console.log(gameBoard.coordinates);
export default Gameboard;
