import readline from "readline/promises";
import os from "os";
// import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";

import parseEnv from "./cli/env.js";
import list from "./fs/list.js";
import read from "./streams/read.js";
import create from "./fs/create.js";
import rename from "./fs/rename.js";
import copy from "./fs/copy.js";
import move from "./fs/move.js";
import remove from "./fs/delete.js";
import calculateHash from "./hash/calcHash.js";
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

rl.on("line", async (line) => {
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
    } else if (line.trim().startsWith("mv ")) {
      const [_, arg1, arg2] = line.trim().split(" ");
      move(arg1, arg2);
    } else if (line.trim().startsWith("rm ")) {
      const [_, arg] = line.trim().split(" ");
      remove(arg);
    } else if (line.trim().startsWith("os ")) {
      const [_, arg] = line.trim().split(" ");
      const clearedArg = arg.replace("--", "");

      if (clearedArg === "EOL") {
        console.log(os.EOL);
      } else if (clearedArg === "cpus") {
        const allCpus = os.cpus();
        console.log(`Overall amount of CPUS is ${allCpus.length}`);
        allCpus.map((cpu, index) => {
          console.log(`${index + 1}. CPU model is ${cpu.model}, clock rate (in GHz) is ${cpu.speed / 1000}`)
        })
      } else if (clearedArg === "homedir") {
        console.log(os.homedir());
      } else if (clearedArg === "username") {
        const info = os.userInfo();
        console.log(info.username);
      } else if (clearedArg === "architecture") {
        console.log(os.arch());
      }

    } else if (line.trim().startsWith("hash ")) {
      const [_, arg] = line.trim().split(" ");
      calculateHash(arg);
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
