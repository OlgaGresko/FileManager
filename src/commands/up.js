import { resolve, join } from "path";

import showCurrentWorkingDirectory from "../utils/printCurrentWorkingDirectory.js";

const up = () => {
  const currentDir = process.cwd();
  const parentDirectory = join(currentDir, "..");
  if (resolve(currentDir) === resolve(parentDirectory)) {
    showCurrentWorkingDirectory();
    return;
  } else {
    process.chdir(parentDirectory);
  }
};

export default up;
