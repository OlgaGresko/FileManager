import readline from "readline/promises";
import { join } from "path";

import up from "./commands/up.js";
import cd from "./commands/cd.js";
import list from "./commands/list.js";
import read from "./commands/read.js";
import create from "./commands/create.js";
import rename from "./commands/rename.js";
import copy from "./commands/copy.js";
import move from "./commands/move.js";
import remove from "./commands/delete.js";
import osCommand from "./commands/os.js";
import calculateHash from "./commands/calcHash.js";
import compress from "./commands/compress.js";
import decompress from "./commands/decompress.js";
import showCurrentWorkingDirectory from "./utils/printCurrentWorkingDirectory.js";
import { greet, sayBye } from "./utils/greetBye.js";

greet();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const homeDir = process.env.HOME || process.env.USERPROFILE;
if (homeDir) {
  process.chdir(homeDir);
  showCurrentWorkingDirectory();
}

rl.on("line", async (line) => {
  try {
    if (line.trim() === "up") {
      up();
    } else if (line.trim().startsWith("cd ")) {
      cd(line);
    } else if (line.trim() === "ls") {
      await list();
    } else if (line.trim().startsWith("cat ")) {
      read(line);
    } else if (line.trim().startsWith("add ")) {
      create(line);
    } else if (line.trim().startsWith("rn ")) {
      rename(line);
    } else if (line.trim().startsWith("cp ")) {
      copy(line);
    } else if (line.trim().startsWith("mv ")) {
      move(line);
    } else if (line.trim().startsWith("rm ")) {
      remove(line);
    } else if (line.trim().startsWith("os ")) {
      osCommand(line);
    } else if (line.trim().startsWith("hash ")) {
      calculateHash(line);
    } else if (line.trim().startsWith("compress ")) {
      compress(line);
    } else if (line.trim().startsWith("decompress ")) {
      decompress(line);
    } else if (line.trim() === ".exit") {
      rl.close();
    } else {
      console.log("Invalid input");
    }
  } catch (error) {
    console.error("Operation failed");
  }
  showCurrentWorkingDirectory();
});

rl.on("close", () => {
  sayBye();
  process.exit(0);
});