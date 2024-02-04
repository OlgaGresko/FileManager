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
      const [_, arg] = line.trim().split(" ");
      cd(arg);
    } else if (line.trim() === "ls") {
      await list();
    } else if (line.trim().startsWith("cat ")) {
      const [_, arg] = line.trim().split(" ");
      read(arg);
    } else if (line.trim().startsWith("add ")) {
      const [_, arg] = line.trim().split(" ");
      create(arg);
    } else if (line.trim().startsWith("rn ")) {
      const [_, arg1, arg2] = line.trim().split(" ");
      rename(arg1, arg2);
    } else if (line.trim().startsWith("cp ")) {
      const [_, arg1, arg2] = line.trim().split(" ");
      copy(arg1, arg2);
    } else if (line.trim().startsWith("mv ")) {
      const [_, arg1, arg2] = line.trim().split(" ");
      move(arg1, arg2);
    } else if (line.trim().startsWith("rm ")) {
      const [_, arg] = line.trim().split(" ");
      remove(arg);
    } else if (line.trim().startsWith("os ")) {
      const [_, arg] = line.trim().split(" ");
      const clearedArg = arg.replace("--", "");
      osCommand(clearedArg);
    } else if (line.trim().startsWith("hash ")) {
      const [_, arg] = line.trim().split(" ");
      calculateHash(arg);
    } else if (line.trim().startsWith("compress ")) {
      const [_, arg1, arg2] = line.trim().split(" ");
      compress(arg1, arg2);
    } else if (line.trim().startsWith("decompress ")) {
      const [_, arg1, arg2] = line.trim().split(" ");
      decompress(arg1, arg2);
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