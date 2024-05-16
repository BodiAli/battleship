import Player from "./factories/player.js";
import Ship from "./factories/ship.js";

function driveGame() {
  function getPlayers(name1, name2 = "Computer") {
    const player1 = new Player(name1);
    const player2 = new Player(name2);
    return { player1, player2 };
  }
  function getShips() {
    const p1ShipLength4 = new Ship(4);
    const p1Ship1Length3 = new Ship(3);
    const p1Ship2Length3 = new Ship(3);
    const p1Ship1Length2 = new Ship(2);
    const p1Ship2Length2 = new Ship(2);
    const p1Ship3Length2 = new Ship(2);
    const p1Ship1Length1 = new Ship(1);
    const p1Ship2Length1 = new Ship(1);
    const p1Ship3Length1 = new Ship(1);
    const p1Ship4Length1 = new Ship(1);

    const p2ShipLength4 = new Ship(4);
    const p2Ship1Length3 = new Ship(3);
    const p2Ship2Length3 = new Ship(3);
    const p2Ship1Length2 = new Ship(2);
    const p2Ship2Length2 = new Ship(2);
    const p2Ship3Length2 = new Ship(2);
    const p2Ship1Length1 = new Ship(1);
    const p2Ship2Length1 = new Ship(1);
    const p2Ship3Length1 = new Ship(1);
    const p2Ship4Length1 = new Ship(1);
    return {
      player1Ships: {
        p1ShipLength4,
        p1Ship1Length3,
        p1Ship2Length3,
        p1Ship1Length2,
        p1Ship2Length2,
        p1Ship3Length2,
        p1Ship1Length1,
        p1Ship2Length1,
        p1Ship3Length1,
        p1Ship4Length1,
      },
      player2Ships: {
        p2ShipLength4,
        p2Ship1Length3,
        p2Ship2Length3,
        p2Ship1Length2,
        p2Ship2Length2,
        p2Ship3Length2,
        p2Ship1Length1,
        p2Ship2Length1,
        p2Ship3Length1,
        p2Ship4Length1,
      },
    };
  }
  return { getPlayers, getShips };
}

export default driveGame;
