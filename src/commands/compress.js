import zlib from "zlib";
import { join } from "path";
import { createReadStream, createWriteStream } from "fs";
import parseCommandArgs from "../utils/parseCommandArgs.js";

const compress = async (line) => {
const [pathToFile, pathToDestination] = parseCommandArgs(line);

  const sourceFileName = pathToFile.split("/").pop();
  const destinationFilePath = join(pathToDestination, sourceFileName);

  const brotli = zlib.createBrotliCompress();
  const readable = createReadStream(pathToFile);
  const writable = createWriteStream(destinationFilePath);

  readable.pipe(brotli).pipe(writable);
};

export default compress;
