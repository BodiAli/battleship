import Player from "./factories/player.js";
import Gameboard from "./factories/gameboard.js";
import createCells from "./dom/create-cells.js";
import Ship from "./factories/ship.js";

const playerVsComputerButton = document.querySelector("button.pvs-btn.computer");

playerVsComputerButton.addEventListener("click", () => {
  const player = new Player();
  const computer = new Player();
  console.log(player, computer);
});
