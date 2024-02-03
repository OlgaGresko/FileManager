import readline from "readline/promises";
// import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";

import parseEnv from "./cli/env.js";
import list from "./fs/list.js";
import read from "./streams/read.js";
import create from "./fs/create.js";
import rename from "./fs/rename.js";
import copy from "./fs/copy.js";
import capitalizeFirstLetter from "./utils/capitalizeFirstLetter.js";
import showCurrentWorkingDirectory from "./utils/printCurrentWorkingDirectory.js";

// const pathToFile = fileURLToPath(import.meta.url);
// const dirName = dirname(pathToFile);
// console.log("dirName", dirName);

const name = capitalizeFirstLetter(parseEnv());
console.log(`Welcome to the File Manager, ${name}`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const homeDir = process.env.HOME || process.env.USERPROFILE;
if (homeDir) {
  process.chdir(homeDir);
  showCurrentWorkingDirectory();
}

rl.on("line", async line => {
  try {
    if (line.trim() === "up") {
      const currentDir = process.cwd();
      const parentDirectory = join(currentDir, "..");
      if (resolve(currentDir) === resolve(parentDirectory)) {
        showCurrentWorkingDirectory();
        return;
      } else {
        process.chdir(parentDirectory);
      }
    } else if (line.trim().startsWith("cd ")) {
      const [_, arg] = line.trim().split(" ");

      if (arg.includes("/") || arg.includes("\\")) {
        const partsOfPath = arg.split(/[\/\\]/);
        const newPath = join(...partsOfPath);
        process.chdir(newPath);
      } else {
        const newPath = join(process.cwd(), arg);
        process.chdir(newPath);
      }
    } else if (line.trim() === "ls") {
      await list();
    } else if (line.trim().startsWith("cat ")) {
      const [_, arg] = line.trim().split(" ");

      if (arg.includes("/") || arg.includes("\\")) {
        const partsOfPath = arg.split(/[\/\\]/);
        const newPath = join(...partsOfPath);
        read(newPath);
      } else {
        const newPath = join(process.cwd(), arg);
        read(newPath);
      }
    } else if (line.trim().startsWith("add ")) {
      const [_, arg] = line.trim().split(" ");
      create(arg);
    } else if (line.trim().startsWith("rn ")) {
      const [_, arg1, arg2] = line.trim().split(" ");

      if (arg1.includes("/") || arg1.includes("\\")) {
        const partsOfPath = arg1.split(/[\/\\]/);
        const newPath = join(...partsOfPath);
        rename(newPath, arg2);
      } else {
        const newPath = join(process.cwd(), arg1);
        rename(newPath, arg2);
      }
    } else if (line.trim().startsWith("cp ")) {
      const [_, arg1, arg2] = line.trim().split(" ");
        copy(arg1, arg2);
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
  console.log(`Thank you for using File Manager, ${name}, goodbye!`);
  process.exit(0);
});
