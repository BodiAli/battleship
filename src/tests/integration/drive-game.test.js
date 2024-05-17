import driveGame from "../../drive-game.js";

describe("driveGame function", () => {
  test("driveGame should get player names", () => {
    const game = driveGame();
    const players = game.getPlayers("Mody", "Mazen");
    expect(players.player1.name).toMatch("Mody");
    expect(players.player2.name).toMatch("Mazen");
  });

  test("driveGame should get ships for two players", () => {
    const game = driveGame();
    const players = game.getShips();
    const { player1Ships } = players;
    const { player2Ships } = players;

    expect(player1Ships).toHaveProperty("p1ShipLength4");
    expect(player1Ships).toHaveProperty("p1Ship1Length3");
    expect(player1Ships).toHaveProperty("p1Ship2Length3");
    expect(player1Ships).toHaveProperty("p1Ship1Length2");
    expect(player1Ships).toHaveProperty("p1Ship2Length2");
    expect(player1Ships).toHaveProperty("p1Ship3Length2");
    expect(player1Ships).toHaveProperty("p1Ship1Length1");
    expect(player1Ships).toHaveProperty("p1Ship2Length1");
    expect(player1Ships).toHaveProperty("p1Ship3Length1");
    expect(player1Ships).toHaveProperty("p1Ship4Length1");

    expect(player2Ships).toHaveProperty("p2ShipLength4");
    expect(player2Ships).toHaveProperty("p2Ship1Length3");
    expect(player2Ships).toHaveProperty("p2Ship2Length3");
    expect(player2Ships).toHaveProperty("p2Ship1Length2");
    expect(player2Ships).toHaveProperty("p2Ship2Length2");
    expect(player2Ships).toHaveProperty("p2Ship3Length2");
    expect(player2Ships).toHaveProperty("p2Ship1Length1");
    expect(player2Ships).toHaveProperty("p2Ship2Length1");
    expect(player2Ships).toHaveProperty("p2Ship3Length1");
    expect(player2Ships).toHaveProperty("p2Ship4Length1");
  });
});
