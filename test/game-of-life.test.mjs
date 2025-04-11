import { describe, test } from "vitest";
import {expect} from 'chai';
import { nextCellState } from '../src/game-of-life.mjs';

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
