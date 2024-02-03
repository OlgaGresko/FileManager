import fs from "fs/promises";
import path from "path";

import throwErrorMessage from "../utils/throwErrorMassage.js";

const rename = async (oldFilePath, newFileName) => {
  const newFilePath = path.join(path.dirname(oldFilePath), newFileName);

  try {
    await fs.access(oldFilePath);
    await fs.rename(oldFilePath, newFilePath);
  } catch {
    throwErrorMessage();
  }
};

export default rename;
