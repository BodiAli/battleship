class Ship {
  constructor(length) {
    this.length = length;
    this.hitCount = 0;
    this.position = [];
  }

  hit() {
    this.hitCount += 1;
  }

  isSunk() {
    return this.hitCount >= this.length;
  }

  setPosition(x, y) {
    this.position.push({ x, y });
  }
}

export default Ship;
