import choosePlayerVs from "./dom-pvs.js";

function renderCells(domCells1, domCells2, gameBoardObj1, gameBoardObj2) {
  gameBoardObj1.coordinates.forEach((coordinate) => {
    const arr = Array.from(domCells1);
    if (coordinate.ship !== null && coordinate.isHit === false) {
      const targetCell = arr.find(
        (domCell) => domCell.coord.x === coordinate.x && domCell.coord.y === coordinate.y
      );
      targetCell.classList.add("cell-busy");
    } else if (coordinate.ship !== null && coordinate.isHit === true) {
      const targetCell = arr.find(
        (domCell) => domCell.coord.x === coordinate.x && domCell.coord.y === coordinate.y
      );
      targetCell.classList.add("cell-busy");
      targetCell.classList.add("hit");
      targetCell.isHit = true;
    } else if (coordinate.isAdjacent === true) {
      const targetCell = arr.find(
        (domCell) => domCell.coord.x === coordinate.x && domCell.coord.y === coordinate.y
      );
      if (!targetCell.classList.contains("miss")) {
        targetCell.classList.add("adjacent");
      }
      targetCell.isAdjacent = true;
    } else {
      const targetCell = arr.find(
        (domCell) => domCell.coord.x === coordinate.x && domCell.coord.y === coordinate.y
      );
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

  gameBoardObj2.coordinates.forEach((coordinate) => {
    const arr = Array.from(domCells2);
    if (coordinate.ship !== null && coordinate.isHit === false) {
      if (choosePlayerVs.playerVsPlayer) {
        const targetCell = arr.find(
          (domCell) => domCell.coord.x === coordinate.x && domCell.coord.y === coordinate.y
        );
        targetCell.classList.add("cell-busy");
      }
    } else if (coordinate.ship !== null && coordinate.isHit === true) {
      const targetCell = arr.find(
        (domCell) => domCell.coord.x === coordinate.x && domCell.coord.y === coordinate.y
      );
      targetCell.classList.add("cell-busy");
      targetCell.classList.add("hit");
      targetCell.isHit = true;
    } else if (coordinate.isAdjacent === true) {
      const targetCell = arr.find(
        (domCell) => domCell.coord.x === coordinate.x && domCell.coord.y === coordinate.y
      );
      if (!targetCell.classList.contains("miss")) {
        targetCell.classList.add("adjacent");
      }
      targetCell.isAdjacent = true;
    } else {
      const targetCell = arr.find(
        (domCell) => domCell.coord.x === coordinate.x && domCell.coord.y === coordinate.y
      );
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
