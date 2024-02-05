import { rm } from "fs/promises";

import throwErrorMessage from "../utils/throwErrorMessage.js";
import parseCommandArgs from "../utils/parseCommandArgs.js";

const remove = async (line) => {
  const [deletePath] = parseCommandArgs(line);

  try {
    await rm(deletePath);
  } catch (err) {
    if (err.code === "ENOENT") {
      throwErrorMessage();
    }
  }
};

export default remove;
