import fs from "fs/promises";
import path from "path";

import throwErrorMessage from "../utils/throwErrorMessage.js";
import parseCommandArgs from "../utils/parseCommandArgs.js";

const rename = async (line) => {
  const [pathToFile, newFileName] = parseCommandArgs(line);
  let oldFilePath;

  if (pathToFile.includes("/") || pathToFile.includes("\\")) {
    const partsOfOldPath = pathToFile.split(/[\/\\]/);
    oldFilePath = path.join(...partsOfOldPath);
  } else {
    oldFilePath = path.join(process.cwd(), pathToFile);
  }

  const newFilePath = path.join(path.dirname(oldFilePath), newFileName);

  try {
    await fs.access(oldFilePath);
    await fs.rename(oldFilePath, newFilePath);
  } catch {
    throwErrorMessage();
  }
};

export default rename;
