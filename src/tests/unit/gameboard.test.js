import Gameboard from "../../factories/gameboard.js";
import Ship from "../../factories/ship.js";

describe("Gameboard tests:", () => {
  let ship1;
  let ship2;

  const gameBoard = new Gameboard();
  test("should place ships with specific coordinates by calling the ship setPosition", () => {
    ship1 = new Ship(3);
    ship1.setPosition(1, 3);
    gameBoard.ships.push(ship1);
    expect(gameBoard.ships[0].position).toEqual([{ x: 1, y: 3 }]);
  });

  test("should place ships with specific coordinates by calling the ship setPosition", () => {
    ship2 = new Ship(4);
    ship2.setPosition(4, 3);
    gameBoard.ships.push(ship2);
    expect(gameBoard.ships[1].position).toEqual([{ x: 4, y: 3 }]);
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
      ship3.setPosition(5, 1);
      gameBoard.ships.push(ship3);
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
