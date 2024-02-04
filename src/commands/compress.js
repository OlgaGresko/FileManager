import zlib from "zlib";
import { join } from "path";
import { createReadStream, createWriteStream } from "fs";

const compress = async (pathToFile, pathToDestination) => {
  const sourceFileName = pathToFile.split("/").pop();
  const destinationFilePath = join(pathToDestination, sourceFileName);

  const brotli = zlib.createBrotliCompress();
  const readable = createReadStream(pathToFile);
  const writable = createWriteStream(destinationFilePath);

  readable.pipe(brotli).pipe(writable);
};

export default compress;
