
export function nextCellState(currentCellState,liveNeighbors) {
  if (currentCellState && (liveNeighbors === 2 || liveNeighbors === 3 )){
    return true;
  }
  if (!currentCellState && liveNeighbors === 3) {
    return true;
  }
  return false;
}