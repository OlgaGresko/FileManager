import fs, { createReadStream, createWriteStream, unlink } from 'fs';
import { join } from 'path';
import throwErrorMessage from '../utils/throwErrorMassage.js';

const move = (sourcePath, destinationDirectory) => {
  const sourceFileName = sourcePath.split("/").pop();
  const destinationPath = join(destinationDirectory, sourceFileName);

  const readableStream = createReadStream(sourcePath);
  const writableStream = createWriteStream(destinationPath);

  readableStream.on("error", (error) => {
    throwErrorMessage();
  });

  writableStream.on("error", (error) => {
    throwErrorMessage();
  });

  writableStream.on("close", () => {
    unlink(sourcePath, (error) => {
      if (error) {
        throwErrorMessage();
      }
    });
  });

  readableStream.pipe(writableStream);
};

export default move;