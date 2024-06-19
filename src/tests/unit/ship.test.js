import Ship from "../../factories/ship.js";

describe("Ship tests:", () => {
  // assign variables to avoid beforeEach scoping issues
  let ship;
  beforeEach(() => {
    ship = new Ship(3);
  });

  test("ship should be defined", () => {
    expect(ship).toBeDefined();
  });

  test("ship should include a hit counter property", () => {
    expect(ship).toHaveProperty("hitCount");
  });

  test("should increase hit counter", () => {
    expect(ship.hitCount).toBe(0);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.hitCount).toBe(3);
  });

  test("should return true if ship is sunk, false otherwise", () => {
    expect(ship.isSunk()).toBeFalsy();
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBeTruthy();
  });

  test("should reset ship hitCount", () => {
    expect(ship.hitCount).toBe(0);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBeTruthy();
    ship.resetHitCount();
    expect(ship.hitCount).toBe(0);
    expect(ship.isSunk()).toBeFalsy();
  });
});
