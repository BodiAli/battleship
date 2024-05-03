import Player from "../../factories/player.js";
import Ship from "../../factories/ship.js";
import Gameboard from "../../factories/gameboard.js";

describe("Testing integrating classes", () => {
  let player1;
  let player2;
  beforeEach(() => {
    player1 = new Player("bodi");
    player2 = new Player();
  });

  test("players should have a name and gameBoard property", () => {
    expect(player1.name).toBe("bodi");
    expect(player2.name).toBe("");
    expect(player1.gameBoard).toEqual(new Gameboard());
    expect(player2.gameBoard).toEqual(new Gameboard());
  });

  test("players are able to place ships", () => {
    const ship1 = new Ship(3);
    const ship2 = new Ship(3);
    player1.gameBoard.placeShip(ship1, 3, 3, "horizontal");
    player2.gameBoard.placeShip(ship2, 3, 3, "vertical");
    expect(player1.gameBoard.coordinates[22]).toEqual({ x: 3, y: 3, ship: ship1, isHit: false });
    expect(player2.gameBoard.coordinates[22]).toEqual({ x: 3, y: 3, ship: ship2, isHit: false });
  });
  describe("each player board is separate", () => {
    test("placing ships is separate for each player board", () => {
      const ship1 = new Ship(3);
      const ship2 = new Ship(3);
      player1.gameBoard.placeShip(ship1, 7, 8, "horizontal");
      player2.gameBoard.placeShip(ship2, 3, 3, "vertical");
      expect(player1.gameBoard.coordinates[76]).toEqual({ x: 7, y: 8, ship: ship1, isHit: false });
      expect(player2.gameBoard.coordinates[76]).toEqual({ x: 7, y: 8, ship: null, isHit: false });
    });

    test("attacking ships is separate for each player", () => {
      const ship1 = new Ship(4);
      const ship2 = new Ship(3);
      player1.gameBoard.placeShip(ship1, 7, 8, "horizontal");
      player2.gameBoard.placeShip(ship2, 3, 3, "vertical");
      player1.gameBoard.receiveAttack(7, 8);
      player1.gameBoard.receiveAttack(8, 8);
      player1.gameBoard.receiveAttack(9, 8);
      player1.gameBoard.receiveAttack(10, 8);
      expect(ship1.hitCount).toBe(4);
      expect(ship1.isSunk()).toBe(true);
      expect(player1.gameBoard.isAllSunk()).toBe(true);
      expect(player2.gameBoard.isAllSunk()).toBe(false);
      player2.gameBoard.receiveAttack(3, 3);
      player2.gameBoard.receiveAttack(3, 4);
      player2.gameBoard.receiveAttack(3, 5);
      expect(ship2.hitCount).toBe(3);
      expect(ship2.isSunk()).toBe(true);
      expect(player2.gameBoard.isAllSunk()).toBe(true);
    });
  });
});
