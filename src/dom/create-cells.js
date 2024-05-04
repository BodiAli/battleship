function createCells(gameBoardObj1, gameBoardObj2, grid1, grid2) {
  for (let i = 0; i < gameBoardObj1.coordinates.length; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.coord = gameBoardObj1.coordinates[i];
    cell.player = "player1";
    grid1.appendChild(cell);
  }
  for (let i = 0; i < gameBoardObj2.coordinates.length; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.coord = gameBoardObj2.coordinates[i];
    cell.player = "player2";
    grid2.appendChild(cell);
  }
}
export default createCells;
