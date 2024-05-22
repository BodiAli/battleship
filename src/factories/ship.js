class Ship {
  constructor(length) {
    this.length = length;
    this.hitCount = 0;
  }

  hit() {
    this.hitCount += 1;
  }

  isSunk() {
    return this.hitCount >= this.length;
  }

  resetHitCount() {
    this.hitCount = 0;
  }
}

export default Ship;
