class Gameboard {
  constructor() {
    this.ships = [];
    this.missedCoordinates = [];
    this.coordinates = [];
    for (let x = 1; x <= 10; x++) {
      for (let y = 1; y <= 10; y++) {
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
}

export default Gameboard;
