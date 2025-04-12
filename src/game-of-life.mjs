
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

export function parseRLE(rleText){
  const lines = rleText
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#'));

  const patternLine = lines.find(line => line.startsWith('x ='));
  const patternIndex = lines.indexOf(patternLine);
  const dataLines =lines.slice(patternIndex + 1);
  const data = dataLines.join('');

  const grid = [];
  let row= [];
  let count = '';
  for (let char of data){
  if (/\d/.test(char)){
    count += char;
  } else{
    const n = parseInt(count || '1', 10);
    if (char === 'b'){
      row.push(...Array(n).fill(false));
    } else if (char === 'o'){
      row.push(...Array(n).fill(true));
    } else if (char === '$'){
      grid.push(row);
      row = [];
    } else if ( char === '!'){
      if (row.length > 0) grid.push(row);
      break;
    }
    count ='';
  }


}
  return grid;
}

export function gridToRLE(grid){
  const height = grid.length;
  const width = grid[0].length;
  let rle = "";
  for (let y = 0; y < height; y++){
    let count = 0;
    let last = null;

    for (let x = 0; x < width; x++){
      const cell = grid[y][x];
      const symbol = cell ? 'o' : 'b';

      if(symbol === last){
        count++;
      }else{
        if(last !== null){
          rle += (count > 1 ? count : "") + last;

        }
        last = symbol;
        count = 1;
      }
    }
    if ( last !== null){
      rle += (count > 1 ? count : "") + last;

    }
    if(y < height - 1){
      rle += "$\n";
    }else{
      rle += "!";
    }
    //  += "$\n";
  }
 // rle = rle.slice(0, -1) +"!";
  const header = `x = ${width}, y = ${height}, rule = B3/S23`;

  return `${header}\n${rle}`;

}