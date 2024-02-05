import fs from "fs";
import os from "os";
import { join } from "path";

import parseCommandArgs from "../utils/parseCommandArgs.js";
import throwErrorMessage from "../utils/throwErrorMessage.js";

const read = async (line) => {
  const [reportedPath] = parseCommandArgs(line);
  let filePath;

  if (reportedPath.includes("/") || reportedPath.includes("\\")) {
    const partsOfPath = reportedPath.split(/[\/\\]/);
    filePath = join(...partsOfPath);
  } else {
    filePath = join(process.cwd(), reportedPath);
  }

  if (fs.existsSync(filePath)) {
    const stream = fs.createReadStream(filePath);
    stream.on("data", (chunk) => process.stdout.write(chunk.toString()));
  } else {
    throwErrorMessage();
  }
};

export default read;
