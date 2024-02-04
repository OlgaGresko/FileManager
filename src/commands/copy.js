import fs from "fs";
import { join } from "path";
import throwErrorMessage from "../utils/throwErrorMassage.js";

const copy = (sourcePath, destinationDirectory) => {
  const sourceFileName = sourcePath.split("/").pop();
  const destinationPath = join(destinationDirectory, sourceFileName);

  const readableStream = fs.createReadStream(sourcePath);
  const writableStream = fs.createWriteStream(destinationPath);

  readableStream.on("error", () => {
    throwErrorMessage();
  });

  writableStream.on("error", () => {
    throwErrorMessage();
  });

  readableStream.pipe(writableStream);
};

export default copy;