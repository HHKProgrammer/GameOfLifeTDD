import {describe, test} from "vitest";
import {expect} from "chai";
import fs from 'fs';
import {execSync} from 'child_process';

describe ("CLI end to end", () =>{
  test("simulate 1 genaration and write RLE output", () => {
    const input = `x = 3, y = 1, rule = B3/S23
    3o!`

    fs.writeFileSync("test/input.rle", input);

    execSync("node ./src/main.mjs test/input.rle 1 test/output.rle", {stdio: "pipe"});
    const result = fs.readFileSync("test/output.rle", "utf-8").trim();

    const expectedStart = "x = 5, y = 3, rule = B3/S23";
    expect(result.startsWith(expectedStart)).to.be.true;
    expect(result).to.include("2bo2b");
   // expect(result).to.match(/o[0-9]*bo/);

  })
})