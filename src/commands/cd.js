import { join } from "path";

import parseCommandArgs from "../utils/parseCommandArgs.js";

const cd = (line) => {
  const [reportedPath] = parseCommandArgs(line);
  let newPath;

  if (reportedPath.includes("/") || reportedPath.includes("\\")) {
    const partsOfPath = reportedPath.split(/[\/\\]/);
    newPath = join(...partsOfPath);
  } else {
    newPath = join(process.cwd(), reportedPath);
    process.chdir(newPath);
  }

  process.chdir(newPath);
};

export default cd;