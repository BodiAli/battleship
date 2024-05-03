import Player from "./factories/player.js";
import createCells from "./dom/create-cells.js";
import Ship from "./factories/ship.js";
import renderCells from "./dom/render-cells.js";

const player = new Player("bodi");
const computer = new Player("Computer");
const ship1 = new Ship(3);
const ship2 = new Ship(4);
player.gameBoard.placeShip(ship1, 3, 5, "horizontal");
computer.gameBoard.placeShip(ship2, 3, 7, "vertical");

const playerGrid = document.getElementById("player-grid");
const computerGrid = document.getElementById("computer-grid");
const playerVsComputerNameInput = document.getElementById("p-vs-c-name");
const playerName = document.getElementById("player-name");

playerName.textContent = `${player.name} grid`;

function renderBoards() {
  createCells(player.gameBoard, computer.gameBoard, playerGrid, computerGrid);
  player.name = playerVsComputerNameInput.value;
}
renderBoards();
const player1Cells = document.querySelectorAll("#player-grid > .cell");
const player2Cells = document.querySelectorAll("#computer-grid > .cell");
player.gameBoard.receiveAttack(1, 2);
player.gameBoard.receiveAttack(4, 5);
player.gameBoard.receiveAttack(5, 5);
player.gameBoard.receiveAttack(3, 5);
computer.gameBoard.receiveAttack(5, 5);
computer.gameBoard.receiveAttack(10, 10);
computer.gameBoard.receiveAttack(3, 8);
renderCells(player1Cells, player2Cells, player.gameBoard, computer.gameBoard);
console.log(player.gameBoard.coordinates);
