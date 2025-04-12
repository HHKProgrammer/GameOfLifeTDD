import { describe, test } from "vitest";
import {expect} from 'chai';
import { nextCellState, nextGeneration, parseRLE, gridToRLE } from '../src/game-of-life.mjs';

describe("nextCellState", () => {
  test("Live cell with 2 neighbors stays alive", () => {
    expect(nextCellState(true, 2)).to.equal(true);
  })

  test("Live cell with 3 neighbors stays alive", () => {
    expect(nextCellState(true, 3)).to.equal(true);
  })

  test("live cell with 1 neighbor dies", () => {
    expect(nextCellState(true, 1)).to.equal(false);
  })
  //i dont know where intellij gets these suggestions?
  test( "dead cell with 3 neighbors becomes alive", () => {
    expect(nextCellState(false, 3)).to.equal(true);
  })
  test("dead cell with 2 neighbors stays dead", () => {
    expect(nextCellState(false, 2)).to.equal(false);
  })
})
describe("nextGeneration", () => {
  test("Block is still alive stayes unchanged", () =>{
    const block =[
      [true, true],
      [true, true],
    ];
    const expected = [
      [true, true],
      [true, true],
    ];
    expect(nextGeneration(block)).to.deep.equal(expected);
  });

  test("Blinker turns vertical to horizontal", () =>{
    const blinker =[
      [false, true, false],
      [false ,true, false],
      [false, true, false],
    ];
    const expected = [
      [false, false, false],
      [true, true, true],
      [false, false, false],
    ];
    expect(nextGeneration(blinker)).to.deep.equal(expected);
  })
})

describe("parseRLE", () =>{
  test("parse single row Blinker pattern",() =>{
    const rle = `
    #Blinker
    x = 3, y = 1, rule = B3/S23
    3o!`;

    const expected = [
      [true, true, true]
    ];

    expect(parseRLE(rle)).to.deep.equal(expected);

  });
});
describe ("gridToRLE", () => {
  test("converts 2 x 4 grid to RLe format", () =>{
    const grid = [
      [false, true, true, false],
      [true, false, false, true],
    ];
    const expected = `x = 4, y = 2, rule = B3/S23
b2ob$
o2bo!`;
    expect(gridToRLE(grid)).to.equal(expected);
  });
});

