const grids = document.querySelectorAll(".grid");
grids.forEach((grid) => {
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    grid.appendChild(cell);
  }
});
