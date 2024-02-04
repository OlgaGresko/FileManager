import fs from "fs";
import os from "os";
import { join } from "path";

const read = async (reportedPath) => {
  let filePath;

  if (reportedPath.includes("/") || reportedPath.includes("\\")) {
    const partsOfPath = reportedPath.split(/[\/\\]/);
    filePath = join(...partsOfPath);
  } else {
    filePath = join(process.cwd(), reportedPath);
  }

  const stream = fs.createReadStream(filePath);
  stream.on("data", (chunk) => process.stdout.write(chunk.toString()));
};

export default read;
