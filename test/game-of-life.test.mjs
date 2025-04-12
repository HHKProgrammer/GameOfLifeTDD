import { describe, test } from "vitest";
import {expect} from 'chai';
import { nextCellState, nextGeneration } from '../src/game-of-life.mjs';

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
