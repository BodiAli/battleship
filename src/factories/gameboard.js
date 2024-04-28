class Gameboard {
  constructor() {
    this.ships = [];
    this.missedCoordinates = [];
  }

  receiveAttack(x, y) {
    let shipHit = false;
    this.ships.forEach((ship) => {
      ship.position.forEach((coords) => {
        if (coords.x === x && coords.y === y) {
          shipHit = true;
          ship.hit();
        }
      });
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
