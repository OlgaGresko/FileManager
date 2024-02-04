import zlib from "zlib";
import { join } from "path";
import { createReadStream, createWriteStream } from "fs";

const decompress = async (pathToFile, pathToDestination) => {
  const sourceFileName = pathToFile.split("/").pop();
  const destinationFilePath = join(pathToDestination, sourceFileName);

  const unBrotli = zlib.createBrotliDecompress();
  const readable = createReadStream(pathToFile);
  const writable = createWriteStream(destinationFilePath);

  readable.pipe(unBrotli).pipe(writable);
};

export default decompress;
