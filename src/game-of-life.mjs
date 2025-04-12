
export function nextCellState(currentCellState,liveNeighbors) {
  if (currentCellState && (liveNeighbors === 2 || liveNeighbors === 3 )){
    return true;
  }
  if (!currentCellState && liveNeighbors === 3) {
    return true;
  }
  return false;
}


export function nextGeneration(grid){
  const height = grid.length;
  const width = grid[0].length;

  const result = [];
  for (let y = 0; y < height; y++) {
    const row =[];
    for (let x = 0; x < width; x++) {
      const liveNeighbors = countLiveNeighbors(grid, x, y);
      const newState = nextCellState(grid[y][x], liveNeighbors);
      row.push(newState);
    }
    result.push(row);
  }
  return result;
}

function countLiveNeighbors(grid, x, y) {
  const height = grid.length;
  const width = grid[0].length;
  let count = 0;

  for(let dy =-1; dy <= 1; dy++ ){
    for(let dx =-1; dx <= 1; dx++ ){
      if(dx === 0 && dy === 0)continue;
      const nx = x + dx;
      const ny = y + dy;
      if(nx >= 0 && nx < width && ny >= 0 && ny < height){
        if (grid[ny][nx]) {
          count++;
        }
      }

    }
  }
  return count;

}