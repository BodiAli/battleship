class Gameboard {
  constructor() {
    this.ships = [];
    this.missedCoordinates = [];
    this.coordinates = [];
    for (let x = 1; x <= 10; x++) {
      for (let y = 1; y <= 10; y++) {
        this.coordinates.push({ x, y });
      }
    }
  }

  placeShip(shipObject, xCoord, yCoord, direction) {
    const targetCoord = this.coordinates.find((coord) => coord.x === xCoord && coord.y === yCoord);
    if (targetCoord && !targetCoord.ship) {
      targetCoord.ship = shipObject;
      this.ships.push(shipObject);
      return "ship placed";
    }
    return "could not place ship at this position";
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

export default Gameboard;
