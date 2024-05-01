import Ship from "./ship.js";

class Gameboard {
  constructor() {
    this.ships = [];
    this.missedCoordinates = [];
    this.coordinates = [];
    for (let y = 1; y <= 10; y++) {
      for (let x = 1; x <= 10; x++) {
        this.coordinates.push({ x, y });
      }
    }
  }

  placeShip(shipObject, xCoord, yCoord, direction) {
    if (direction === "horizontal") {
      let nextNextX = shipObject.length;
      if (xCoord === 7 && shipObject.length === 4) {
        nextNextX = 3;
      } else if (xCoord === 8 && shipObject.length === 4) {
        return "could not place ship at this position";
      } else if (xCoord === 9 && (shipObject.length === 4 || shipObject.length === 3)) {
        return "could not place ship at this position";
      } else if (xCoord === 10 && shipObject.length !== 1) {
        return "could not place ship at this position";
      }
      const targetCoord = this.coordinates.find((coord) => coord.x === xCoord && coord.y === yCoord);
      if (targetCoord && !targetCoord.ship && this.checkAdjacentCoordinates(xCoord, yCoord)) {
        if (shipObject.length === 1) {
          this.ships.push(shipObject);
          targetCoord.ship = shipObject;
          return "ship placed";
        }
        for (let i = 1; i < shipObject.length; i++) {
          const nextX = xCoord + i;
          const nextCoord = this.coordinates.find((val) => val.x === nextX && val.y === yCoord);
          const nextNextCoord = this.coordinates.find(
            (val) => val.x === xCoord + nextNextX && val.y === yCoord
          );
          if (nextNextCoord.ship) {
            break;
          }

          if (nextCoord && !nextCoord.ship && !nextNextCoord.ship) {
            this.ships.push(shipObject);
            targetCoord.ship = shipObject;
            nextCoord.ship = shipObject;
          } else {
            return "could not place ship at this position";
          }
        }
      }
    } else if (direction === "vertical") {
      for (let i = 1; i < shipObject.length; i++) {
        const nextY = yCoord + i;
        const nextCoord = this.coordinates.find((val) => val.x === xCoord && val.y === nextY);
        if (nextCoord && !nextCoord.ship) {
          nextCoord.ship = shipObject;
        } else {
          return "could not place ship at this position";
        }
      }
    }
    return "ship placed";
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

  checkAdjacentCoordinates(xCoord, yCoord) {
    let nextXCoord;
    let nextYCoord;
    let previousXCoord;
    let previousYCoord;
    if (xCoord === 1) {
      previousXCoord = 1;
      nextXCoord = xCoord + 1;
    } else if (xCoord === 10) {
      nextXCoord = 10;
      previousXCoord = xCoord - 1;
    } else {
      previousXCoord = xCoord - 1;
      nextXCoord = xCoord + 1;
    }
    if (yCoord === 1) {
      previousYCoord = 1;
      nextYCoord = yCoord + 1;
    } else if (yCoord === 10) {
      nextYCoord = 10;
      previousYCoord = yCoord - 1;
    } else {
      previousYCoord = yCoord - 1;
      nextYCoord = yCoord + 1;
    }

    const coordMinusXSameY = this.coordinates.find(
      (coord) => coord.x === previousXCoord && coord.y === yCoord
    );
    const coordMinusXMinusY = this.coordinates.find(
      (coord) => coord.x === previousXCoord && coord.y === previousYCoord
    );
    const coordMinusYSameX = this.coordinates.find(
      (coord) => coord.x === xCoord && coord.y === previousYCoord
    );

    const coordPlusXSameY = this.coordinates.find((coord) => coord.x === nextXCoord && coord.y === yCoord);
    const coordPlusXPlusY = this.coordinates.find(
      (coord) => coord.x === nextXCoord && coord.y === nextYCoord
    );
    const coordSameXPlusY = this.coordinates.find((coord) => coord.x === xCoord && coord.y === nextYCoord);
    if (
      !coordMinusXSameY.ship &&
      !coordMinusXMinusY.ship &&
      !coordMinusYSameX.ship &&
      !coordPlusXSameY.ship &&
      !coordPlusXPlusY.ship &&
      !coordSameXPlusY.ship
    ) {
      return true;
    }

    return false;
  }
}
const gameBoard = new Gameboard();
const ship1 = new Ship(3);

const ship2 = new Ship(4);
const ship3 = new Ship(1);

gameBoard.placeShip(ship1, 1, 3, "horizontal");
console.log(gameBoard.placeShip(ship2, 10, 3, "horizontal"));
console.log(gameBoard.placeShip(ship3, 10, 3, "horizontal"));
console.log(gameBoard.coordinates);
export default Gameboard;
