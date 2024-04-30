function createCells(gameBoardObj1, gameBoardObj2, grid1, grid2) {
  for (let i = 0; i < gameBoardObj1.coordinates.length; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.coord = gameBoardObj1.coordinates[i];
    console.log(cell, cell.coord);
    grid1.appendChild(cell);
  }
  for (let i = 0; i < gameBoardObj2.coordinates.length; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.coord = gameBoardObj2.coordinates[i];
    console.log(cell, cell.coord);
    grid2.appendChild(cell);
  }
}
export default createCells;
