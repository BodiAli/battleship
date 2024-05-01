import Player from "./factories/player.js";
import Gameboard from "./factories/gameboard.js";
import createCells from "./dom/create-cells.js";
import Ship from "./factories/ship.js";

const player = new Player("bodi");
const computer = new Player("Computer");
const ship1 = new Ship(3);
const ship2 = new Ship(4);
player.gameBoard.placeShip(ship1, 3, 5, "horizontal");
player.gameBoard.placeShip(ship2, 3, 8, "horizontal");

const playerGrid = document.getElementById("player-grid");
const computerGrid = document.getElementById("computer-grid");
const playerVsComputerForm = document.getElementById("p-vs-c-form");
const playerVsComputerNameInput = document.getElementById("p-vs-c-name");
const playerName = document.getElementById("player-name");

playerName.textContent = `${player.name} grid`;
createCells(player.gameBoard, computer.gameBoard, playerGrid, computerGrid);

// function renderBoards(ev) {
//   ev.preventDefault();
//   player.name = playerVsComputerNameInput.value;
//   playerVsComputerNameInput.value = "";
// }

// playerVsComputerForm.addEventListener("submit", renderBoards);
