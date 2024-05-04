class Gameboard {
  constructor() {
    this.ships = [];
    this.missedCoordinates = [];
    this.coordinates = [];
    for (let y = 1; y <= 10; y++) {
      for (let x = 1; x <= 10; x++) {
        this.coordinates.push({ x, y, ship: null, isHit: false });
      }
    }
  }

  isCoordOccupied(x, y) {
    return !!this.coordinates.find((coord) => coord.x === x && coord.y === y && coord.ship);
  }

  placeShip(shipObject, xCoord, yCoord, direction) {
    if (xCoord > 10 || xCoord <= 0 || yCoord > 10 || yCoord <= 0) {
      console.log("Invalid ship placement: Ship should be placed at coordinates between 1 to 10");
      return;
    }
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
    if (x > 10 || x <= 0 || y > 10 || y <= 0) {
      return "Invalid coordinates";
    }

    let shipHit = false;
    this.coordinates.forEach((coords) => {
      const coord = coords;
      if (coords.x === x && coords.y === y && coords.ship) {
        shipHit = true;
        coord.isHit = true;
        coords.ship.hit();
        this.triggerAdjacentCoordinates(x, y);
        if (coords.ship.isSunk()) {
          this.markAdjacentCoordinates(coords.ship);
        }
      }
    });
    if (!shipHit) {
      const targetCoord = this.coordinates.find((coord) => coord.x === x && coord.y === y);
      targetCoord.isHit = true;
      this.missedCoordinates.push({ x, y });
    }
    return shipHit;
  }

  isAllSunk() {
    return this.ships.every((ship) => ship.hitCount >= ship.length);
  }

  triggerAdjacentCoordinates(xCoord, yCoord) {
    const minusYMinusX = { x: xCoord - 1, y: yCoord - 1 };
    const minusYPlusX = { x: xCoord + 1, y: yCoord - 1 };
    const plusYMinusX = { x: xCoord - 1, y: yCoord + 1 };
    const plusYPlusX = { x: xCoord + 1, y: yCoord + 1 };
    let adjacentPositions = [minusYMinusX, minusYPlusX, plusYMinusX, plusYPlusX];
    if (xCoord === 10 && yCoord === 1) {
      adjacentPositions = [plusYMinusX];
    } else if (xCoord === 1 && yCoord === 1) {
      adjacentPositions = [plusYPlusX];
    } else if (xCoord === 1 && yCoord === 10) {
      adjacentPositions = [minusYPlusX];
    } else if (xCoord === 10 && yCoord === 10) {
      adjacentPositions = [minusYMinusX];
    } else if (xCoord === 1 && yCoord >= 2) {
      adjacentPositions = [minusYPlusX, plusYPlusX];
    } else if (xCoord === 10 && yCoord >= 2) {
      adjacentPositions = [minusYMinusX, plusYMinusX];
    } else if (yCoord === 1 && xCoord >= 2) {
      adjacentPositions = [plusYPlusX, plusYMinusX];
    } else if (yCoord === 10 && xCoord >= 2) {
      adjacentPositions = [minusYPlusX, minusYMinusX];
    }
    adjacentPositions.forEach(({ x, y }) => {
      const coordinate = this.coordinates.find((coord) => coord.x === x && coord.y === y);
      coordinate.isAdjacent = true;
    });
  }

  markAdjacentCoordinates(shipObject) {
    const shipPositions = [];

    // Iterate over all ships on the board
    this.coordinates.forEach((coord) => {
      const { ship } = coord;
      if (ship === shipObject) {
        shipPositions.push({ x: coord.x, y: coord.y });
      }
    });

    // Iterate over each ship position to mark adjacent coordinates
    shipPositions.forEach(({ x, y }) => {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const newX = x + i;
          const newY = y + j;
          // Check if the adjacent coordinate is within the game board
          if (newX >= 1 && newX <= 10 && newY >= 1 && newY <= 10) {
            // Exclude the ship's own position
            if (!(i === 0 && j === 0)) {
              const adjacentCoord = this.coordinates.find((coord) => coord.x === newX && coord.y === newY);
              if (adjacentCoord && !adjacentCoord.ship) {
                adjacentCoord.isAdjacent = true;
              }
            }
          }
        }
      }
    });
  }
}

export default Gameboard;
