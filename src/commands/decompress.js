import zlib from "zlib";
import { join } from "path";
import { createReadStream, createWriteStream } from "fs";
import parseCommandArgs from "../utils/parseCommandArgs.js";

const decompress = async (line) => {
const [pathToFile, pathToDestination] = parseCommandArgs(line);
  
  const sourceFileName = pathToFile.split("/").pop();
  const destinationFilePath = join(pathToDestination, sourceFileName);

  const unBrotli = zlib.createBrotliDecompress();
  const readable = createReadStream(pathToFile);
  const writable = createWriteStream(destinationFilePath);

  readable.pipe(unBrotli).pipe(writable);
};

export default decompress;
