import driveGame from "../../drive-game.js";

describe("driveGame function", () => {
  test("driveGame should get player names", () => {
    const game = driveGame();
    const players = game.getPlayers("Mody", "Mazen");
    expect(players.player1.name).toMatch("Mody");
    expect(players.player2.name).toMatch("Mazen");
  });

  test("driveGame should get ships", () => {
    const game = driveGame();
    const ships = game.getShips();
    expect(ships).toHaveProperty("shipLength4");
    expect(ships).toHaveProperty("ship1Length3");
    expect(ships).toHaveProperty("ship2Length3");
    expect(ships).toHaveProperty("ship1Length2");
    expect(ships).toHaveProperty("ship2Length2");
    expect(ships).toHaveProperty("ship3Length2");
    expect(ships).toHaveProperty("ship1Length1");
    expect(ships).toHaveProperty("ship2Length1");
    expect(ships).toHaveProperty("ship3Length1");
    expect(ships).toHaveProperty("ship4Length1");
  });
});
