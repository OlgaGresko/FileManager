import fs from "fs/promises";
import { join } from "path";

import throwErrorMessage from "../utils/throwErrorMassage.js";

const list = async () => {
  const dirPath = process.cwd();
  const files = await fs.readdir(dirPath);

  const checkedFiles = await Promise.all(
    files.map(async (file) => {
      const filePath = join(dirPath, file);
      const stats = await fs.stat(filePath);
      const type = stats.isDirectory() ? "directory" : "file";
      return { name: file, type };
    })
  );

  const sortedFiles = checkedFiles.sort((a, b) => {
    if (a.type === "directory" && b.type !== "directory") {
      return -1;
    } else if (a.type !== "file" && b.type === "file") {
      return 1;
    }
  });

  console.table(sortedFiles);
};

export default list;
