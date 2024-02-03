import readline from "readline/promises";
// import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";

import parseEnv from "./cli/env.js";
import list from "./fs/list.js";
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
    } else if (line.trim().startsWith("cd")) {
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
