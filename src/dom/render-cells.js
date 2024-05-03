function renderCells(domCells1, domCells2, gameBoardObj1, gameBoardObj2) {
  gameBoardObj1.coordinates.forEach((cell) => {
    if (cell.ship !== null && cell.isHit === false) {
      const arr = Array.from(domCells1);
      const targetCell = arr.find((domCell) => domCell.coord.x === cell.x && domCell.coord.y === cell.y);
      targetCell.classList.add("cell-busy");
    } else if (cell.ship !== null && cell.isHit === true) {
      const arr = Array.from(domCells1);
      const targetCell = arr.find((domCell) => domCell.coord.x === cell.x && domCell.coord.y === cell.y);
      targetCell.classList.add("cell-busy");
      targetCell.classList.add("hit");
    } else if (cell.isAdjacent === true) {
      const arr = Array.from(domCells1);
      const targetCell = arr.find((domCell) => domCell.coord.x === cell.x && domCell.coord.y === cell.y);
      targetCell.classList.add("adjacent");
    }
  });

  // render missed attacks
  gameBoardObj1.missedCoordinates.forEach((coord) => {
    const arr = Array.from(domCells1);
    const targetCell = arr.find((domCell) => domCell.coord.x === coord.x && domCell.coord.y === coord.y);
    targetCell.classList.add("miss");
  });

  gameBoardObj2.coordinates.forEach((cell) => {
    if (cell.ship !== null && cell.isHit === false) {
      const arr = Array.from(domCells2);
      const targetCell = arr.find((domCell) => domCell.coord.x === cell.x && domCell.coord.y === cell.y);
      targetCell.classList.add("cell-busy");
    } else if (cell.ship !== null && cell.isHit === true) {
      const arr = Array.from(domCells2);
      const targetCell = arr.find((domCell) => domCell.coord.x === cell.x && domCell.coord.y === cell.y);
      targetCell.classList.add("cell-busy");
      targetCell.classList.add("hit");
    } else if (cell.ship === null && cell.isHit === true) {
      const arr = Array.from(domCells2);
      const targetCell = arr.find((domCell) => domCell.coord.x === cell.x && domCell.coord.y === cell.y);
      targetCell.classList.add("miss");
    }
  });

  // render missed attacks
  gameBoardObj2.missedCoordinates.forEach((coord) => {
    const arr = Array.from(domCells2);
    const targetCell = arr.find((domCell) => domCell.coord.x === coord.x && domCell.coord.y === coord.y);
    targetCell.classList.add("miss");
  });
}

export default renderCells;
