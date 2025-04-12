import {parseRLE, nextGeneration} from "./game-of-life.mjs";
import fs from 'fs';

const[,, filePath, generationsStr] = process.argv;

if(!filePath || !generationsStr){
  console.error("node src/main <file.rle> <generations> ");
  process.exit(1);
}
const generations = parseInt(generationsStr);
const rleText = fs.readFileSync(filePath, 'utf-8');
let grid = parseRLE(rleText);
function padGrid(grid, padding = 1){
  const width = grid[0].length;
  const emptyRow = Array(width + padding * 2).fill(false);
  const newGrid =[];

  for(let i = 0; i < padding; i++){
    newGrid.push([...emptyRow]);
  }
  for (let row of grid){
    newGrid.push([
      ...Array(padding).fill(false),
      ...row,
      ...Array(padding).fill(false),
    ])
  }
  for (let i = 0; i < padding; i++){
    newGrid.push([...emptyRow]);
  }
  return newGrid;
}
grid = padGrid(grid, 1);

for(let i = 0; i < generations; i++){
  grid = nextGeneration(grid);
}
//console.log("debug raw grid=", grid);
console.log(grid.map(row => row.map(cell => (cell === true ? 'O' : '.')).join('')).join('\n'));