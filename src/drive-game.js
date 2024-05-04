import Player from "./factories/player.js";
import Ship from "./factories/ship.js";

function driveGame() {
  function getPlayers(name1, name2 = "Computer") {
    const player1 = new Player(name1);
    const player2 = new Player(name2);
    return { player1, player2 };
  }
  function getShips() {
    const shipLength4 = new Ship(4);
    const ship1Length3 = new Ship(3);
    const ship2Length3 = new Ship(3);
    const ship1Length2 = new Ship(2);
    const ship2Length2 = new Ship(2);
    const ship3Length2 = new Ship(2);
    const ship1Length1 = new Ship(1);
    const ship2Length1 = new Ship(1);
    const ship3Length1 = new Ship(1);
    const ship4Length1 = new Ship(1);
    return {
      shipLength4,
      ship1Length3,
      ship2Length3,
      ship1Length2,
      ship2Length2,
      ship3Length2,
      ship1Length1,
      ship2Length1,
      ship3Length1,
      ship4Length1,
    };
  }
  return { getPlayers, getShips };
}

export default driveGame;
