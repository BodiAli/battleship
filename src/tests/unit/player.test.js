import Player from "../../factories/player.js";
import Gameboard from "../../factories/gameboard.js";

describe("Player tests:", () => {
  const player = new Player();
  const computer = new Player();

  test("check if each player is defined", () => {
    expect(player).toBeDefined();
    expect(computer).toBeDefined();
  });

  test("each player object should contain it's own gameboard", () => {
    expect(player).toHaveProperty("gameBoard");
    expect(computer).toHaveProperty("gameBoard");
  });

  test("check if gameboard property is an instance of Gameboard class", () => {
    expect(player.gameBoard).toEqual(new Gameboard());
    expect(computer.gameBoard).toEqual(new Gameboard());
  });
});
