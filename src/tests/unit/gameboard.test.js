import Gameboard from "../../factories/gameboard.js";
import Ship from "../../factories/ship.js";

describe("Gameboard tests:", () => {
  let ship1;
  let ship2;

  const gameBoard = new Gameboard();

  test("Gameboard should have a coordinates system", () => {
    expect(gameBoard.coordinates.length).toBe(100);
  });

  test("should place ships with specific coordinates by calling placeShip", () => {
    ship1 = new Ship(3);
    const notPlacedShip = new Ship(3);

    gameBoard.placeShip(ship1, 1, 3, "horizontal");

    const isShipPlaced = gameBoard.coordinates.some((coord) => coord.ship === ship1);
    const isNotPlacedShipPlaced = gameBoard.coordinates.some((coord) => coord.ship === notPlacedShip);

    expect(isShipPlaced).toBeTruthy();
    expect(isNotPlacedShipPlaced).toBeFalsy();
  });

  test("should not place ship if the coordinates are occupied by another ship or undefined coordinates", () => {
    const ship = new Ship(1);
    gameBoard.placeShip(ship, 1, 3, "vertical");
    let isShipPlaced = gameBoard.coordinates.some((coord) => coord.ship === ship);
    expect(isShipPlaced).toBeFalsy();
    gameBoard.placeShip(ship, 11, 2, "vertical");
    isShipPlaced = gameBoard.coordinates.some((coord) => coord.ship === ship);
    expect(isShipPlaced).toBeFalsy();
  });

  test("should place ships with specific coordinates by calling placeShip", () => {
    ship2 = new Ship(4);
    gameBoard.placeShip(ship2, 4, 3, "vertical");
    expect(gameBoard.coordinates[32]).toEqual({ x: 4, y: 3, ship: ship2 });
  });

  describe("receiveAttack function", () => {
    test("should return true if an attack hit a ship false otherwise", () => {
      expect(gameBoard.receiveAttack(2, 4)).toBeFalsy();
      expect(gameBoard.receiveAttack(1, 3)).toBeTruthy();
      expect(gameBoard.receiveAttack(4, 3)).toBeTruthy();
    });

    test("receiveAttack should send a hit function to the correct ship", () => {
      expect(ship1.hitCount).toBe(1);
      expect(ship2.hitCount).toBe(1);
      const ship3 = new Ship(5);
      gameBoard.placeShip(ship3, 5, 1, "horizontal");
      gameBoard.receiveAttack(5, 1);
      gameBoard.receiveAttack(5, 1);
      gameBoard.receiveAttack(5, 1);
      gameBoard.receiveAttack(5, 1);
      gameBoard.receiveAttack(5, 1);
      expect(ship3.hitCount).toBe(5);
      expect(ship3.isSunk()).toBeTruthy();
    });

    test("receiveAttack should record the coordinates of missed attacks", () => {
      expect(gameBoard.missedCoordinates).toEqual([{ x: 2, y: 4 }]);
      gameBoard.receiveAttack(2, 0);
      gameBoard.receiveAttack(5, 5);
      gameBoard.receiveAttack(1, 1);
      expect(gameBoard.missedCoordinates).toEqual([
        { x: 2, y: 4 },
        { x: 2, y: 0 },
        { x: 5, y: 5 },
        { x: 1, y: 1 },
      ]);
    });
  });

  test("should return true if all ships sunk false otherwise", () => {
    expect(gameBoard.isAllSunk()).toBeFalsy();
    gameBoard.receiveAttack(1, 3);
    gameBoard.receiveAttack(1, 3);
    gameBoard.receiveAttack(4, 3);
    gameBoard.receiveAttack(4, 3);
    gameBoard.receiveAttack(4, 3);
    expect(gameBoard.isAllSunk()).toBeTruthy();
  });
});
