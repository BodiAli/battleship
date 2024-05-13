import choosePlayerVs from "./dom-pvs.js";

function renderCells(domCells1, domCells2, gameBoardObj1, gameBoardObj2) {
  gameBoardObj1.coordinates.forEach((cell) => {
    const arr = Array.from(domCells1);
    if (cell.ship !== null && cell.isHit === false) {
      const targetCell = arr.find((domCell) => domCell.coord.x === cell.x && domCell.coord.y === cell.y);
      targetCell.classList.add("cell-busy");
    } else if (cell.ship !== null && cell.isHit === true) {
      const targetCell = arr.find((domCell) => domCell.coord.x === cell.x && domCell.coord.y === cell.y);
      targetCell.classList.add("cell-busy");
      targetCell.classList.add("hit");
      targetCell.isHit = true;
    } else if (cell.isAdjacent === true) {
      const targetCell = arr.find((domCell) => domCell.coord.x === cell.x && domCell.coord.y === cell.y);
      if (!targetCell.classList.contains("miss")) {
        targetCell.classList.add("adjacent");
      }
      targetCell.isAdjacent = true;
    } else {
      const targetCell = arr.find((domCell) => domCell.coord.x === cell.x && domCell.coord.y === cell.y);
      targetCell.className = "cell";
      targetCell.isAdjacent = false;
      targetCell.isHit = false;
    }
  });

  // Render missed attacks
  gameBoardObj1.missedCoordinates.forEach((coord) => {
    const arr = Array.from(domCells1);
    const targetCell = arr.find((domCell) => domCell.coord.x === coord.x && domCell.coord.y === coord.y);
    targetCell.isHit = true;
    targetCell.classList.add("miss");
  });

  gameBoardObj2.coordinates.forEach((cell) => {
    const arr = Array.from(domCells2);
    if (cell.ship !== null && cell.isHit === false) {
      if (choosePlayerVs.playerVsPlayer) {
        const targetCell = arr.find((domCell) => domCell.coord.x === cell.x && domCell.coord.y === cell.y);
        targetCell.classList.add("cell-busy");
      }
    } else if (cell.ship !== null && cell.isHit === true) {
      const targetCell = arr.find((domCell) => domCell.coord.x === cell.x && domCell.coord.y === cell.y);
      targetCell.classList.add("cell-busy");
      targetCell.classList.add("hit");
      targetCell.isHit = true;
    } else if (cell.isAdjacent === true) {
      const targetCell = arr.find((domCell) => domCell.coord.x === cell.x && domCell.coord.y === cell.y);
      if (!targetCell.classList.contains("miss")) {
        targetCell.classList.add("adjacent");
      }
      targetCell.isAdjacent = true;
    } else {
      const targetCell = arr.find((domCell) => domCell.coord.x === cell.x && domCell.coord.y === cell.y);
      targetCell.className = "cell";
      targetCell.isAdjacent = false;
      targetCell.isHit = false;
    }
  });

  // Render missed attacks
  gameBoardObj2.missedCoordinates.forEach((coord) => {
    const arr = Array.from(domCells2);
    const targetCell = arr.find((domCell) => domCell.coord.x === coord.x && domCell.coord.y === coord.y);
    targetCell.isHit = true;
    targetCell.classList.add("miss");
  });
}

export default renderCells;
