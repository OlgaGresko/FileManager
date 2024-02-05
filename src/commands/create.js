import { writeFile } from "fs/promises";
import { join } from "path";

import throwErrorMessage from "../utils/throwErrorMessage.js";
import parseCommandArgs from "../utils/parseCommandArgs.js";

const create = async (line) => {
  const [name] = parseCommandArgs(line);

  parseCommandArgs;
  try {
    await writeFile(join(process.cwd(), name), "", { flag: "wx" });
  } catch {
    throwErrorMessage();
  }
};

export default create;
