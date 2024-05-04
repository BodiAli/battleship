import Gameboard from "../../factories/gameboard.js";
import Ship from "../../factories/ship.js";

describe("Gameboard tests:", () => {
  let gameBoard;
  beforeEach(() => {
    gameBoard = new Gameboard();
  });

  test("Gameboard should have a coordinates system", () => {
    expect(gameBoard.coordinates.length).toBe(100);
  });

  describe("placeShip method:", () => {
    test("should place ships with specific coordinates by calling placeShip", () => {
      const placedShip = new Ship(3);
      const notPlacedShip = new Ship(3);

      gameBoard.placeShip(placedShip, 1, 3, "horizontal");

      const isShipPlaced = gameBoard.coordinates.some((coord) => coord.ship === placedShip);
      const isNotPlacedShipPlaced = gameBoard.coordinates.some((coord) => coord.ship === notPlacedShip);

      expect(isShipPlaced).toBeTruthy();
      expect(isNotPlacedShipPlaced).toBeFalsy();
    });

    test("should not place ship if the coordinates are occupied by another ship or undefined coordinates", () => {
      const ship1 = new Ship(1);
      const ship2 = new Ship(3);
      gameBoard.placeShip(ship1, 1, 3, "vertical");
      gameBoard.placeShip(ship2, 1, 3, "vertical");
      let isShipPlaced = gameBoard.coordinates.some((coord) => coord.ship === ship2);
      expect(isShipPlaced).toBeFalsy();
      gameBoard.placeShip(ship2, 11, 2, "vertical");
      isShipPlaced = gameBoard.coordinates.some((coord) => coord.ship === ship2);
      expect(isShipPlaced).toBeFalsy();
      gameBoard.placeShip(ship2, 5, 0, "vertical");
      isShipPlaced = gameBoard.coordinates.some((coord) => coord.ship === ship2);
      expect(isShipPlaced).toBeFalsy();
      gameBoard.placeShip(ship2, 0, 5, "horizontal");
      isShipPlaced = gameBoard.coordinates.some((coord) => coord.ship === ship2);
      expect(isShipPlaced).toBeFalsy();
    });

    test("should place ships with specific coordinates according to it's length and direction (horizontal)", () => {
      const ship = new Ship(4);
      gameBoard.placeShip(ship, 4, 3, "horizontal");
      expect(gameBoard.coordinates[23]).toEqual({ x: 4, y: 3, ship, isHit: false });
      expect(gameBoard.coordinates[24]).toEqual({ x: 5, y: 3, ship, isHit: false });
      expect(gameBoard.coordinates[25]).toEqual({ x: 6, y: 3, ship, isHit: false });
      expect(gameBoard.coordinates[26]).toEqual({ x: 7, y: 3, ship, isHit: false });
    });

    test("should place ships with specific coordinates according to it's length and direction (vertical)", () => {
      const verticalShip2 = new Ship(4);
      gameBoard.placeShip(verticalShip2, 4, 3, "vertical");
      expect(gameBoard.coordinates[23]).toEqual({ x: 4, y: 3, ship: verticalShip2, isHit: false });
      expect(gameBoard.coordinates[33]).toEqual({ x: 4, y: 4, ship: verticalShip2, isHit: false });
      expect(gameBoard.coordinates[43]).toEqual({ x: 4, y: 5, ship: verticalShip2, isHit: false });
      expect(gameBoard.coordinates[53]).toEqual({ x: 4, y: 6, ship: verticalShip2, isHit: false });
    });
  });

  describe("receiveAttack method", () => {
    test("should return true if an attack hit a ship false otherwise", () => {
      const ship = new Ship(4);
      gameBoard.placeShip(ship, 2, 4, "horizontal");
      expect(gameBoard.receiveAttack(1, 4)).toBeFalsy();
      expect(gameBoard.receiveAttack(2, 4)).toBeTruthy();
      expect(gameBoard.receiveAttack(3, 4)).toBeTruthy();
      expect(gameBoard.receiveAttack(4, 4)).toBeTruthy();
      expect(gameBoard.receiveAttack(4, 5)).toBeFalsy();
    });

    test("receiveAttack should send a hit function to the correct ship", () => {
      const ship1 = new Ship(2);
      const ship2 = new Ship(3);
      const ship3 = new Ship(4);
      expect(ship1.hitCount).toBe(0);
      expect(ship2.hitCount).toBe(0);
      gameBoard.placeShip(ship3, 5, 1, "horizontal");
      gameBoard.receiveAttack(5, 1);
      gameBoard.receiveAttack(6, 1);
      gameBoard.receiveAttack(7, 1);
      gameBoard.receiveAttack(8, 1);
      expect(ship3.hitCount).toBe(4);
      expect(ship3.isSunk()).toBeTruthy();
    });

    test("receiveAttack should record the coordinates of missed attacks", () => {
      const ship = new Ship(2);
      gameBoard.placeShip(ship, 6, 1, "vertical");
      gameBoard.receiveAttack(2, 0);
      gameBoard.receiveAttack(2, 1);
      gameBoard.receiveAttack(5, 5);
      gameBoard.receiveAttack(1, 1);
      gameBoard.receiveAttack(6, 2);
      expect(gameBoard.missedCoordinates).toEqual([
        { x: 2, y: 1 },
        { x: 5, y: 5 },
        { x: 1, y: 1 },
      ]);
    });

    test("receiveAttack should flag hit coordinates as true", () => {
      const ship = new Ship(4);
      gameBoard.placeShip(ship, 3, 3, "vertical");
      gameBoard.receiveAttack(3, 3);
      gameBoard.receiveAttack(3, 4);
      gameBoard.receiveAttack(3, 5);
      expect(gameBoard.coordinates[22]).toEqual({ x: 3, y: 3, ship, isHit: true });
      expect(gameBoard.coordinates[32]).toEqual({ x: 3, y: 4, ship, isHit: true });
      expect(gameBoard.coordinates[42]).toEqual({ x: 3, y: 5, ship, isHit: true });
      gameBoard.receiveAttack(4, 4);
      gameBoard.receiveAttack(6, 6);
      gameBoard.receiveAttack(7, 7);
      expect(gameBoard.coordinates[33]).toEqual({ x: 4, y: 4, ship: null, isHit: true, isAdjacent: true });
      expect(gameBoard.coordinates[55]).toEqual({ x: 6, y: 6, ship: null, isHit: true });
      expect(gameBoard.coordinates[66]).toEqual({ x: 7, y: 7, ship: null, isHit: true });
    });

    test("receiveAttack should record adjacent coordinates of the attacked coordinate", () => {
      const ship = new Ship(4);
      gameBoard.placeShip(ship, 3, 3, "horizontal");
      gameBoard.receiveAttack(3, 3);
      gameBoard.receiveAttack(4, 3);
      gameBoard.receiveAttack(5, 3);
      gameBoard.receiveAttack(6, 3);
      expect(gameBoard.coordinates[11]).toEqual({ x: 2, y: 2, ship: null, isHit: false, isAdjacent: true });
      expect(gameBoard.coordinates[31]).toEqual({ x: 2, y: 4, ship: null, isHit: false, isAdjacent: true });
      expect(gameBoard.coordinates[12]).toEqual({ x: 3, y: 2, ship: null, isHit: false, isAdjacent: true });
      expect(gameBoard.coordinates[32]).toEqual({ x: 3, y: 4, ship: null, isHit: false, isAdjacent: true });
      expect(gameBoard.coordinates[13]).toEqual({ x: 4, y: 2, ship: null, isHit: false, isAdjacent: true });
      expect(gameBoard.coordinates[33]).toEqual({ x: 4, y: 4, ship: null, isHit: false, isAdjacent: true });
      expect(gameBoard.coordinates[14]).toEqual({ x: 5, y: 2, ship: null, isHit: false, isAdjacent: true });
      expect(gameBoard.coordinates[34]).toEqual({ x: 5, y: 4, ship: null, isHit: false, isAdjacent: true });
    });

    test("when a ship is destroyed all adjacent coordinates are recorded as isAdjacent: true", () => {
      const ship = new Ship(3);
      gameBoard.placeShip(ship, 2, 2, "vertical");
      gameBoard.receiveAttack(2, 2);
      gameBoard.receiveAttack(2, 3);
      gameBoard.receiveAttack(2, 4);
      expect(gameBoard.coordinates[0]).toEqual({ x: 1, y: 1, ship: null, isHit: false, isAdjacent: true });
      expect(gameBoard.coordinates[10]).toEqual({ x: 1, y: 2, ship: null, isHit: false, isAdjacent: true });
      expect(gameBoard.coordinates[20]).toEqual({ x: 1, y: 3, ship: null, isHit: false, isAdjacent: true });
      expect(gameBoard.coordinates[30]).toEqual({ x: 1, y: 4, ship: null, isHit: false, isAdjacent: true });
      expect(gameBoard.coordinates[40]).toEqual({ x: 1, y: 5, ship: null, isHit: false, isAdjacent: true });
      expect(gameBoard.coordinates[41]).toEqual({ x: 2, y: 5, ship: null, isHit: false, isAdjacent: true });
      expect(gameBoard.coordinates[2]).toEqual({ x: 3, y: 1, ship: null, isHit: false, isAdjacent: true });
      expect(gameBoard.coordinates[12]).toEqual({ x: 3, y: 2, ship: null, isHit: false, isAdjacent: true });
      expect(gameBoard.coordinates[22]).toEqual({ x: 3, y: 3, ship: null, isHit: false, isAdjacent: true });
      expect(gameBoard.coordinates[32]).toEqual({ x: 3, y: 4, ship: null, isHit: false, isAdjacent: true });
      expect(gameBoard.coordinates[42]).toEqual({ x: 3, y: 5, ship: null, isHit: false, isAdjacent: true });
      expect(gameBoard.coordinates[1]).toEqual({ x: 2, y: 1, ship: null, isHit: false, isAdjacent: true });
    });
  });

  test("should return true if all ships sunk false otherwise", () => {
    const ship1 = new Ship(2);
    const ship2 = new Ship(3);
    const ship3 = new Ship(3);
    gameBoard.placeShip(ship1, 2, 6, "horizontal");
    gameBoard.placeShip(ship2, 2, 2, "horizontal");
    gameBoard.placeShip(ship3, 5, 6, "vertical");
    expect(gameBoard.isAllSunk()).toBeFalsy();
    gameBoard.receiveAttack(2, 6);
    gameBoard.receiveAttack(3, 6);
    gameBoard.receiveAttack(2, 2);
    gameBoard.receiveAttack(3, 2);
    gameBoard.receiveAttack(4, 2);
    gameBoard.receiveAttack(5, 6);
    gameBoard.receiveAttack(5, 7);
    gameBoard.receiveAttack(5, 8);
    expect(gameBoard.isAllSunk()).toBeTruthy();
  });
});
